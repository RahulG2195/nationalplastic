"use client"
import React, { useState } from 'react';
import FooterRow from "../FooterRow/FooterRow";
import OrderSummaryCard from "../OrderSummaryCard/OrderCard";
import PriceDetailsCard from "../PriceDetails/PriceDetailsCard";
import './AddBody.css'

const AddBody = () => {
    return (
        <>
            <div className="main_container  position-relative">
                <div className="container text-center">
                    <div className="row gap-5">
                        
                        <div className="col-md-8 px-5 Addleft">
                            <div className="bordrBtm ">
                                <p className="text-start fw-semibold confirm bordrBtm p-3">Confirm Order</p>
                                <div className="d-flex align-items-center justify-content-between mt-4">
                                    <div className="medium fw-bold">SHIPPING ADDRESS</div>
                                    <div className="text-danger fw-bold">change</div>
                                </div>
                                <div className="text-start customerAddress">
                                    <div className="fw-bold mt-3">Janhavi</div>
                                    <div className="medium fw-semibold checkOutCptResp">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, ipsa!</div>
                                    <div className="my-3 medium fw-bold">Mobile : <span>0000000000</span> </div>
                                </div>
                            </div>
                            <div className="text-start fw-bold mt-3">Service Lift</div>
                            <div className="d-flex align-items-center gap-5 liftOptionsResp">
                                <div className="form-check">
                                    <input className="form-check-input border-black" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label className="form-check-label " htmlFor="flexRadioDefault1">
                                        Available
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input border-black" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">Not Available</label>
                                </div>
                            </div>
                            <div className="buying text-start mt-4 p-2 bg-white">
                                <input className="form-check-input border-black" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label text-danger mx-2 fw-bold medium" htmlFor="flexCheckDefault">Buying for your Business?</label>
                            </div>

                            <form className="text-start mt-3">
                                <div className="mb-3 d-flex flex-wrap gap-3">
                                    <input type="text" className="form-control" placeholder="Name" />
                                    <input type="text" className="form-control" placeholder="Email" />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Mobile" />
                                </div>
                                <button type="submit" className="btn btn-danger px-5 SaveBtnResp">Save</button>
                            </form>

                        </div>


                        <div className="col-md-3 AddRight text-start">
                            <div className="row">
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
                                        <button type="button" className="btn border Darkblue fw-semibold border-danger mt-2 viewMoreResp">View More . . . </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <FooterRow />
                </div>
            </div>
        </>
    );
};

export default AddBody;
