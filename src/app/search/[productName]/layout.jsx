export async function generateMetadata({ params }) {
    const decodedQuery = decodeURIComponent(params.productName);
    return {
      title: `Search Results for "${decodedQuery}" | National Plastic Industries Ltd`,
      description: `View search results for "${decodedQuery}" from National Plastic Industries Ltd, a prominent plastic product manufacturer in Mumbai.`,
      keywords: ['search results', decodedQuery, 'National Plastic Industries Ltd', 'plastic products', 'Mumbai'],
    };
  }
  
  export default function SearchLayout({ children }) {
    return children;
  }