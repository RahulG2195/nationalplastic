"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Cards/Card";
import './Environmental.css';

const EnvironmentalConservation = () => {
    const [cardImages, setCardImages] = useState([]);
    const [heading, setHeading] = useState('');
    const [subheading, setSubheading] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/news_media', { params: { id: 3 } });
                const { heading, subheading, images } = response.data.newsMedia[0];
                setHeading(heading)
                setSubheading(subheading)
                setCardImages(images ? images.split(',') : []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const splitHeading = heading.split(" ");


    return (
        <>
            <div className="text-center my-5">
                <div className="fs-1">
                    {splitHeading.length >= 2 ? (
                        <>
                            <span className="text-danger fw-bold">{splitHeading[0]}</span>{" "}
                            <span className="darkBlue">
                                {splitHeading.slice(1).join(" ")}
                            </span>
                        </>
                    ) : (
                        <span className="text-danger">{heading}</span>
                    )}
                </div>
                <div className="mt-1 fw-medium subCptRes w-50 mx-auto">
                    <p>
                        {subheading}
                    </p>
                </div>
            </div>
            <div className="container text-center my-5">
                <div className="row">
                    {cardImages.map((imgsrc, index) => (
                        <div className="col-md-4 col-sm-6 my-3" key={index}>
                            <Card imgsrc={`/Assets/uploads/${imgsrc}`} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default EnvironmentalConservation;
