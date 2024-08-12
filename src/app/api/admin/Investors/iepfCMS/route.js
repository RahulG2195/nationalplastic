import { query } from '@/lib/db';
import {
  addShareTransfer,
  addUnclaimedDividend,
  updateNodalOfficerDetails,
  updateUnclaimedDividendContent,
  updateShareTransfer,
  updateUnclaimedDividend,
  deleteShareTransfer,
  deleteUnclaimedDividend
} from './functions';

import {uploadFile} from "@/utils/fileUploader";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');

  switch (section) {
    case 'NodalOfficerDetails':
      return await getNodalOfficerDetails();
    case 'UnclaimedDividend':
      return await getUnclaimedDividend();
    case 'ShareTransfer':
      return await getShareTransfer();
    default:
      return new Response(JSON.stringify({ status: 404, message: 'Section not found' }), { status: 404 });
  }
}

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');

  const formData = await request.formData();
  const file = formData.get('file');
  const year = formData.get('year');
  const documentNameOrReportTitle = formData.get('document_name') || formData.get('report_title');
  await uploadFile(file); 
  const url = file.name;

  switch (section) {
    case 'ShareTransfer':
      return await addShareTransfer({ year, document_name: documentNameOrReportTitle }, url);
    case 'UnclaimedDividend':
      return await addUnclaimedDividend({ year, report_title: documentNameOrReportTitle, report_link: url });
    default:
      return new Response(JSON.stringify({ status: 404, message: 'Section not found' }), { status: 404 });
  }
}

export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');
  const body = await request.json();

  switch (section) {
    case 'NodalOfficerDetails':
      return await updateNodalOfficerDetails(body);
    case 'UnclaimedDividendContent':
      return await updateUnclaimedDividendContent(body);
    case 'ShareTransfer':
      return await updateShareTransfer(body);
    case 'UnclaimedDividend':
      return await updateUnclaimedDividend(body);
    default:
      return new Response(JSON.stringify({ status: 404, message: 'Section not found' }), { status: 404 });
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');
  const id = searchParams.get('id');

  switch (section) {
    case 'ShareTransfer':
      return await deleteShareTransfer(id);
    case 'UnclaimedDividend':
      return await deleteUnclaimedDividend(id);
    default:
      return new Response(JSON.stringify({ status: 404, message: 'Section not found' }), { status: 404 });
  }
}

// Implement the following functions:
// getNodalOfficerDetails, getUnclaimedDividend, getShareTransfer
// addShareTransfer, addUnclaimedDividend
// updateNodalOfficerDetails, updateUnclaimedDividendContent, updateShareTransfer, updateUnclaimedDividend
// deleteShareTransfer, deleteUnclaimedDividend


async function getNodalOfficerDetails() {
  try {
    const result = await query({
      query: "SELECT * FROM nodal_officer_details LIMIT 1",
      values: [],
    });
    return new Response(JSON.stringify({ status: 200, pageData: result }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ status: 500, Error: e.message }), { status: 500 });
  }
}

// Implement other functions similarly

async function getUnclaimedDividend() {
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

async function getShareTransfer() {
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