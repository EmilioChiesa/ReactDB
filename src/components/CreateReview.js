import React, { useState } from 'react';
import axios from 'axios';

const CreateReview = ({ wineId, onReviewAdded }) => {
  const [username, setUsername] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/wines/${wineId}/reviews`, {
        username,
        isPremium,
        rating,
        comment,
      });
      onReviewAdded(response.data);
      setUsername('');
      setIsPremium(false);
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="checkbox"
        checked={isPremium}
        onChange={(e) => setIsPremium(e.target.checked)}
      />
      Premium
      <input
        type="number"
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <textarea
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">Add Review</button>
    </form>
  );
};

export default CreateReview;
