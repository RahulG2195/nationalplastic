
import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const results = await query({
      query: 'SELECT * FROM investorContact',
    //   values: [], // Assuming you want to fetch the data for the first row
    });

    return new Response(
      JSON.stringify({
        status: 200,
        investorContact: results || {},
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: 'Internal Server Error',
        error: error.message,
      })
    );
  }
}

export async function PUT(request) {
    try {
      const { row } = await request.json();
  
      if (!row || !row.id) {
        return new NextResponse(
          JSON.stringify({
            status: 400,
            message: 'Missing data or ID',
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      const queryParts = [];
      const values = [];
      Object.keys(row).forEach((key) => {
        if (row[key] !== undefined && key !== 'id') {
          queryParts.push(`${key} = ?`);
          values.push(row[key]);
        }
      });
  
      values.push(row.id); // Add ID to the end of the values for WHERE clause
  
      const dynamicQuery = `
        UPDATE investorContact
        SET ${queryParts.join(', ')}
        WHERE id = ?
      `;
  
      const result = await query({
        query: dynamicQuery,
        values: values,
      });
  
      return new NextResponse(
        JSON.stringify({
          status: 200,
          success: true,
          data: result,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Error updating investor contact:', error);
      return new NextResponse(
        JSON.stringify({
          status: 500,
          success: false,
          error: error.message,
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
