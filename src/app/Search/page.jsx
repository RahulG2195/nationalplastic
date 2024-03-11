"use client"
import Link from 'next/link';
import "@/Components/preChairsCard/preChairsCard.css";
import { useEffect, useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addItemToWishlist } from '@/redux/reducer/wishlistSlice';
import { addToCart } from '@/redux/reducer/cartSlice';
import InfiniteScroll from 'react-infinite-scroll-component'; 

const Search = (props) => {
    const [products, setProducts] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [allproducts, setAllproducts] = useState([])
    const query = props.searchParams.query;
    const dispatch = useDispatch();



    useEffect(() => {
        setPage(1);
        setProducts([]);
        setDiscounts([]);
    }, [query]);

    useEffect(() => {
        fetchData();
    }, [query, page]);

    const fetchData = async () => {
        try {

            if (query.trim() === '') {
                return;
            }

            const response = await axios.get(`http://localhost:3000/api/search?query=${query}&page=${page}`);
            const newProducts = response.data.products;
            const all = response.data.allproducts;

            setAllproducts(all)
            setProducts(prevProducts => [...prevProducts, ...newProducts]);
            setHasMore(newProducts.length > 0); // Check if there are more products to load
            const calculatedDiscounts = newProducts.map((product) => {
                const discountPercentage =
                    product.discount_price && product.price
                        ? Math.floor((product.discount_price - product.price) / product.discount_price * 100)
                        : 0;
                return discountPercentage;
            });
            setDiscounts(prevDiscounts => [...prevDiscounts, ...calculatedDiscounts]); // Append new discounts
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    const setid = (id) => {
        localStorage.setItem('myId', id);
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

    // const loadMore = () => {
    //     setPage(prevPage => prevPage + 1); // Load next page of products
    // };

    return (
        <>
            <p className='darkBlue fw-bold my-4 mx-2'>{allproducts.length} products found</p>
           
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

            <InfiniteScroll
                dataLength={products.length}
                next={() => setPage(page + 1)}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p>No more products to load</p>}
            />
        </>
    )
}

export default Search;
