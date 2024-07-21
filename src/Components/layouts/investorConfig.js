// config/navConfig.js
import axios from 'axios';

function restructureData(data) {
  const idMap = new Map();
  const result = [];

  // First pass: create all items and map them by id
  data.forEach(item => {
    const newItem = { 
      label: item.label, 
      link: item.link, 
      subItems: [] 
    };
    idMap.set(item.id, newItem);
  });

  // Second pass: build the tree structure
  data.forEach(item => {
    if (item.parentId === null) {
      result.push(idMap.get(item.id));
    } else {
      const parent = idMap.get(item.parentId);
      if (parent) {
        parent.subItems.push(idMap.get(item.id));
      }
    }
  });

  // Remove empty subItems arrays
  const cleanEmptySubItems = (items) => {
    items.forEach(item => {
      if (item.subItems.length === 0) {
        delete item.subItems;
      } else {
        cleanEmptySubItems(item.subItems);
      }
    });
  };

  cleanEmptySubItems(result);

  return result;
}

export const fetchInvestorConfig = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Investor/InvestorPage`);
    
    const restructuredData = restructureData(res.data.results);
    
    return restructuredData;
  } catch (error) {
    console.error("Error fetching investor config:", error);
    return [];
  }
};

// Fallback static configuration
export const staticInvestorConfig = [
  {
    label: "Investors (REG. 46)",
    link: "/Investor",
    subItems: [
      {
        label: "Financials",
        link: "#",
        subItems: [
          { label: "Unaudited Financial Results", link: "/Unaudited" },
          { label: "Audited Financial Results", link: "/Audited" },
          { label: "Annual Report", link: "/Annual" },
          { label: "Annual Return", link: "/AnnualReturn" },
        ],
      },
      { label: "Shareholding Pattern", link: "/ShareHolding" },
      { label: "Corporate Governance", link: "/Corporate" },
      { label: "Investor Contact", link: "/InvestorContact" },
      {
        label: "AGM Compliance",
        link: "#",
        subItems: [
          { label: "Outcome of AGM", link: "/OutcomeAGM" },
          { label: "Notices", link: "/Notice" },
        ],
      },
      { label: "Transfer Of Share Notice", link: "/TransferShare" },
      { label: "Outcome Of Board Meeting", link: "/OutcomeMeet" },
      { label: "Listing Disclosure", link: "/Disclosure" },
      { label: "Related Party Transaction", link: "/Transaction" },
      {
        label: "General Disclosure",
        link: "#",
        subItems: [
          { label: "2020", link: "/Twenty" },
          { label: "2021", link: "/TwentyOne" },
          { label: "2022", link: "/TwentyTwo" },
          { label: "2023", link: "/TwentyThree" },
          { label: "2024", link: "/TwentyFour" },
        ],
      },
      { label: "Investor KYC", link: "/InvestorKYC" },
      { label: "IEPF", link: "/IEPF" },
      { label: "Advertisements", link: "/Advertisements" },
    ],
  },
];