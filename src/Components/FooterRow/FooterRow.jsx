import './FooterRow.css';

const FooterRow = () => {
    const featuresData = [
        {
            iconSrc: "/Assets/images/shop/shop.png",
            count: "50+",
            description: "Experienced Stores across India",
        },
        {
            iconSrc: "/Assets/images/Shipping-01/Shipping-01.png",
            count: "350+",
            description: "Delivery Centres Across India",
        },
        {
            iconSrc: "/Assets/images/reputation/reputation.png",
            count: "20 lakh+",
            description: "Satisfied Customers",
        },
        {
            iconSrc: "/Assets/images/warranty/warranty.png",
            count: "1 year*",
            description: "Guaranteed Warranty",
        },
    ];

    return (
        <div className="features-container d-flex justify-content-center mt-3">
            <div className="features row row-cols-sm-2 row-cols-md-4">
                {featuresData.map((feature, index) => (
                    <div key={index} className="col feature">
                        <div className="icon">
                            <img src={feature.iconSrc} alt="" />
                        </div>
                        <div className="FeatureText mx-2">
                            <h5 className='fw-semibold'>{feature.count}</h5>
                            <h6>{feature.description}</h6>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FooterRow;
