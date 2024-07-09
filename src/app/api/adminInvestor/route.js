import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return NextResponse.json(
      { success: false, error: `Method ${req.method} Not Allowed` },
      { status: 405 }
    );
  }

  return new Promise((resolve) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = "./public/uploads";
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return resolve(NextResponse.json(
          { success: false, error: 'Error parsing form data' },
          { status: 500 }
        ));
      }

      const { title, name, description, subCategory, year } = fields;
      const file = files.file;

      const requiredFields = ['title', 'name', 'description'];
      const missingFields = requiredFields.filter(field => !fields[field]);

      if (missingFields.length > 0) {
        return resolve(NextResponse.json(
          { success: false, error: `The following fields are required: ${missingFields.join(', ')}` },
          { status: 400 }
        ));
      }

      if (title === 'Financials' || title === 'AGM Compliance') {
        if (!subCategory) {
          return resolve(NextResponse.json(
            { success: false, error: 'Sub Category is required for Financials and AGM Compliance' },
            { status: 400 }
          ));
        }
      }

      if (title === 'General Disclosure' && !year) {
        return resolve(NextResponse.json(
          { success: false, error: 'Year is required for General Disclosure' },
          { status: 400 }
        ));
      }

      if (!file) {
        return resolve(NextResponse.json(
          { success: false, error: 'File upload is required' },
          { status: 400 }
        ));
      }

      console.log('CMS Entry:', {
        title,
        subCategory: subCategory || null,
        year: year || null,
        name,
        description,
        file: file.newFilename,
      });

      const newPath = `./public/uploads/${file.newFilename}`;
      fs.renameSync(file.filepath, newPath);

      resolve(NextResponse.json(
        { success: true, message: 'CMS entry created successfully' },
        { status: 200 }
      ));
    });
  });
}