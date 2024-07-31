import formidable from 'formidable';
import { query } from '@/lib/db';
import {uploadFile} from "@/utils/fileUploader";

export async function POST(request) {
  const form = new formidable.IncomingForm();
  
  return new Promise((resolve, reject) => {
    form.parse(request, async (err, fields, files) => {
      if (err) {
        reject(new Response(JSON.stringify({ status: 500, error: err.message }), { status: 500 }));
      }
      
      const { section, id } = fields;
      const file = files.file;
 
    

      switch (section) {
        case 'ShareTransfer':
          return resolve(await updateShareTransferFile({ id, file }));
        case 'UnclaimedDividend':
          return resolve(await updateUnclaimedDividendFile({ id, file }));
        default:
          return resolve(new Response(JSON.stringify({ status: 404, message: 'Section not found' }), { status: 404 }));
      }
    });
  });
}

async function updateUnclaimedDividendFile({ id, file }) {
  try {
// Save file and get the link
    await uploadFile(file); 
    const report_link = `/Assets/uploads/Investors/${file.name}`;
    const result = await query({
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
    const document_link = `/Assets/uploads/Investors/${file.name}`;
    const result = await query({
      query: "UPDATE share_transfer SET document_link = ? WHERE id = ?",
      values: [document_link, id],
    });
    return new Response(JSON.stringify({ status: 200, message: 'Share transfer updated successfully' }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ status: 500, error: e.message }), { status: 500 });
  }
}

async function saveFile(file) {
  // Implement file saving logic here
  // Return the link or path of the saved file
  const filePath = `/path/to/saved/file/${file.name}`;
  // Save the file and return the path
  return filePath;
}
