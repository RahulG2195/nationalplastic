"use client"
import { useEffect, useState } from 'react';
import JobCard from '../Job_Card/JobCard';
import axios from 'axios';
const Opening = () => {


    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get('/api/admin/jobs');
            const filteredJobs = response.data.jobs.filter(job => job.status === 1); // Filter jobs with status = 1
            setJobs(filteredJobs)

        } catch (error) {
            message.error('Failed to fetch jobs');
        }
    };


    return (
        <>
            <div className="mt-5 opening container">
                <div className="text-center fw-bold">
                    <div className="title2 fs-1 darkBlue">
                        Join <span className="fw-bold text-danger">US</span>
                    </div>
                    <div className="mt-1 fw-normal">Current Openings</div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="Card-container mt-4 border-top w-100">
                        <h5 className="px-3 my-4 fw-bold d-inline-block">Full Time</h5>
                        <span className="px-3 py-2 bg-body-secondary rounded-pill small fw-bold">{jobs.length} JOBS</span>
                        <div className="container text-center">
                            <div className="row">
                                {jobs.map((job) => (
                                    <div className="col-md-4 " key={job.id}>
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
