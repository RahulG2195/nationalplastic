import TogetherCard from "../BoughtTogetherCards/TogetherCard"
import DiningTableCard from "../DiningTableCard/DiningTableCard"
import PopularCards from "../PopularPostsCards/PopularCards"
import './Details.css'

const Details = () => {

    const togetherCardsData = [
        { imgSrc: "/assets/images/Magna/Magna.png", price: "00,000" },
        { imgSrc: "/assets/images/The-boss/The-boss.png", price: "00,000" },
        { imgSrc: "/assets/images/Top-selling-product/Top-selling-product.png", price: "00,000" },
        { imgSrc: "/assets/images/Magna/Magna.png", price: "00,000" },
        { imgSrc: "/assets/images/The-boss/The-boss.png", price: "00,000" },
        { imgSrc: "/assets/images/Top-selling-product/Top-selling-product.png", price: "00,000" },

    ];
    return (
        <>
            <div class="row mx-4">
                <div class="col-8 mt-5 ">
                    <div className="text-center">
                        <p className="small litegray">December 10, 2023</p>
                        <p className="darkBlue fw-bold fs-2 mb-5">Dining Table Set</p>
                    </div>
                    <DiningTableCard BottomCardsCptn="BottomCardsCptn" />
                    <DiningTableCard BottomCardsCptn="BottomCardsCptn" />
                    <DiningTableCard BottomCardsCptn="BottomCardsCptn" />
                    <div className="border-bottom border-secondary w-75 my-4 m-auto"></div>

                    <div class=" blogCmnts">
                        <p className="darkBlue fw-bold fs-4 m-4">Leave a Comment  </p>
                        <textarea class="form-control comntArea w-100" placeholder="Leave a comment here" id="floatingTextarea2"></textarea>
                        <div className="d-flex gap-5 my-3">
                            <input type="text" class="form-control" placeholder="Name" />
                            <input type="email" class="form-control" placeholder="Email" />
                        </div>
                        <center>
                            <button type="button" class="btn btn-danger commentBtn py-3 px-4 my-4 small">POST A COMMENT</button>
                        </center>
                    </div>

                </div>

                <div className="col-4 mt-5 ">
                    <div className=''>
                        <PopularCards StikyCard="DetailsPopularCard" />
                    </div>
                </div>

            </div>
            <div className="text-center mt-5 pt-5 mb-4">
                <div className="text-danger fw-bold fs-1">you Might<span className=" darkBlue fw-normal"> Also Like</span> </div>
                <div className=" mt-1 fw-normal medium ">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has</p>
                    <p>been the industry's standard dummy text ever since the 1500s,</p>
                </div>
            </div>
            <div className="d-flex justify-content-center mx-5 mb-5 px-5">
                <TogetherCard imgSrc={"/assets/images/Top-selling-product/Top-selling-product.png"} caption={" Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam "} />
                <TogetherCard imgSrc={"/assets/images/The-boss/The-boss.png"} caption={" Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam "} />
                <TogetherCard imgSrc={"/assets/images/Magna/Magna.png"} caption={" Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam "} />
            </div>

        </>
    )
}
export default Details 