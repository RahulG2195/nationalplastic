"use client";
import DiningTableCard from '../DiningTableCard/DiningTableCard';
import PopularCards from '../PopularPostsCards/PopularCards';
import './CategoryGrid.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { notify } from '@/utils/notify';
import axios from 'axios';

const CategoryGrid = () => {
    const productData = [
        {
            category: "CHAIRS",
            title: "Dining Table Set",
            date: "DECEMBER 10, 2023",
        },
        {
            category: "MULTIPURPOSE",
            title: "Multipurpose Storage",
            date: "DECEMBER 10, 2023",
        },
        {
            category: "CULTURE",
            title: "Women's Day",
            date: "DECEMBER 10, 2023",
        },
    ];
    const [category, setCategory] = useState([]);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogsAndCategories = async () => {
            try {
                const { data } = await axios.get('/api/blog');
                console.log("Categories: ", data.categories);
                setCategory(data.categories);
                setBlogs(data.blogs);
            } catch (error) {
                console.error("Error fetching blogs and categories: ", error);
            }
        };

        fetchBlogsAndCategories();
    }, []);


    return (
        <>
            <div>
                <p className="fw-bold fs-1 text-danger text-center mb-2">Category</p>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-3 mb-2">
                <button type="button" className="btn customButton btn-outline-primary fw-semibold px-4 py-2 rounded-0 categoryRespBtn">Chairs</button>
                <button type="button" className="btn customButton btn-outline-primary fw-semibold px-4 py-2 rounded-0 categoryRespBtn">Storage</button>
                <button type="button" className="btn customButton btn-outline-primary fw-semibold px-4 py-2 rounded-0 categoryRespBtn">Multipurpose</button>
                <button type="button" className="btn customButton btn-outline-primary fw-semibold px-4 py-2 rounded-0 categoryRespBtn">Tables</button>
                <button type="button" className="btn customButton btn-outline-primary fw-semibold px-4 py-2 rounded-0 categoryRespBtn">Culture</button>
                <button type="button" className="btn customButton btn-outline-primary fw-semibold px-4 py-2 rounded-0 categoryRespBtn">Bulk Buy</button>
            </div>

            <div className="Grid-main_container ml-md-5 text-center text-sm-center text-xs-center responsive-container">
                <div className="row mb-4 BlogGridCont">
                    <div className="col-md-8 col-sm-12 col-12 gap-4 md-p-4 mx-auto">
                        <div className="content-container">
                            {productData.map((product, index) => (
                                <div key={index} className="mt-5">
                                    <p className="small text-danger fw-semibold">{product.category}</p>
                                    <p className="darkBlue fw-bold fs-3">{product.title}</p>
                                    <p className="small litegray">{product.date}</p>
                                    <DiningTableCard />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-sm-4 col-md-4 col-12 mt-5 p-md-4 right-grid-cont mx-auto">
                        <div className='BlogSvg mt-5 pt-5 mb-5'>
                            <div>
                                <div>
                                    <Image
                                        src="/Assets/svg/Group 725.svg"
                                        width={50}
                                        height={50}
                                        layout='responsive'
                                        objectFit='cover'
                                    />
                                </div>
                                <div className='bg-darkBlue text-white fw-bold d-flex align-items-center justify-content-center recentPost p-3'>
                                    Recent Posts
                                </div>
                                <div className='posts mt-3 fw-bold text-start small'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</div>
                                <div className='posts mt-3 fw-bold text-start small'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</div>
                                <div className='posts mt-3 fw-bold text-start small'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</div>
                                <div className='posts mt-3 fw-bold text-start small'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</div>
                                <div className='posts mt-3 fw-bold text-start small'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</div>
                                <div className='posts mt-3 fw-bold text-start small'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</div>
                            </div>
                            <div><PopularCards /></div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default CategoryGrid;
