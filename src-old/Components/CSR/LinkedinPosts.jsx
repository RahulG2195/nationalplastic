import React from 'react';
import "./LinkedinPosts";

const LinkedinPosts = () => {
    return (
        <section className="social">
            <div className="container h-screen">
                <h2 className="text-center py-5 fs-1 text-danger">Our <span className='darkBlue fw-bold'>Linkedin</span></h2>
                
                <iframe className='instagramSliider' src="https://widget.tagembed.com/156029?view" style={{ width: "100%", height: "300px" }} allowtransparency="true"></iframe>
            </div>
        </section>
    )
}

export default LinkedinPosts;


