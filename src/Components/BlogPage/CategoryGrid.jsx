import DiningTableCard from '../DiningTableCard/DiningTableCard';
import PopularCards from '../PopularPostsCards/PopularCards';
import './CategoryGrid.css'
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
        <>
            <div className="main_container ml-5 text-center ">

                <div class="row mb-4 BlogGridCont">
                    <div class="col-8">
                        <div>
                            {productData.map((product, index) => (
                                <div key={index} className="mt-5">
                                    <p className="small text-danger">{product.category}</p>
                                    <p className="darkBlue fw-bold fs-2">{product.title}</p>
                                    <p className="small litegray">{product.date}</p>
                                    <DiningTableCard />
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className="col-4 mt-5">
                        <div className=' BlogSvg mt-5 pt-5'>
                            <div>
                                <Image
                                    src="/assets/svg/Group 725.svg"
                                    width={50}
                                    height={50}
                                    layout='responsive'
                                    objectFit='cover' />
                            </div>
                            <div className='bg-darkBlue text-white fw-bold d-flex align-items-center justify-content-center recentPost'>Recent Posts</div>
                            <div className='posts mt-4 fw-bold text-start'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</div>
                            <div className='posts mt-4 fw-bold text-start'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</div>
                            <div className='posts mt-4 fw-bold text-start'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</div>
                            <div className='posts mt-4 fw-bold text-start'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</div>
                            <div className='posts mt-4 fw-bold text-start'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</div>
                            <div className='posts mt-4 fw-bold text-start'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</div>

                            <PopularCards />
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default CategoryGrid