import DiningTableCard from '../DiningTableCard/DiningTableCard';
import PopularCards from '../PopularPostsCards/PopularCards';
import './CategoryGrid.css';
import Image from 'next/image';

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

    return (
        <div className="Grid-main_container ml-md-5 text-center text-sm-center text-xs-center responsive-container">
            <div className="row mb-4 BlogGridCont">
                <div className="col-md-8 col-sm-12 col-12 gap-4 md-p-4 mx-auto">
                    <div className="content-container">
                        {productData.map((product, index) => (
                            <div key={index} className="mt-5">
                                <p className="small text-danger">{product.category}</p>
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
    );
}

export default CategoryGrid;
