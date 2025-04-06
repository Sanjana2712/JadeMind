import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PromptInput = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [ageGroup, setAgeGroup] = useState('5-8');
  const [storyLength, setStoryLength] = useState('medium');
  const [genre, setGenre] = useState('adventure');

  const validateLength = (e) => {
    const maxlength=200;
    if(e.length<=maxlength)
    {
      setPrompt(e);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      return;
    }
    
    const promptData = {
      prompt,
      ageGroup,
      storyLength,
      genre
    };
    onSubmit(promptData);
  };

  const handleReset = () => {
    setPrompt('');
  };

  const ageGroups = [
    { value: '3-5', label: 'Preschool (3-5 years)' },
    { value: '5-8', label: 'Early Elementary (5-8 years)' },
    { value: '8-12', label: 'Middle Elementary (8-12 years)' },
  ];

  const storyLengths = [
    { value: 'short', label: 'Short (2-3 minutes)' },
    { value: 'medium', label: 'Medium (5-7 minutes)' },
    { value: 'long', label: 'Long (10-15 minutes)' }
  ];

  const genres = [
    { value: 'adventure', label: 'Adventure' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'science', label: 'Science & Discovery' },
    { value: 'animals', label: 'Animal Stories' },
    { value: 'fairytale', label: 'Fairy Tales' },
    { value: 'mystery', label: 'Mystery' },
    { value: 'educational', label: 'Educational' }
  ];

  return (
    <div className="prompt-input-container">
      <h2>Create Your Story</h2>
      <form onSubmit={handleSubmit} className="prompt-form">
        <div className="form-group">
          <label htmlFor="prompt-input">What should your story be about?</label>
          <textarea
            id="prompt-input"
            value={prompt}
            onChange={(e) => validateLength(e.target.value)}
            placeholder="Describe the kind of story you want (e.g., 'A brave little turtle who helps clean the ocean')"
            rows={4}
            disabled={isLoading}
          />
        </div>

        <div className="form-options">
          <div className="form-group">
            <label htmlFor="age-group">Age Group</label>
            <select
              id="age-group"
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              disabled={isLoading}
            >
              {ageGroups.map(group => (
                <option key={group.value} value={group.value}>
                  {group.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="story-length">Story Length</label>
            <select
              id="story-length"
              value={storyLength}
              onChange={(e) => setStoryLength(e.target.value)}
              disabled={isLoading}
            >
              {storyLengths.map(length => (
                <option key={length.value} value={length.value}>
                  {length.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <select
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              disabled={isLoading}
            >
              {genres.map(genreOption => (
                <option key={genreOption.value} value={genreOption.value}>
                  {genreOption.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-buttons">
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading || !prompt}
            className="reset-button"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="submit-button"
          >
            {isLoading ? 'Creating Story...' : 'Generate Story'}
          </button>
        </div>
      </form>
      
      <div className="prompt-tips">
        <h3>Tips for great stories:</h3>
        <ul>
          <li>Include characters with names and personalities</li>
          <li>Mention a setting or place for your story</li>
          <li>Suggest a problem or adventure for the characters</li>
          <li>Add any special elements you want (magic, talking animals, etc.)</li>
        </ul>
      </div>
    </div>
  );
};

PromptInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

PromptInput.defaultProps = {
  isLoading: false
};

export default PromptInput;