require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const next = require('next');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2/promise');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const UPLOAD_BASE_DIR = path.join(__dirname, 'public', 'upload');

// Database connection pool using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Database connection test function
async function testDatabaseConnection() {
  try {
    const connection = await pool.getConnection();
    connection.release();
  } catch (error) {
    console.error('Failed to connect to MySQL database:', error);
    process.exit(1);
  }
}

app.prepare().then(async () => {
  const server = express();

  // Test database connection
  await testDatabaseConnection();

  // Serve static files
  if (fs.existsSync(UPLOAD_BASE_DIR)) {
    fs.readdirSync(UPLOAD_BASE_DIR).forEach(folder => {
      const folderPath = path.join(UPLOAD_BASE_DIR, folder);
      if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
        server.use(`/upload/${folder}`, express.static(folderPath));
        console.log(`Serving ${folder} from ${folderPath}`);
      }
    });
  } else {
    console.log(`Upload directory not found: ${UPLOAD_BASE_DIR}`);
  }

  // Make the database pool available in your routes
  server.use((req, res, next) => {
    req.db = pool;
    next();
  });

  // Your existing routes and middleware
  // Add them here...

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});