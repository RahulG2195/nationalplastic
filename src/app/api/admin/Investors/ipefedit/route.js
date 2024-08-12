import { query } from '@/lib/db';
import { uploadFile } from "@/utils/fileUploader";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const section = formData.get('section');
    const id = formData.get('id');
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ status: 400, message: 'No file uploaded' }), { status: 400 });
    }

    switch (section) {
      case 'ShareTransfer':
        return await updateShareTransferFile({ id, file });
      case 'UnclaimedDividend':
        return await updateUnclaimedDividendFile({ id, file });
      default:
        return new Response(JSON.stringify({ status: 404, message: 'Section not found' }), { status: 404 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ status: 500, error: error.message }), { status: 500 });
  }
}

async function updateUnclaimedDividendFile({ id, file }) {
  try {
    await uploadFile(file);
    const report_link = `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${file.name}`;
    await query({
      query: "UPDATE unclaimed_dividend SET report_link = ? WHERE id = ?",
      values: [report_link, id],
    });
    return new Response(JSON.stringify({ status: 200, message: 'Unclaimed dividend updated successfully' }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ status: 500, error: e.message }), { status: 500 });
  }
}

async function updateShareTransferFile({ id, file }) {
  try {
    await uploadFile(file);
    const document_link = `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${file.name}`;
    await query({
      query: "UPDATE share_transfer SET document_link = ? WHERE id = ?",
      values: [document_link, id],
    });
    return new Response(JSON.stringify({ status: 200, message: 'Share transfer updated successfully' }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ status: 500, error: e.message }), { status: 500 });
  }
}