"use client";
import React, { useState, useEffect } from "react";
import { Rate, Modal, Input, message } from "antd";
import { useParams } from "next/navigation";
import axios from "axios";
import "./CustomerReview.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const { TextArea } = Input;

const CustomerReview = () => {
  const [overallRating, setOverallRating] = useState(5);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, text: "" });
  const [canReview, setCanReview] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(2);
  const router = useParams();
  const product_id = router.productId;

  const gettingIdBasedReviews = async (product_id) => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`, JSON.stringify({ product_id: product_id }));
      const data = response.data;

      let reviewsToReturn = [];

      const mapReview = (review) => ({
        id: review.review_id,
        name: review.username,
        rating: review.review_rate,
        review: review.review_message,
        avatar: `https://xsgames.co/randomusers/avatar.php?g=${Math.random() > 0.5 ? 'male' : 'female'}`
      });

      if (data.review && Array.isArray(data.review)) {
        reviewsToReturn = data.review.map(mapReview);
      }

      if (reviewsToReturn.length < 5 && data.dummyReviews && Array.isArray(data.dummyReviews)) {
        const remainingCount = 5 - reviewsToReturn.length;
        const dummyReviewsToAdd = data.dummyReviews.slice(0, remainingCount).map(mapReview);
        reviewsToReturn = [...reviewsToReturn, ...dummyReviewsToAdd];
      }

      if (reviewsToReturn.length === 0) {
        console.warn("No reviews or dummy reviews found in the response");
      }

      return reviewsToReturn;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return [];
    }
  };

  useEffect(() => {
    gettingIdBasedReviews(product_id).then(fetchedReviews => {
      console.log("fetchedReviews", fetchedReviews);
      setReviews(fetchedReviews);
      updateOverallRating(fetchedReviews);
    });
  }, [product_id]);

  const updateOverallRating = (reviewsToRate) => {
    if (reviewsToRate.length > 0) {
      const newOverallRating = reviewsToRate.reduce((sum, review) => sum + review.rating, 0) / reviewsToRate.length;
      setOverallRating(newOverallRating);
    }
  };

  const showModal = () => {
    if (canReview) {
      setIsModalVisible(true);
    } else {
      message.warning("You can only review after a successful order and haven't reviewed yet.");
    }
  };

  const handleOk = () => {
    if (newReview.rating === 0 || newReview.text.trim() === "") {
      message.error("Please provide both a rating and a review.");
      return;
    }

    const reviewToAdd = {
      id: reviews.length + 1,
      name: "Current User",
      rating: newReview.rating,
      review: newReview.text,
      avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel",
    };

    const updatedReviews = [reviewToAdd, ...reviews];
    setReviews(updatedReviews);
    setIsModalVisible(false);
    setNewReview({ rating: 0, text: "" });
    message.success("Review submitted successfully!");

    updateOverallRating(updatedReviews);
    setCanReview(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewReview({ rating: 0, text: "" });
  };

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 2);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4">Customer <span className="text-primary">Reviews</span></h1>
        <p className="lead">See what our customers are saying about their experience</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body text-center">
              <h2 className="card-title">Customer Satisfaction</h2>
              <div className="mb-3">
                <Rate
                  disabled
                  value={overallRating}
                  allowHalf
                  className="large-stars"
                />
              </div>
              <button className="btn btn-primary" onClick={showModal}>
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {reviews.slice(0, visibleReviews).map((review) => (
          <div className="col-md-6 mb-4" key={review.id}>
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={review.avatar}
                    alt="Avatar"
                    className="rounded-circle mr-3"
                    width="50"
                    height="50"
                  />
                  <div>
                    <h5 className="card-title mb-0">{review.name}</h5>
                    <Rate disabled defaultValue={review.rating} />
                  </div>
                </div>
                <p className="card-text">{review.review}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleReviews < reviews.length && (
        <div className="text-center">
          <button className="btn btn-outline-primary" onClick={loadMoreReviews}>
            Load More Reviews
          </button>
        </div>
      )}

      <Modal
        title="Write a Review"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="form-group">
          <label>Rating:</label>
          <Rate
            value={newReview.rating}
            onChange={(value) => setNewReview({ ...newReview, rating: value })}
          />
        </div>
        <div className="form-group">
          <label>Review:</label>
          <TextArea
            rows={4}
            value={newReview.text}
            onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
            placeholder="Share your experience with this product..."
          />
        </div>
      </Modal>
    </div>
  );
};

export default CustomerReview;
