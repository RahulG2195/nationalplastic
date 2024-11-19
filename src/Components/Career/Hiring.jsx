"use client"
import './Hiring.css';
import Hirirng_Card from '../Hiring_Cards/Hiring_card';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Hiring = () => {
    const [processSteps, setProcessSteps] = useState([]);
   
  
    useEffect(() => {
      fetchProcessSteps();
    }, []);
  
    // Fetch the existing process steps
    const fetchProcessSteps = async () => {
      try {
        const response = await axios.get("/api/admin/hiring-process");
        setProcessSteps(response.data.processSteps);
      } catch (error) {
        message.error("Failed to fetch process steps");
      }
    };


    // Define only the essential data for each hiring stage
    const hiringStages = [
        {
            id: 1,
            title: "APPLY",
            imgSrc: "/Assets/svg/Group 929.svg",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas earum, ab atque mollitia molestias adipisci rerum accusantium laboriosam, inventore fuga iste vel odio ad esse!"
        },
        {
            id: 2,
            title: "INTERVIEW",
            imgSrc: "/Assets/svg/Group 928.svg",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas earum, ab atque mollitia molestias adipisci rerum accusantium laboriosam, inventore fuga iste vel odio ad esse!"
        },
        {
            id: 3,
            title: "RECRUITMENT",
            imgSrc: "/Assets/svg/Group 914.svg",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas earum, ab atque mollitia molestias adipisci rerum accusantium laboriosam, inventore fuga iste vel odio ad esse!"
        }
    ];

    return (
        <div className="main_container hirecont pb-5">
            <div className="text-center fw-bold mt-5">
                <div className="title2 fs-1 darkBlue">
                    Our Hiring<span className="fw-bold text-danger"> Process</span>
                </div>
                <div className="mt-1 fw-normal">Current Openings</div>
            </div>

            <div className="d-flex justify-content-evenly gap-5 my-5 respHiringCards Hiringheight mb-5">
                {processSteps.map((stage) => {
                    // Dynamically assign class names based on the stage
                    const className = `Card${stage.id}`;
                    const titleClassName = `process${stage.id}`;
                    const imgClassName = `IMG${stage.id}`;

                    return (
                        <div className={`HC${stage.id}`} key={stage.id}>
                            <Hirirng_Card
                                className={className}
                                TitleclassName={titleClassName}
                                IMGclassName={imgClassName}
                                ImgSrc={`/${process.env.NEXT_PUBLIC_UPLOAD_PATH_DIR}/${stage.image}`}
                                Title={stage.title}
                                Text={stage.description}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Hiring;
