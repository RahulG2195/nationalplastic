"use client"
import Link from 'next/link';
import "@/Components/preChairsCard/preChairsCard.css";
import { useEffect, useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import axios from 'axios';

const Search = (props) => {
    const [inWishlist, setInWishlist] = useState(false);
    const [products, setProducts] = useState([]);
    // const [filtred , setFiltered] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/Products");
                const filtered = response.data.products.filter(product => product.product_name.toLowerCase() === "shamiyana");
                setProducts(filtered);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchData();
    }, []);

    const setid = (id) => {
        // localStorage.setItem('myId', id);
    };

    const handleAddToCart = (id) => {
        // Handle adding to cart
    };

    const handleAddWishlist = (id) => {
        // Handle adding to wishlist
    };

    return (
        <>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {products.map(product => (
                    <div key={product.id} className="col">
                        <div className='preCont cards p-1 position-relative'>
                            <Link onClick={() => setid(product.id)} href={`/ProductDetail`}>
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
                                            <i onClick={() => handleAddWishlist(product.product_id)} className={` ${inWishlist ? 'fa fa-heart' : 'fa fa-heart-o ms-3'}`}
                                                style={inWishlist ? { fontSize: '20px', color: '#DC3545' } : {}}
                                                aria-hidden="true"></i>
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
                                            <div>{product.Discount}%</div>
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
