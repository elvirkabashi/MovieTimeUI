import React, { useState } from 'react';
import axios from 'axios';

const RatingForm = ({ movieId }) => {
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (e) => {
    setUserRating(parseFloat(e.target.value));
  };
  const handleSubmitRating = async () => {
    try {

      if (userRating === 0) {
        console.error('Rating cannot be zero.');
        return;
      }
  

      if (!comment.trim()) {
        console.error('Comment cannot be empty.');
        return;
      }
  
      const ratingData = {
        movieId: parseInt(movieId),
        rate: userRating,
        comment: comment,
      };
  
      const response = await axios.post('https://localhost:7147/api/ratings', ratingData);
  
      console.log('Rating submitted successfully:', response.data);
  
      setUserRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };
  
  return (
    <div className="rating-form">
      <h2>Rate this movie</h2>
      <select value={userRating} onChange={handleRatingChange}>
        <option value="0">Select Rating</option>
        {[1, 2, 3, 4, 5].map((rating) => (
          <option key={rating} value={rating}>
            {rating}
          </option>
        ))}
      </select>
      <textarea
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleSubmitRating}>
        Submit Rating
      </button>
    </div>
  );
};

export default RatingForm;
