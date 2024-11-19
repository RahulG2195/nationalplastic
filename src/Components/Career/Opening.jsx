"use client"
import { useEffect, useState } from 'react';
import JobCard from '../Job_Card/JobCard';
import axios from 'axios';

const Opening = () => {


    const [jobs, setJobs] = useState([]);
    console.log("jobs are ",jobs)

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get('/api/admin/jobs');
            setJobs(response.data.jobs);
            console.log("jobs are ",response.data)

        } catch (error) {
            message.error('Failed to fetch jobs');
        }
    };

    // Create a dummy array of job data
    // const jobData = [
    //     { id: 1, type: "Full Time", title: "Software Engineer", description: "Lorem ipsum dolor sit amet.", location: "Mumbai, India" },
    //     { id: 2, type: "Full Time", title: "Project Manager", description: "Lorem ipsum dolor sit amet.", location: "Delhi, India" },
    //     { id: 3, type: "Full Time", title: "UI/UX Designer", description: "Lorem ipsum dolor sit amet.", location: "Bangalore, India" },
    //     { id: 4, type: "Full Time", title: "Backend Developer", description: "Lorem ipsum dolor sit amet.", location: "Chennai, India" },
    //     { id: 5, type: "Full Time", title: "Frontend Developer", description: "Lorem ipsum dolor sit amet.", location: "Hyderabad, India" },
    //     { id: 6, type: "Full Time", title: "Data Scientist", description: "Lorem ipsum dolor sit amet.", location: "Kolkata, India" },
    //     { id: 7, type: "Full Time", title: "Business Analyst", description: "Lorem ipsum dolor sit amet.", location: "Pune, India" },
    //     { id: 8, type: "Full Time", title: "Product Manager", description: "Lorem ipsum dolor sit amet.", location: "Mumbai, India" },
    //     { id: 9, type: "Full Time", title: "Marketing Specialist", description: "Lorem ipsum dolor sit amet.", location: "Bangalore, India" },
    // ];

    return (
        <>
            <div className="mt-5 opening">
                <div className="text-center fw-bold">
                    <div className="title2 fs-1 darkBlue">
                        Join <span className="fw-bold text-danger">US</span>
                    </div>
                    <div className="mt-1 fw-normal">Current Openings</div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="Card-container mt-4 border-top">
                        <h5 className="px-3 my-4 fw-bold d-inline-block">Full Time</h5>
                        {/* <span className="px-3 py-2 bg-body-secondary rounded-pill small fw-bold">{jobs.length} JOBS</span> */}
                        <div className="container text-center">
                            <div className="row">
                                {jobs.map((job) => (
                                    <div className="col-md-4" key={job.id}>
                                        <JobCard job={job} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Opening;
