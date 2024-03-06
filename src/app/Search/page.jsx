"use client"
import Link from 'next/link';
import "@/Components/preChairsCard/preChairsCard.css";
import { useEffect, useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addItemToWishlist } from '@/redux/reducer/wishlistSlice';
import { addToCart } from '@/redux/reducer/cartSlice';

const Search = (props) => {
    const [inWishlist, setInWishlist] = useState(false);
    const [products, setProducts] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const dispatch = useDispatch();

    const query = props.searchParams.query;

    //   useEffect(() => {
    //     const fetchWishlistItems = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:3000/api/Wishlist");
    //             const wishlistItems = response.data.products.map(product => product.product_id);
                
    //             // Update products with inWishlist property
    //             const updatedProducts = products.map(product => ({
    //                 ...product,
    //                 inWishlist: wishlistItems.includes(product.product_id)
    //             }));
    
    //             setProducts(updatedProducts);
    //         } catch (error) {
    //             console.error("Error fetching wishlist items:", error);
    //         }
    //     };
    //     fetchWishlistItems();

    // }, [inWishlist]);


    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(`http://localhost:3000/api/search?query=${query}`);
                // console.log("responce in search page  ", response)
                setProducts(response.data.products);

                const calculatedDiscounts = response.data.products.map((product) => {
                    const discountPercentage =
                        product.discount_price && product.price
                            ? Math.floor((product.discount_price - product.price) / product.discount_price * 100)
                            : 0;
                    return discountPercentage;
                });
                setDiscounts(calculatedDiscounts);

            } catch (error) {
                console.error('Error searching products:', error);
            }
        };
        fetchData();
        // fetchWishlistItems();

    }, [query]);

    // useEffect(() => {
    //     const fetchWishlistItems = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:3000/api/Wishlist");
    //             const wishlistItems = response.data.products.map(product => product.product_id);
                
    //             const updatedProducts = products.map(product => ({
    //                 ...product,
    //                 inWishlist: wishlistItems.includes(product.product_id)
    //             }));
    
    //             setProducts(updatedProducts);
    //         } catch (error) {
    //             console.error("Error fetching wishlist items:", error);
    //         }
    //     };
    //     // Run this effect only once when the component mounts
    //     fetchWishlistItems();
    // }, []); //

  
    const setid = (id) => {
        localStorage.setItem('myId', id);
        // console.log("id is the the het----------",id)
    };

    const handleAddToCart = (id) => {
        dispatch(addToCart({
            product_id: id,
          }));
    };

    const handleAddWishlist = (id) => {
        dispatch(addItemToWishlist({
            product_id: id,
        }));
        setInWishlist(true);

    };


    return (
        <>
            <p className='darkBlue fw-bold my-4 mx-2'>{products.length} products found</p>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {products.map((product, index) => (
                    <div key={product.id} className="col">
                        <div className='preCont cards p-1 position-relative'>
                            <Link onClick={() => setid(product.product_id)} href={`/ProductDetail`}>
                                <div className='card-header'>
                                    <img src={`/Assets/images/New-launches-1/${product.image_name}`} className="card-img-top" alt="..." />
                                </div>
                            </Link>
                            <div className="card-body">
                                <div className="PreFoot mt-2 ">
                                    <div className="class d-flex justify-content-between my-2 ">
                                        <Link onClick={() => setid(product.product_id)} href="/ProductDetail">
                                            <div className="left fw-bold text-danger">{product.product_name}</div>
                                        </Link>
                                        <div className="right">
                                            <i onClick={() => handleAddToCart(product.product_id)}> <ShoppingCartOutlinedIcon /> </i>
                                            <i
                                                onClick={() => handleAddWishlist(product.product_id)}
                                                className={` ${product.inWishlist ? 'fa fa-heart' : 'fa fa-heart-o ms-3'}`}
                                                style={product.inWishlist ? { fontSize: '20px', color: '#DC3545' } : {}}
                                                aria-hidden="true"
                                            ></i>
                                        </div>
                                    </div>
                                    <div className='text-left fw-medium my-2 DESCresp'>{product.short_description}</div>
                                    <div className="rs d-flex justify-content-between align-items-center ">
                                        <div className='d-flex gap-2 align-items-center'>
                                            <div> <i className="medium fa fa-inr fw-bold priceResp" aria-hidden="true"></i> </div>
                                            <div className='medium fw-bold priceResp'>{product.price}</div>
                                            <div className='small text-secondary text text-decoration-line-through'>{product.discount_price}</div>
                                        </div>
                                        <div className='d-flex fw-semibold text-danger '>
                                            <div>{discounts[index]}%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}

export default Search;
