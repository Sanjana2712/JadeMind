import React from 'react';
import PropTypes from 'prop-types';

const StoryDisplay = ({ story, title }) => {
  // Split the story into paragraphs
  const paragraphs = story.split('\n').filter(para => para.trim() !== '');

  return (
    <div className="story-display-container">
      <div className="story-header">
        <h2>{title}</h2>
      </div>
      
      <div className="story-body">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="story-paragraph">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

StoryDisplay.propTypes = {
  story: PropTypes.string.isRequired,
  title: PropTypes.string
};

StoryDisplay.defaultProps = {
  title: 'Your Story'
};

export default StoryDisplay;