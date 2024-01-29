"use client"

// import React, { useEffect, useRef } from "react";
import NewsBanner from "../../Components/NewsAndMedia/NewsBanner"
import AwardsAndCertificates from "../../Components/NewsAndMedia/AwardsAndCertificates";
import EventsAndActivities from "../../Components/NewsAndMedia/EventsAndActivities";
// import { useLocomotiveScroll } from 'react-locomotive-scroll'
// import '../../styles/locomotive-scroll.css'
// import LocomotiveScroll from "locomotive-scroll";


const NewsAndMedia = () => {
    // const scrollref = useRef(null)

    // useEffect(() => {
    //     const scroll = new LocomotiveScroll({
    //         el: scrollref.current,
    //         smooth: true,

    //     })
    //     return (
    //         scroll.destroy()
    //     )
    // }, [])

    return (
        <>
            <div>

                <NewsBanner />
                <AwardsAndCertificates />
                <EventsAndActivities />
            </div>
        </>
    )



}

export default NewsAndMedia