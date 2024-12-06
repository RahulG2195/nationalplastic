"use client";
import React, { useState, useEffect } from "react";
import { Rate, Modal, Input, message } from "antd";
import { useParams } from "next/navigation";
import axios from "axios";
import "./CustomerReview.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { useSelector } from "react-redux";
import { notifyError } from "@/utils/notify";

const { TextArea } = Input;

const CustomerReview = () => {
  const { customer_id, email, userState } = useSelector((state) => ({
    customer_id: state.userData.customer_id,
    email: state.userData.email,
    userState: state.userData.isLoggedIn,
  }));
  const [overallRating, setOverallRating] = useState(5);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, text: "" });
  const [canReview, setCanReview] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(4);
  const router = useParams();
  const product_id = router.productId;
  const [review_product_id, setReviewProduct_id] = useState(localStorage.getItem("product_id") || null);
  const [InitialName, setInitialName] = useState('');
  const userEmail = useSelector((state) => state.userData.email);


  useEffect(() => {

    gettingIdBasedReviews(review_product_id).then(fetchedReviews => {
      setReviews(fetchedReviews);
      updateOverallRating(fetchedReviews);
    });

  }, [review_product_id]);

  const gettingIdBasedReviews = async (product_id) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`, JSON.stringify({ action: 'getProductReviews', product_id: product_id }));
      const data = response.data;

      let reviewsToReturn = [];
      const review = data.review
      const mapReview = (review) => ({
        id: review.review_id,
        name: review.username || 'Anonymous',
        rating: review.review_rate,
        review: review.review_message,
        avatar: review.username ? review.username[0].toUpperCase() : "https://xsgames.co/randomusers/avatar.php?g=pixel"
      });
      // Mapping real reviews if they exist
      if (data.review) {
        // Convert single review to array if it's not already an array
        const reviewArray = Array.isArray(data.review) ? data.review : [data.review];
        reviewsToReturn = reviewArray.map(mapReview);
      }

      // Fill with dummy reviews only if needed
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

  const updateOverallRating = (reviewsToRate) => {
    if (reviewsToRate.length > 0) {
      const newOverallRating = reviewsToRate.reduce((sum, review) => sum + review.rating, 0) / reviewsToRate.length;
      setOverallRating(newOverallRating);
    }
  };

  const showModal = async () => {
    const valid = await userValidation();
    if (canReview && valid) {
      setIsModalVisible(true);
    }
  };

  const handleOk = async () => {
    if (newReview.rating === 0 || newReview.text.trim() === "") {
      message.error("Please provide both a rating and a review.");
      return;
    }

    const reviewToAdd = {
      id: reviews.length + 1,
      name: "Current User",
      rating: newReview.rating,
      review: newReview.text,
      avatar: newReview.username
        ? newReview.username[0].toUpperCase()
        : "https://xsgames.co/randomusers/avatar.php?g=pixel",
      image: newReview.image ? URL.createObjectURL(newReview.image) : null,
    };

    const reviewData = {
      action: "postReview",
      customer_id: customer_id,
      product_id: review_product_id,
      review_message: newReview.text,
      review_rate: newReview.rating,
      userEmail: userEmail,
      image: newReview.image, // Include the image file
    };

    const response = await submitReview(reviewData);

    if (response) {
      const updatedReviews = [reviewToAdd, ...reviews];
      setReviews(updatedReviews);
      setIsModalVisible(false);
      setNewReview({ rating: 0, text: "", image: null });
      message.success("Review submitted successfully!");
      updateOverallRating(updatedReviews);
      setCanReview(false);
    }
  };

  const submitReview = async (reviewData) => {
    const formData = new FormData();
    for (const key in reviewData) {
      if (reviewData.hasOwnProperty(key)) {
        formData.append(key, reviewData[key]);
      }
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/reviews`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data.success;
    } catch (error) {
      notifyError(error.message);
      console.error("Error submitting review:", error);
      return false;
    }
  };


  const handleCancel = () => {
    setIsModalVisible(false);
    setNewReview({ rating: 0, text: "" });
  };

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 2);
  };

  const userValidation = async () => {
    try {
      if (!userState) {
        notifyError("Login to add a review");
        return false;
      }
      return true;
    } catch (error) {
      console.log("Error validating user: ", error.message);
      notifyError("Invalid", error.message);

    }
  }

  const toggleReviews = () => {
    if (visibleReviews === reviews.length) {
      setVisibleReviews(4);
    } else {
      setVisibleReviews(reviews.length);
    }
  };
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4">Customer <span className="text-danger">Reviews</span></h1>
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
                  className="large-star"
                />
              </div>
              <button className="btn btn-warning" onClick={showModal}>
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {reviews.slice(0, visibleReviews).map((review) => {
          const initialName = review.username ? review.username[0].toUpperCase() : 'NP';

          return (
            <div className="col-md-6 mb-4" key={review.id}>
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div className="rounded-circle InitialName profileInitialName">
                      {initialName}
                    </div>
                    <div>
                      <h5 className="card-title mb-0">{review.name}</h5>
                      <Rate disabled defaultValue={review.rating} />
                    </div>
                  </div>
                  <p className="card-text">{review.review}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <button className="btn btn-outline-danger" onClick={toggleReviews}>
          {visibleReviews === reviews.length ? "Show Less Reviews" : "Load More Reviews"}
        </button>
      </div>

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
        <div className="form-group">
          <label>Upload Image:</label>
          <Upload
            accept="image/*"
            beforeUpload={(file) => {
              setNewReview({ ...newReview, image: file });
              return false; // Prevent automatic upload
            }}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
      </Modal>
    </div>
  );
};

export default CustomerReview;
