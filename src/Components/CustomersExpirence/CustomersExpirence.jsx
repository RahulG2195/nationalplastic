import React from 'react';

const CustomersExperienceList = () => {
    const customerData = [
        {
            initial: 'PS',
            name: 'Prakash Iyer',
            rating: 5,
            feedback: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ipsam quas aliquam quod consectetur eligendi suscipit nulla id aspernatur sunt? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt deleniti aspernatur ea, ipsum et unde aperiam repellendus repellat, amet ex dolore dolorem consectetur, quidem qui similique reprehenderit consequuntur ratione nemo!',
        },
        {
            initial: 'KJ',
            name: 'Kunal Joshi ',
            rating: 5,
            feedback: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ipsam quas aliquam quod consectetur eligendi suscipit nulla id aspernatur sunt? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt deleniti aspernatur ea, ipsum et unde aperiam repellendus repellat, amet ex dolore dolorem consectetur, quidem qui similique reprehenderit consequuntur ratione nemo!',
        },
        {
            initial: 'VM',
            name: 'Vinay Menon',
            rating: 5,
            feedback: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ipsam quas aliquam quod consectetur eligendi suscipit nulla id aspernatur sunt? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt deleniti aspernatur ea, ipsum et unde aperiam repellendus repellat, amet ex dolore dolorem consectetur, quidem qui similique reprehenderit consequuntur ratione nemo!',
        },
        {
            initial: 'RD',
            name: 'Rahul Despande',
            rating: 5,
            feedback: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ipsam quas aliquam quod consectetur eligendi suscipit nulla id aspernatur sunt? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt deleniti aspernatur ea, ipsum et unde aperiam repellendus repellat, amet ex dolore dolorem consectetur, quidem qui similique reprehenderit consequuntur ratione nemo!',
        },
       

    ];

    return (
        <>
            {customerData.map((customer, index) => (
                <div key={index} className="mt-5 d-flex gap-2">
                    <div>
                        <p className="bg-white d-inline p-2 rounded-circle">{customer.initial}</p>
                    </div>
                    <div className="small">
                        <p className="text-">{customer.name}</p>
                        <div className="text-danger">
                            {Array.from({ length: customer.rating }, (_, i) => (
                                <i key={i} className="fa fa-star" aria-hidden="true"></i>
                            ))}
                        </div>
                        <p className="small">{customer.feedback}</p>
                    </div>
                </div>
            ))}
        </>
    );
}

export default CustomersExperienceList;
