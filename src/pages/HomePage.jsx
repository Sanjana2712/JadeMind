import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Luna</h1>
      <p>Create amazing stories with AI</p>
      <Link to="/storytime" className="feature-button">
        Start Creating Stories
      </Link>
    </div>
  );
};

export default HomePage;