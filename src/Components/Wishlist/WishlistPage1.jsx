import './Wishlist.css'
import WishlistCard from '../WishlistCard/WishlistCard'
import FooterRow from '../FooterRow/FooterRow';

const WishlistPage1 = () => {
    const wishlistItems = [
        {
            WishlistImg: "https://picsum.photos/id/0/367/267",
            productName: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            producDiscription: "Lorem ipsum dolor sit amet.",
            Price: "RS 00,000",
            originalPrice: "RS 00,000",
            discount:"36",
        },
        {
            WishlistImg: "https://picsum.photos/id/0/367/267",
            productName: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            producDiscription: "Lorem ipsum dolor sit amet.",
            Price: "RS 00,000",
            originalPrice: "RS 00,000",
            discount:"36",
        },
        {
            WishlistImg: "https://picsum.photos/id/0/367/267",
            productName: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            producDiscription: "Lorem ipsum dolor sit amet.",
            Price: "RS 00,000",
            originalPrice: "RS 00,000",
            discount:"36",
        },
    ];
    return (
        <>

            <div className="main_container">

                <div className="d-flex justify-content-center" >
                    <div className="WCcontainer border-0 ">

                        <h4 className='p-4 fw-bold'>Wishlist</h4>

                        <div className="center">
                            {wishlistItems.map((item, index) => (
                                <WishlistCard
                                    key={index}
                                    WishlistImg={item.WishlistImg}
                                    productName={item.productName}
                                    producDiscription={item.producDiscription}
                                    Price={item.Price}
                                    originalPrice={item.originalPrice}
                                    discount={item.discount}
                                />
                            ))}
                        </div>

                    </div>
                </div>

                <FooterRow />

            </div>
        </>
    )
}
export default WishlistPage1