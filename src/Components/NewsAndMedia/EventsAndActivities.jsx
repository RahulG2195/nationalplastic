"use client"
import React, { useEffect, useState } from "react";
import Card from "../Cards/Card";
import axios from "axios";

const EventsAndActivities = () => {
    // Array of card data
    //   const cardData = [
    //     { images: "https://picsum.photos/539/354" },
    //     { images: "https://picsum.photos/539/354" },
    //     { images: "https://picsum.photos/539/354" },
    //     { images: "https://picsum.photos/539/354" },
    //     { images: "https://picsum.photos/539/354" },
    //     { images: "https://picsum.photos/539/354" },
    //   ];

    const [cardData, setCardData] = useState([]);
    const [heading, setHeading] = useState('');
    const [subheading, setSubheading] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = 1;
                const response = await axios.get(`/api/news_media`, { params: { id } });
                const { heading, subheading, images } = response.data.newsMedia[0];
                setCardData(images ? images.split(',') : []);
                setHeading(heading || '');
                setSubheading(subheading || '');

            } catch (error) {
                console.error('Error fetching news data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className="main_container mt-5">
            <div className="text-center mb-5">
                <div className="fs-1 fw-bold text-danger">
                    {heading && heading.split('&')[0].trim() + ' & '}
                    <span className="darkBlue fw-normal">
                        {heading && heading.split('&')[1].trim()}
                    </span>
                </div>
                <div className="mt-1 fw-medium subCptRes w-md-50">
                    <p>{subheading}</p>
                </div>
            </div>


            <div className="container text-center mt-5 pb-5 mb-5">
                <div className="row">
                    {cardData.map((card, index) => (
                        <div className="col-md-4 my-3" key={index}>
                            <Card imgsrc={`Assets/uploads/${card}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventsAndActivities;
