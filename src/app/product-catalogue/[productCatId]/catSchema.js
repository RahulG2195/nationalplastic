const PRODUCT_CATEGORIES = {
    "premium-event-chair": {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.nationalplastic.com/"
        }, {
            "@type": "ListItem",
            "position": 2,
            "name": "Premium Event Chair",
            "item": "https://www.nationalplastic.com/product-catalogue/premium-event-chair"
        }]
    },
    "premium-chair": {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.nationalplastic.com/"
        }, {
            "@type": "ListItem",
            "position": 2,
            "name": "Premium Chair",
            "item": "https://www.nationalplastic.com/product-catalogue/premium-chair"
        }]
    },
    "without-arm-tent-chairs": {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.nationalplastic.com/"
        }, {
            "@type": "ListItem",
            "position": 2,
            "name": "Without Arm Tent Chair",
            "item": "https://www.nationalplastic.com/product-catalogue/without-arm-tent-chairs"
        }]
    },
    "popular-chair": {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.nationalplastic.com/"
        }, {
            "@type": "ListItem",
            "position": 2,
            "name": "Popular Chair",
            "item": "https://www.nationalplastic.com/product-catalogue/popular-chair"
        }]
    },
    "cabinet": {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.nationalplastic.com/"
        }, {
            "@type": "ListItem",
            "position": 2,
            "name": "Cabinet",
            "item": "https://www.nationalplastic.com/product-catalogue/cabinet"
        }]
    },
    "baby-chair": {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.nationalplastic.com/"
        }, {
            "@type": "ListItem",
            "position": 2,
            "name": "Baby Chair",
            "item": "https://www.nationalplastic.com/product-catalogue/baby-chair"
        }]
    },
    "box": {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.nationalplastic.com/"
        }, {
            "@type": "ListItem",
            "position": 2,
            "name": "Box",
            "item": "https://www.nationalplastic.com/product-catalogue/box"
        }]
    },
    "tables": {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.nationalplastic.com/"
        }, {
            "@type": "ListItem",
            "position": 2,
            "name": "Tables",
            "item": "https://www.nationalplastic.com/product-catalogue/tables"
        }]
    },
    "stools": {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.nationalplastic.com/"
        }, {
            "@type": "ListItem",
            "position": 2,
            "name": "Stools",
            "item": "https://www.nationalplastic.com/product-catalogue/stools"
        }]
    },
    "household": {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.nationalplastic.com/"
        }, {
            "@type": "ListItem",
            "position": 2,
            "name": "Household",
            "item": "https://www.nationalplastic.com/product-catalogue/household-products"
        }]
    },
    "drawer-rack": {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.nationalplastic.com/"
        }, {
            "@type": "ListItem",
            "position": 2,
            "name": "Drawer / Rack",
            "item": "https://www.nationalplastic.com/product-catalogue/drawer-rack"
        }]
    },
    "office-chair": {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.nationalplastic.com/"
        }, {
            "@type": "ListItem",
            "position": 2,
            "name": "Office Chair",
            "item": "https://www.nationalplastic.com/product-catalogue/office-chairs"
        }]
    },
    getCategory(categoryKey) {
        return this[categoryKey] || null;
    },
    // Helper method to get all categories
    getAllCategories() {
        const { getCategory, getAllCategories, ...categories } = this;
        return Object.values(categories);
    }
};

export default PRODUCT_CATEGORIES;