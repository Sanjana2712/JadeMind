import React from 'react';
import PropTypes from 'prop-types';

const StoryControls = ({ onNewStory, storyText, storyTitle }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a blob with the story text
    const blob = new Blob([`${storyTitle}\n\n${storyText}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${storyTitle.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: storyTitle,
          text: `Check out this story: ${storyTitle}`,
          // url: window.location.href
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert('Sharing is not supported in your browser. You can download the story instead.');
    }
  };

  return (
    <div className="story-controls">
      <button 
        className="control-button new-story-button" 
        onClick={onNewStory}
      >
        Create New Story
      </button>
      
      <div className="story-actions">
        <button 
          className="action-button print-button" 
          onClick={handlePrint}
        >
          Print Story
        </button>
        
        <button 
          className="action-button download-button" 
          onClick={handleDownload}
        >
          Download
        </button>
        
        <button 
          className="action-button share-button" 
          onClick={handleShare}
        >
          Share
        </button>
      </div>
    </div>
  );
};

StoryControls.propTypes = {
  onNewStory: PropTypes.func.isRequired,
  storyText: PropTypes.string.isRequired,
  storyTitle: PropTypes.string.isRequired
};

export default StoryControls;