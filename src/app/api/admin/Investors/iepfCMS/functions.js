import { query } from '@/lib/db';

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
    return new Response(JSON.stringify({ status: 200, pageData: [{ content: content[0].content, reports }] }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ status: 500, Error: e.message }), { status: 500 });
  }
}

async function getShareTransfer() {
  try {
    const result = await query({
      query: "SELECT * FROM share_transfer ORDER BY year DESC, document_name",
      values: [],
    });
    return new Response(JSON.stringify({ status: 200, pageData: result }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ status: 500, Error: e.message }), { status: 500 });
  }
}

async function addShareTransfer(body, url) {
    try {
      const { year, document_name } = body;
      const document_link = url;
      const result = await query({
        query: "INSERT INTO share_transfer (year, document_name, document_link) VALUES (?, ?, ?)",
        values: [year, document_name, document_link],
      });
      return new Response(JSON.stringify({ status: 200, message: 'Share transfer added successfully' }), { status: 200 });
    } catch (e) {
      return new Response(JSON.stringify({ status: 500, Error: e.message }), { status: 500 });
    }
  }
  
  async function addUnclaimedDividend(body) {
    try {
      const { year, report_title, report_link } = body;
      const result = await query({
        query: "INSERT INTO unclaimed_dividend (year, report_title, report_link) VALUES (?, ?, ?)",
        values: [year, report_title, report_link],
      });
      return new Response(JSON.stringify({ status: 200, message: 'Unclaimed dividend added successfully' }), { status: 200 });
    } catch (e) {
      return new Response(JSON.stringify({ status: 500, Error: e.message }), { status: 500 });
    }
  }

async function updateNodalOfficerDetails(body) {
  try {
    const { name, email } = body;
    const result = await query({
      query: "UPDATE nodal_officer_details SET name = ?, email = ? WHERE id = 1",
      values: [name, email],
    });
    return new Response(JSON.stringify({ status: 200, message: 'Nodal officer details updated successfully' }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ status: 500, Error: e.message }), { status: 500 });
  }
}

async function updateUnclaimedDividendContent(body) {
  try {
    const { content } = body;
    const result = await query({
      query: "UPDATE unclaimed_dividend SET content = ? WHERE id = 1",
      values: [content],
    });
    return new Response(JSON.stringify({ status: 200, message: 'Unclaimed dividend content updated successfully' }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ status: 500, Error: e.message }), { status: 500 });
  }
}

async function updateShareTransfer(body) {
  try {
    const { id, year, document_name, document_link = "Update" } = body;
    const result = await query({
      query: "UPDATE share_transfer SET year = ?, document_name = ?, document_link = ? WHERE id = ?",
      values: [year, document_name, document_link, id],
    });
    return new Response(JSON.stringify({ status: 200, message: 'Share transfer updated successfully' }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ status: 500, Error: e.message }), { status: 500 });
  }
}

async function updateUnclaimedDividend(body) {
  try {
    const { id, year, report_title } = body;
    const result = await query({
      query: "UPDATE unclaimed_dividend SET year = ?, report_title = ?  WHERE id = ?",
      values: [year, report_title,  id]
    });
    return new Response(JSON.stringify({ status: 200, message: 'Unclaimed dividend updated successfully' }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ status: 500, Error: e.message }), { status: 500 });
  }
}

async function deleteShareTransfer(id) {
  try {
    const result = await query({
      query: "DELETE FROM share_transfer WHERE id = ?",
      values: [id],
    });
    return new Response(JSON.stringify({ status: 200, message: 'Share transfer deleted successfully' }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ status: 500, Error: e.message }), { status: 500 });
  }
}

async function deleteUnclaimedDividend(id) {
  try {
    const result = await query({
      query: "DELETE FROM unclaimed_dividend WHERE id = ?",
      values: [id],
    });
    return new Response(JSON.stringify({ status: 200, message: 'Unclaimed dividend deleted successfully' }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ status: 500, Error: e.message }), { status: 500 });
  }
}

export {
  getNodalOfficerDetails,
  getUnclaimedDividend,
  getShareTransfer,
  addShareTransfer,
  addUnclaimedDividend,
  updateNodalOfficerDetails,
  updateUnclaimedDividendContent,
  updateShareTransfer,
  updateUnclaimedDividend,
  deleteShareTransfer,
  deleteUnclaimedDividend
};