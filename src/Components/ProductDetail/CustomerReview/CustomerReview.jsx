"use client";
import "./CustomerReview.css";
import React, { useState , useEffect} from "react";
import { Rate, Modal, Input, message, Card, Avatar } from "antd";
import { useParams } from "next/navigation";
import axios from "axios";

const { TextArea } = Input;

// Dummy data
const dummyReviews = [
  { id: 1, name: "John Doe", rating: 5, review: "Great product! Highly recommended.", avatar: "https://xsgames.co/randomusers/avatar.php?g=male" },
  { id: 2, name: "Jane Smith", rating: 5, review: "Good quality, Excellent service and fast delivery..", avatar: "https://xsgames.co/randomusers/avatar.php?g=female" },
  { id: 3, name: "Bob Johnson", rating: 5, review: "Excellent service and fast delivery.", avatar: "https://xsgames.co/randomusers/avatar.php?g=male" },
];

const CustomerReview = () => {
  const [overallRating, setOverallRating] = useState(5);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, text: "" });
  const [canReview, setCanReview] = useState(true);
  const router = useParams();
  const product_id = router.productId;
  // const [reviews, setReviews] = useState([]);
  const [reviews, setReviews] = useState(dummyReviews);


  // const gettingIdBasedReviews = async (product_id) => {
  //   console.log("product_id: " + product_id);
  //   const reviewsFromDb = await axios.put(`${process.env.BASE_URL}/reviews`,JSON.stringify({ product_id: product_id }));
  //   console.log("reviews_from_db: " + JSON.stringify(reviewsFromDb))
  //   return reviewsFromDb.data;
  // };

  // useEffect(() => {
  //   gettingIdBasedReviews(product_id).then(setReviews);
  // }, [product_id]);

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
      text: newReview.text,
      avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel",
    };

    setReviews([reviewToAdd, ...reviews]);
    setIsModalVisible(false);
    setNewReview({ rating: 0, text: "" });
    message.success("Review submitted successfully!");

    const newOverallRating = (reviews.reduce((sum, review) => sum + review.rating, 0) + newReview.rating) / (reviews.length + 1);
    setOverallRating(newOverallRating);

    setCanReview(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewReview({ rating: 0, text: "" });
  };

  return (
    <div className="customer-review-container">
      <div className="review-header">
        <h1>Customer <span className="highlight">Reviews</span></h1>
        <p>See what our customers are saying about their experience</p>
      </div>

      <div className="review-content">
        <div className="review-summary">
          <Card>
            <h2>Customer Satisfaction</h2>
            <div className="overall-rating">
              {/* <span className="rating-number">{overallRating.toFixed(1)}</span> */}
              <Rate
                disabled
                defaultValue={overallRating}
                allowHalf
                className="large-stars"
              />
            </div>
            <button className="write-review-btn" onClick={showModal}>
              Write a Review
            </button>
          </Card>
        </div>

        <div className="review-list">
          {reviews.map((review) => (
            <Card key={review.id} className="review-card">
              <div className="review-header">
                <Avatar src={review.avatar} />
                <div className="review-info">
                  <h3>{review.name}</h3>
                  <Rate disabled defaultValue={review.rating} />
                </div>
              </div>
              <p className="review-text">{review.review}</p>
            </Card>
          ))}
        </div>
      </div>

      <Modal
        title="Write a Review"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="review-form">
          <label>Rating:</label>
          <Rate
            value={newReview.rating}
            onChange={(value) => setNewReview({ ...newReview, rating: value })}
          />
        </div>
        <div className="review-form">
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