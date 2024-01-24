"use client"

import FooterRow from "../FooterRow/FooterRow";
import OrderSummaryCard from "../OrderSummaryCard/OrderCard";
import PriceDetailsCard from "../PriceDetails/PriceDetailsCard";

const AddBody = () => {


    return (
        <>
            <div className="main_container mt-5 mx-0  position-relative">
                <div className="container text-center">
                    <div className="row gap-5">
                        <div className="col-md-8 px-5 Addleft">
                            <div className="bordrBtm py-3">
                                <p className="text-start fw-semibold confirm bordrBtm p-3">Confirm Order</p>

                                <div className="d-flex justify-content-between mt-4">
                                    <div className="medium fw-bold">SHIPPING ADDRESS</div>
                                    <div className="text-danger fw-bold">change</div>
                                </div>

                                <div className="text-start customerAddress">
                                    <div className="fw-bold">Janhavi</div>
                                    <div className="medium fw-bold">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, ipsa!</div>
                                    <div className="my-3 medium fw-bold">Mobile : <span>0000000000</span> </div>
                                </div>
                            </div>

                            <div className="text-start fw-bold medium mt-3">SERVICE LIFT</div>
                            <div className="d-flex gap-5 mt-2">
                                <div class="form-check ">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label class="form-check-label medium fw-semibold" for="flexRadioDefault1">
                                        Available
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                    <label class="form-check-label medium fw-semibold" for="flexRadioDefault2">
                                        Unavailable
                                    </label>
                                </div>
                            </div>

                            <div class="buying text-start mt-5 p-2 bg-white">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label class="form-check-label text-danger mx-2 fw-bold" for="flexCheckDefault">
                                    Buying for your Business?
                                </label>
                            </div>

                            <form className="text-start mt-3">
                                <div class="mb-3 d-flex flex-wrap gap-3">
                                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Name" />
                                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" />
                                </div>
                                <div class="mb-3">
                                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Mobile" />
                                </div>
                                <button type="submit" class="btn btn-danger px-5">Save</button>
                            </form>

                        </div>


                        {/*######################## Price Details ##########################*/}


                        <div className="col-md-3 AddRight text-start">
                            <div className="row ">
                                <div className="col-md-12 BGcolor summary mb-2 p-3">


                                    <PriceDetailsCard />

                                </div>
                            </div>




                            <div className="row">
                                <div className="col-md-12 BGcolor">
                                    <p className="text-start fw-semibold confirm bordrBtm p-3">Order Summary</p>


                                    <OrderSummaryCard imgSrc="https://picsum.photos/id/0/367/267" description="Lorem ipsum dolor sit amet." quantity="00" />
                                    <OrderSummaryCard imgSrc="https://picsum.photos/id/0/367/267" description="Lorem ipsum dolor sit amet." quantity="00" />

                                    <div className="d-flex justify-content-center">
                                        <button type="button" class="btn border border-danger mt-2 ">View More . . . </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <FooterRow />

        </>
    );
};

export default AddBody;
