import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { generateStory } from '../../services/storyService';

const StoryGenerator = ({ promptData, onStoryGenerated }) => {
  useEffect(() => {
    const generateStoryContent = async () => {
      try {
        const result = await generateStory(promptData);
        
        onStoryGenerated(result.story, result.title);
      } catch (error) {
        console.error('Error generating story:', error);
        onStoryGenerated(
          'Sorry, there was an error creating your story. Please try again.',
          'Error'
        );
      }
    };

    generateStoryContent();
  }, [promptData, onStoryGenerated]);
  return null;
};

StoryGenerator.propTypes = {
  promptData: PropTypes.shape({
    prompt: PropTypes.string.isRequired,
    ageGroup: PropTypes.string.isRequired,
    storyLength: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired
  }).isRequired,
  onStoryGenerated: PropTypes.func.isRequired
};

export default StoryGenerator;