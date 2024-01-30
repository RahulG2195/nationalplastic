import React from 'react';

const UserRatingScoreBord = () => {
    // Sample ratings data
    const ratingsData = [
        { stars: 5, progress: 100, count: '1,112' },
        { stars: 4, progress: 70, count: '1,112' },
        { stars: 3, progress: 50, count: '1,112' },
        { stars: 2, progress: 30, count: '1,112' },
        { stars: 1, progress: 20, count: '1,112' },
        // Add more ratings data as needed
    ];

    return (
        <>
            {ratingsData.map((rating, index) => (
                    <div key={index} className="d-flex align-items-center justify-content-center ">
                        <div className="small">
                            {rating.stars} <i className="fa fa-star" aria-hidden="true"></i>
                        </div>
                        <div style={{ width: '50%', height: '5px', marginLeft: '5px' }} className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={rating.progress} aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar bg-darkBlue" style={{ width: `${rating.progress}%` }}></div>
                        </div>
                        <div className="small">
                            {rating.count}
                        </div>
                    </div>
            ))}
        </>
    );
}

export default UserRatingScoreBord;
