export async function generateMetadata({ params }) {
    const { year } = params;  // Get the dynamic year from the URL

    return {
        title: `General Disclosure ${year} | National Plastic Industries Ltd`,
        description: `Access the general disclosures of National Plastic Industries Ltd for the year ${year}. Stay informed about our company’s policies, financial transparency, and regulatory compliance.`,
        keywords: [`General disclosure ${year}`, 'National Plastic Industries Ltd', 'corporate transparency', 'company policies', 'regulatory compliance', 'financial information', 'disclosures', 'Mumbai'],
    };
}

export default function GeneralDisclosureLayout({ children }) {
    return children;
}
