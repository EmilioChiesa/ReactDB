import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WineDetail = ({ wineId }) => {
  const [wine, setWine] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/wines/${wineId}`)
      .then(response => setWine(response.data))
      .catch(error => console.error('Error fetching wine details:', error));
  }, [wineId]);

  if (!wine) return <div>Loading...</div>;

  return (
    <div>
      <h1>{wine.name}</h1>
      <h2>Reviews:</h2>
      <ul>
        {wine.reviews.map(review => (
          <li key={review._id}>
            <p>User: {review.username}</p>
            <p>Premium: {review.isPremium ? 'Yes' : 'No'}</p>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
            <p>Date: {new Date(review.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WineDetail;
