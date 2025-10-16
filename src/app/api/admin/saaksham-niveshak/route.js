
import { query } from '@/lib/db';
import {NextResponse} from 'next/server';
import path from "path";
import fs from "fs/promises";

export async function GET(request) {
  try {
    const heading = await query({
        query: "SELECT sn_heading, sn_sub_para FROM saaksham_niveshak WHERE sn_status = 2",
        values: [],
      });

    const results = await query({
      query: "SELECT * FROM saaksham_niveshak WHERE sn_status = 1 ORDER BY sn_id DESC",
      values: [],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        results: results,
        heading: heading.length > 0 ? heading[0] : {sn_heading: '', sn_sub_para: ''},
      })
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: e.message,
      }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const sn_content = formData.get('sn_content');
    const sn_pdf = formData.get('sn_pdf');

    if (!sn_content || !sn_pdf) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "Content and PDF are required",
        }),
        { status: 400 }
      );
    }

    const file_name = sn_pdf.name;
    const buffer = Buffer.from(await sn_pdf.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public", "Assets", "uploads", "Investors");
    await fs.writeFile(path.join(uploadDir, file_name), buffer);

    await query({
      query: "INSERT INTO saaksham_niveshak (sn_content, sn_pdf, sn_status, created_on) VALUES (?, ?, 1, NOW())",
      values: [sn_content, file_name],
    });

    return new Response(
      JSON.stringify({
        status: 201,
        message: "Saaksham Niveshak created successfully",
      })
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: e.message,
      }),
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const formData = await request.formData();
    const sn_id = formData.get('sn_id');
    const sn_content = formData.get('sn_content');
    const sn_pdf = formData.get('sn_pdf');

    if (!sn_id || !sn_content) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "ID and content are required",
        }),
        { status: 400 }
      );
    }

    let file_name;
    if (sn_pdf && typeof sn_pdf !== 'string') {
      file_name = sn_pdf.name;
      const buffer = Buffer.from(await sn_pdf.arrayBuffer());
      const uploadDir = path.join(process.cwd(), "public", "Assets", "uploads", "Investors");
      await fs.writeFile(path.join(uploadDir, file_name), buffer);
    }

    if (file_name) {
      await query({
        query: "UPDATE saaksham_niveshak SET sn_content = ?, sn_pdf = ? WHERE sn_id = ?",
        values: [sn_content, file_name, sn_id],
      });
    } else {
      await query({
        query: "UPDATE saaksham_niveshak SET sn_content = ? WHERE sn_id = ?",
        values: [sn_content, sn_id],
      });
    }

    return new Response(
      JSON.stringify({
        status: 200,
        message: "Saaksham Niveshak updated successfully",
      })
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: e.message,
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { sn_id } = await request.json();
    if (!sn_id) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "ID is required",
        }),
        { status: 400 }
      );
    }

    await query({
      query: "DELETE FROM saaksham_niveshak WHERE sn_id = ?",
      values: [sn_id],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        message: "Saaksham Niveshak deleted successfully",
      })
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
    try {
      const { sn_heading, sn_sub_para } = await request.json();
      const heading = await query({
        query: "SELECT sn_heading, sn_sub_para FROM saaksham_niveshak WHERE sn_status = 2",
        values: [],
      });

      if(heading.length > 0){
        await query({
            query: "UPDATE saaksham_niveshak SET sn_heading = ?, sn_sub_para = ? WHERE sn_status = 2",
            values: [sn_heading, sn_sub_para],
          });
      } else {
        await query({
            query: "INSERT INTO saaksham_niveshak (sn_heading, sn_sub_para, sn_status, created_on) VALUES (?, ?, 2, NOW())",
            values: [sn_heading, sn_sub_para],
        });
      }
  
      return new Response(
        JSON.stringify({
          status: 200,
          message: "Content updated successfully",
        })
      );
    } catch (e) {
      return new Response(
        JSON.stringify({
          status: 500,
          message: "Unable to update content",
          error: e.message,
        }),
        { status: 500 }
      );
    }
  }
