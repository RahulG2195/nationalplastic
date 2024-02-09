import './FooterRow.css'

const FooterRow = () => {
    const featuresData = [
        {
            iconSrc: "/assets/images/shop/shop.png",
            count: "50+",
            description: "Experienced Stores across India",
        },
        {
            iconSrc: "/assets/images/Shipping-01/Shipping-01.png",
            count: "350+",
            description: "Delivery Centres Across India",
        },
        {
            iconSrc: "/assets/images/reputation/reputation.png",
            count: "20 lakh+",
            description: "Satisfied Customer",
        },
        {
            iconSrc: "/assets/images/warranty/warranty.png",
            count: "1 year*",
            description: "Guaranteed Warranty",
        },
    ];

    return (
        <>

            <div className="features d-flex justify-content-center gap-5 flex-wrap m-5 px-5">
                {featuresData.map((feature, index) => (
                    <div key={index} className="shop d-flex justify-content-center feature">
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
        </>
    )
}

export default FooterRow