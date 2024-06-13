import { query } from "@/lib/db";
// import { parse } from "url";

export async function POST(request) {
  const { querys } = req;
  const searchQueries = querys.q;

  if (!searchQueries || searchQueries.length === 0) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  // Split the search queries if it is a string, assuming multiple queries are comma-separated
  const searchTerms = Array.isArray(searchQueries) ? searchQueries : searchQueries.split(',');

  // Construct the SQL query with placeholders for each search term
  const placeholders = searchTerms.map(() => 'product_name LIKE ?').join(' OR ');
  const searchValues = searchTerms.map(term => `%${term.trim()}%`);
  console.log("sV: ", searchValues)
  try {
    // Connect to the database
    const connection = await query.getConnection();

    // Perform a query to fetch data based on the search queries
    const [rows] = await connection.execute(
      `SELECT * FROM products WHERE ${placeholders}`,
      searchValues
    );

    // Release the connection
    connection.release();

    // Return the search results
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
