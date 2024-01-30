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
                    <div className="mt-1 fw-semibold">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has <br />
                        been the industry's standard dummy text ever since the 1500s,</div>
                </div>
            </div>

            <div className='d-flex justify-content-center mt-5'>
                <div class="row custReview bg-litepurple2 p-4" >
                    <div class="col-4 ">
                        <div className="custReviewRight text-center p-4 border-end border-secondary border-opacity-25">
                            <div className="darkBlue fw-bold fs-4">
                                Customer Love Us!
                            </div>
                            <div className='small fw-bold text-danger'>Explore customer's photos, videos & reviews</div>

                            <div className='fw-bold fs-4 mt-4'>
                                4.6 <i class="fa fa-star text-danger" aria-hidden="true"></i>
                            </div>

                            <div className='small mb-4'>Overall rating of this product by our customers from all platforms</div>


                            <UserRatingScoreBord />


                            <div className='pb-2 border-bottom border-secondary border-opacity-25 mt-5 d-flex justify-content-center align-items-center gap-2 '>
                                <div>
                                    <i class="fa fa-bars mx-2 bg-litepurple p-2 rounded-circle" aria-hidden="true"></i>
                                    Sort by
                                </div>
                                <div>
                                    <i class="fa fa-filter mx-2 bg-litepurple p-2 rounded-circle" aria-hidden="true"></i>
                                    Filter by
                                </div>
                            </div>


                            <Filters />


                        </div>
                    </div>


                    <div class="col-8">
                        <div className="custReviewLeft">

                            <CustomersExpirence />

                        </div>
                    </div>

                    <div className='text-center mt-5'>
                        <button type="button" class="btn btn-secondary  opacity-10 ">View All Reviews</button>

                    </div>
                </div>

            </div>


        </>
    )
}
export default CustomerReview