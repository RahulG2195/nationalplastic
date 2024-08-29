import { query } from "@/lib/db";
import { writeFile } from "fs/promises";
const fs = require("fs").promises;
const path = require("path");


export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const p_id = searchParams.get('p_id');

    if (!p_id) {
        return new Response(
            JSON.stringify({
                status: 400,
                message: "Missing p_id parameter"
            }),
            { status: 400 }
        );
    }

    try {
        const prod_details = await query({
            query: "SELECT * FROM product_detail WHERE prod_id = ?",
            values: [p_id],
        });

        return new Response(
            JSON.stringify({
                status: 200,
                product_details: prod_details
            }),
            { 
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (e) {
        return new Response(
            JSON.stringify({
                status: 500,
                message: e.message
            }),
            { 
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}


export async function POST(request) {
    try {
      const data = await request.formData();
  
      const {
        pd_id = null,
        features,
        description,
        careInstructions,
        deliveryInstructions,
        manufacturing,
        warranty,
      } = Object.fromEntries(data.entries());
  
      const image = data.get('image');
      const uploadedImageName = image ? image.name : null;
  
      // If image is provided, handle the upload
      if (image && image instanceof File) {
        try {
          const bytes = await image.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const path = `${process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR}${process.env.NEXT_PUBLIC_PRODUCT_IMAGES_DIR}`;
          try {
            await fs.access(path);
          } catch {
            await fs.mkdir(path, { recursive: true });
          }
          await writeFile(`${path}/${uploadedImageName}`, buffer);
        } catch (uploadError) {
          return new Response(
            JSON.stringify({ success: false, error: uploadError.message }),
            { status: 400 }
          );
        }
      }
  
      // Manual validation for required fields
      const requiredFields = { features, description, careInstructions, deliveryInstructions, manufacturing, warranty };
      const missingFields = Object.entries(requiredFields)
        .filter(([key, value]) => !value)
        .map(([key]) => key);
  
      if (missingFields.length > 0) {
        return new Response(
          JSON.stringify({ success: false, error: `The following fields are required: ${missingFields.join(', ')}` }),
          { status: 400 }
        );
      }
  
      let result;
  
      if (pd_id) {
        // If pd_id is provided, update the existing record
        result = await query({
          query: `
            UPDATE product_detail
            SET features = ?, description = ?, careInstructions = ?, deliveryInstructions = ?, manufacturing = ?, warranty = ?, image_name = ?
            WHERE pd_id = ?
          `,
          values: [features, description, careInstructions, deliveryInstructions, manufacturing, warranty, uploadedImageName, pd_id],
        });
      } else {
        // If pd_id is null, insert a new record
        result = await query({
          query: `
            INSERT INTO product_detail (features, description, careInstructions, deliveryInstructions, manufacturing, warranty, image_name)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `,
          values: [features, description, careInstructions, deliveryInstructions, manufacturing, warranty, uploadedImageName],
        });
      }
  
      return new Response(
        JSON.stringify({ success: true, data: result }),
        { status: 201 }
      );
  
    } catch (error) {
      console.error('Error processing product detail:', error);
  
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500 }
      );
    }
  }
  