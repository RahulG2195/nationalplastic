import { query } from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');

  switch (section) {
    case 'NodalOfficerDetails':
      return await NodalOfficerDetails();
    case 'UnclaimedDividend':
      return await UnclaimedDividend();
    case 'ShareTransfer':
      return await ShareTransfer();
    default:
      return new Response(
        JSON.stringify({
          status: 404,
          message: 'Section not found',
        }),
        { status: 404 }
      );
  }
}

async function NodalOfficerDetails() {
  try {
    const pageContent = await query({
      query: "SELECT * FROM nodal_officer_details",
      values: [],
    });
    return new Response(
      JSON.stringify({
        status: 200,
        pageData: pageContent,
      }),
      { status: 200 }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        status: 500,
        Error: e.message,
      }),
      { status: 500 }
    );
  }
}

async function UnclaimedDividend() {
  try {
    const content = await query({
      query: "SELECT content FROM unclaimed_dividend WHERE content IS NOT NULL LIMIT 1",
      values: [],
    });

    const reports = await query({
      query: "SELECT id, year, report_title, report_link FROM unclaimed_dividend WHERE year IS NOT NULL ORDER BY year DESC",
      values: [],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        pageData: [{ content: content[0].content, reports }],
      }),
      { status: 200 }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        status: 500,
        Error: e.message,
      }),
      { status: 500 }
    );
  }
}

async function ShareTransfer() {
  try {
    const pageContent = await query({
      query: "SELECT * FROM share_transfer ORDER BY year DESC, document_name",
      values: [],
    });
    return new Response(
      JSON.stringify({
        status: 200,
        pageData: pageContent,
      }),
      { status: 200 }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        status: 500,
        Error: e.message,
      }),
      { status: 500 }
    );
  }
}