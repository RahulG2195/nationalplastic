"use client"
import './Wishlist.css'
import WishlistCard from '../WishlistCard/WishlistCard'
import FooterRow from '../FooterRow/FooterRow';
import { useEffect, useState } from 'react';
import axios from 'axios';

const WishlistPage1 = () => {


    const [wishlistItems, setWishlistitems] = useState([])


    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/Wishlist')
                setWishlistitems(response.data.Wishlist)
            } catch (error) {
                alert("error")

            }
        }

        fetchdata();
    }, [])


    // const handleAddToWishlist = async (product) => {
    //     console.log(product)

    //     const isProductAlreadyAdded = wishlistItems.some(item => item.name === ProductName);
    //     if (isProductAlreadyAdded) {
    //         alert("This product is already in your wishlist.");
    //         return;
    //     }

    //     try {
    //         // Add the product to the wishlist
    //         await axios.post('http://localhost:3000/api/Wishlist', product);
    //         // Fetch updated wishlist data after adding the product
    //         fetchData();
    //     } catch (error) {
    //         console.error("Error adding product to wishlist:", error);
    //     }
    // };

    const handleDeleteSuccess = async (WishlistId) => {
       

        try {
            const response = await axios.delete(`http://localhost:3000/api/Wishlist`, { data: { WishlistId } });
            setWishlistitems(prevItems => prevItems.filter(item =>item.WishlistId  !== WishlistId))
        } 
        catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>

            <div className="main_container">

                <div className="d-flex justify-content-center" >
                    <div className="WCcontainer border-0 ">

                        <h4 className='p-4 fw-bold'>Wishlist</h4>

                        <div className="center">

                            {wishlistItems.map((item) => (
                                console.log(),

                                <WishlistCard
                                    key={item.WishlistId}
                                    id={item.WishlistId}
                                    WishlistImg={`/Assets/images/New-launches-1/${item.WishlistImg}`}
                                    productName={item.ProductName}
                                    producDiscription={item.productDiscription}
                                    Price={item.Price}
                                    originalPrice={item.originalPrice}
                                    discount={item.discount}
                                    onDeleteSuccess={() => handleDeleteSuccess(item.WishlistId)
                                    }
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