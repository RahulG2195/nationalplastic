import './CustomerReview.css'
import React from 'react';
import UserRatingScoreBord from '@/Components/RatingScoreBoard/UserRatingScoreBord';
import Filters from '../Filters/Filters';
import CustomersExpirence from '@/Components/CustomersExpirence/CustomersExpirence';

const CustomerReview = () => {

    // const userRatings = [
    //     { name: 'User1', rating: 4 },
    //     { name: 'User2', rating: 5 },
    //     { name: 'User3', rating: 3 }
    //     // Add more user ratings as needed
    // ];
    return (
        <>
            <div className="mt-5 ">
                <div className="text-center">
                    <div className="fs-1 fw-bold darkBlue">Customer<span className="text-danger"> Reviews</span> </div>
                    <div className="mt-1 fw-semibold subCptRes"><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has </p>
                       <p>been the industry's standard dummy text ever since the 1500s,</p> </div>
                </div>
            </div>


            <div className='custReviewContainer mt-5 mt-5'>

                <div className="row custReview bg-litepurple2 p-4 custReviewContainer">
                    <div className="col-sm-12 col-md-4">
                        <div className="custReviewRight text-center p-4 border-end border-secondary border-opacity-25">
                            <div className="darkBlue fw-bold fs-4">Customer Love Us!</div>
                            <div className="small fw-bold text-danger">
                                Explore customer's photos, videos & reviews
                            </div>

                            <div className="fw-bold fs-4 mt-4">
                                4.6 <i className="fa fa-star text-danger" aria-hidden="true"></i>
                            </div>

                            <div className="small mb-4">
                                Overall rating of this product by our customers from all platforms
                            </div>

                            <UserRatingScoreBord />

                            <div className="filterSortRes pb-2 border-bottom border-secondary border-opacity-25 mt-5 d-flex justify-content-center align-items-center gap-2">
                                <div>
                                    <i className="fa fa-bars mx-2 bg-litepurple p-2 rounded-circle" aria-hidden="true"></i>
                                    <span>Sort by</span>
                                </div>
                                <div>
                                    <i className="fa fa-filter mx-2 bg-litepurple p-2 rounded-circle" aria-hidden="true"></i>
                                    <span>Filter by</span>
                                </div>
                            </div>

                            <Filters />
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-8">
                        <div className="custReviewLeft">
                            <CustomersExpirence />
                        </div>
                    </div>

                    <div className="text-center resVeiwBtn mt-5">
                        <button type="button" className="btn btn-secondary opacity-10">View All Reviews</button>
                    </div>
                </div>


            </div>


        </>
    )
}
export default CustomerReview