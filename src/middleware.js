import { NextResponse } from "next/server";

// Variable to track request count (consider persistence for reliability)

export default async function middleware(req) {
  // console.log("middleware");

  // Extract the query parameter from the URL
  const url = req.nextUrl;
  const params = new URLSearchParams(url.search);
  const query = params.get("query");

  // Store the captured query in a suitable storage mechanism
  // (e.g., database, in-memory store, logging)
  if (query) {
    console.log(`Captured query: ${query}`); // Log for demonstration
    // Implement your logic to store the query using your preferred storage method
    storeQuery(query); // Replace with your actual storage function
  }

  // Pass the request on for further processing
  return NextResponse.next({
    props: { query }, // Add product name as a prop
  });
}

// Function to store the captured query (replace with your actual implementation)
function storeQuery(query) {
  // Replace with your preferred storage mechanism (e.g., database, in-memory store)
  console.log(`Storing query: ${query} (implementation required)`); // Placeholder
}
