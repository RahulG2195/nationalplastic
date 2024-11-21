import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Utility function to upload the image
const uploadFile = async (file) => {
    try {
        if (!file || typeof file.arrayBuffer !== 'function') {
            throw new Error('Invalid file object');
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Set the upload directory
        const uploadDir = `${process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR}${process.env.NEXT_PUBLIC_UPLOAD_PATH_DIR}/`;

        // Check if the directory exists, create it if not
        try {
            await fs.promises.access(uploadDir);
        } catch {
            await fs.promises.mkdir(uploadDir, { recursive: true });
        }

        // Define the file path (ensure each file gets a unique name)
        const filePath = path.join(uploadDir, file.name);
        await fs.promises.writeFile(filePath, buffer);

        return file.name;  // Return the file name to store in the database
    } catch (error) {
        console.error('Upload error:', error);
        throw new Error(`File upload failed: ${error.message}`);
    }
};

// Fetch all hiring process steps
export async function GET(request) {
    try {
        const processSteps = await query({
            query: 'SELECT * FROM hiring_process',
            values: [],
        });

        return NextResponse.json({ success: true, processSteps }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// Update an existing hiring process step
export async function POST(request) {
    try {
      const formData = await request.formData();
      const id = formData.get("id");
      const title = formData.get("title");
      const description = formData.get("description");
      const imageFile = formData.get("image");
  
      const data = {};
  
      // Collecting the fields that need to be updated
      if (title) data.title = title;
      if (description) data.description = description;
      if (imageFile && imageFile.size > 0) {
        const imagePath = await uploadFile(imageFile, "images");
        data.image = imagePath;
      }
  
      // Dynamically build the SET clause and the values
      const setClause = [];
      const queryValues = [];
  
      if (data.title) {
        setClause.push("title = ?");
        queryValues.push(data.title);
      }
  
      if (data.description) {
        setClause.push("description = ?");
        queryValues.push(data.description);
      }
  
      if (data.image) {
        setClause.push("image = ?");
        queryValues.push(data.image);
      }
  
      // Add the ID for the WHERE clause at the end
      queryValues.push(id);
  
      if (setClause.length === 0) {
        // If no fields are provided to update, return an error
        return NextResponse.json(
          { success: false, error: "No fields to update" },
          { status: 400 }
        );
      }
  
      // Construct the final query
      const updateQuery = `
        UPDATE hiring_process 
        SET ${setClause.join(", ")} 
        WHERE id = ?
      `;
  
      console.log("Final Query:", updateQuery);
      console.log("Query Values:", queryValues);
  
      // Execute the update query
      const result = await query({
        query: updateQuery,
        values: queryValues,
      });
  
      console.log(result, "Update result");
  
      return NextResponse.json({ success: true, data: result }, { status: 200 });
    } catch (error) {
      console.error("Error during update:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
  }
  