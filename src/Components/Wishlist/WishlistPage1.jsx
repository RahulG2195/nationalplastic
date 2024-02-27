"use client"
import './Wishlist.css'
import WishlistCard from '../WishlistCard/WishlistCard'
import FooterRow from '../FooterRow/FooterRow';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/reducer/cartSlice';

const WishlistPage1 = () => {


    const [wishlistItems, setWishlistitems] = useState([])
    const items = useSelector(state => state.cart.items);
    const dispatch = useDispatch();


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
            setWishlistitems(prevItems => prevItems.filter(item => item.WishlistId !== WishlistId))
        }
        catch (error) {
            console.error("Error:", error);
        }
    };

    const handleAddToCart = async (product_id, ProductName, short_description, price, discount_price, discount, ChairImg) => {
        
        dispatch(addToCart({
            product_id: product_id,
            product_name: ProductName,
            description: short_description,
            price: price,
            original_price: discount_price,
            image_name: ChairImg,
            discount: discount
        }));
        
    };

    // return (
    //     <>

    //         <div className="main_container">

    //             <div className="d-flex justify-content-center" >
    //                 <div className="WCcontainer border-0 ">

    //                     <h4 className='p-4 fw-bold'>Wishlist</h4>

    //                     <div className="center">

    //                         {wishlistItems.map((item) => (
    //                             console.log(),

    //                             <WishlistCard
    //                                 key={item.WishlistId}
    //                                 id={item.product_id}
    //                                 WishlistImg={`/Assets/images/New-launches-1/${item.WishlistImg}`}
    //                                 productName={item.ProductName}
    //                                 producDiscription={item.productDiscription}
    //                                 Price={item.Price}
    //                                 originalPrice={item.originalPrice}
    //                                 discount={item.discount}
    //                                 onDeleteSuccess={() => handleDeleteSuccess(item.WishlistId)
    //                                 }
    //                                 onAddToCart={() => handleAddToCart(
    //                                     item.product_id,
    //                                     item.ProductName,
    //                                     item.productDiscription,
    //                                     item.Price,
    //                                     item.originalPrice,
    //                                     item.discount,
    //                                     item.WishlistImg
    //                                 )}
    //                             />
    //                         ))}

    //                     </div>

    //                 </div>
    //             </div>

    //             <FooterRow />

    //         </div>
    //     </>
    // )
}
export default WishlistPage1