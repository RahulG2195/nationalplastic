import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';

const ProductsAccr = ({handleShow}) => {

  const handleOnClick = (productName) => {
    console.log("this product is clicked", productName);
    localStorage.setItem('productName', productName);
  }

  const accordionData = [
    {
      category: 'Premium Event Chairs',
      products: [
        'Karen', 'ICE, GLASS', 'GHOST CHAIR', 'Peral, Crown, Marble', 'Kia, Karen, Karnival', 'Shagun', 'Vivha, Shamiyana, Bada Shagun', 'Leon , Cambridge', 'Harrier'
      ]
    },
    {
      category: 'Without Arm Tents',
      products: ['Alto', 'ReAlto', 'Vista', 'Apollo / Volvo / Vento', 'UNO from Silvassa', 'Seltos']
    },
    {
      category: 'Premium Chair',
      products: ['Victoria', 'Orca', 'The Boss', 'Star/Queen', 'Rover', 'Ferrari .S.', 'Magna, Saab', 'Relax',
      'Solace', 'Altis', 'Atlantis', 'Bentley', 'BOSS',
      'Storm, Phantom', 'Thunder, Wonder, Aspire, Thunder', 'Leisure',
      'Spinex', 'Hector', 'Merc', 'Milano, Linea', 'Omega']
    },
    {
        category:'Popular Chair',
        products:[ 'Delhi, Agra, Shimla, Jaisalmer', 'Ajanta', 'Florish', 'Cretaa', 'Galaxy', 'Pune', 'GETZ/ BEST/ZEST']
    },
    {
        category:'Cabinet',
        products:['Planet Small','Planet Big','Planet Power Small','Planet Power Medium','Planet Power Big']
    },
    {
        category:' Baby Chair',
        products:[
            'Flora, Wave, Poo',
            'Yoyo rocker',
            'Bubbly',
            'Sleeper/Dolphin',
            'Polo',
            'Babylon',
          'Beatle With Tray'
          ]

    },
    
    {
        category:'Stool',
        products:['Cheeta', 'Jaguar', 'Puma', 'Tiger', 'Matisse', 'Sigma Steppe Stool', 'Hippo', 'Panda Stool','Otter Stool', 'Decor Panda Stool', 'Decor Otter Stool']
    },
    {
        category:'Table',
        products: ['Jaipur Dinning', 'Party Round', 'Patiala Centre Trolley', 'Rajkot Centre Trolley', 'Spectra', 'Regal', 'Jaipur RoMa Dinning', 'Party Round RoMa']
    },
    {
        category:'Box',
        products:["Tote Box 15 Ltrs Without Wheels",
         "Tote Box 15 Ltrs With Wheels", 
         "Tote Box 35 Ltrs Without Wheels", 
         "Tote Box 35 Ltrs With Wheels", 
         "Tote Box 60 Ltrs Without Wheels", 
         "Tote Box 60 Ltrs With Wheels",
          "Under the bed-40 ltr"]
    },
    {
        category:'Drawer',
        products: ['Drawer 3 Tier 130','Drawer 3 Tier 199','Drawer 3 Tier 190','Drawer 3 Tier 250']
    },


    // Add more categories and products here
  ];

    const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div >
      <Accordion style={{ backgroundColor: '#FFE000' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel0-content`}
          id={`panel0-header`}
        >
          <Typography>Products</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {accordionData.map((categoryItem, index) => (
              <Accordion  expanded={expanded === `panel${index+1}`} onChange={handleChange(`panel${index+1}`)} key={index} style={{ backgroundColor: '#F1EF99' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index + 1}bh-content`}
                  id={`panel${index + 1}bh-header`}
                >
                  <Typography>{categoryItem.category}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    {categoryItem.products.map((product, subIndex) => (
                      <p key={subIndex}>
                        <Link className="nav-link" href={`/ProductDetail/${product.seo_url}`} 
                         onClick={() => { handleOnClick(product); handleShow(); }}>{product}</Link>
                      </p>
                    ))}
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default ProductsAccr;
