// This service handles interactions with the AI story generation API

// Replace this URL with your actual AI API endpoint
const API_URL = 'https://your-ai-api-endpoint.com/generate-story';

/**
 * Generates a story based on the provided prompt data
 * 
 * @param {Object} promptData - The data for generating the story
 * @param {string} promptData.prompt - The main story prompt
 * @param {string} promptData.ageGroup - Target age group (e.g., '5-8')
 * @param {string} promptData.storyLength - Desired length ('short', 'medium', 'long')
 * @param {string} promptData.genre - Story genre (e.g., 'adventure', 'fantasy')
 * @returns {Promise<Object>} - The generated story and title
 */
export const generateStory = async (promptData) => {
  try {
    // For development/testing, you can use this mock implementation
    if (process.env.REACT_APP_USE_MOCK_API === 'true') {
      return mockGenerateStory(promptData);
    }
    
    // Make the actual API call
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_AI_API_KEY}`
      },
      body: JSON.stringify(promptData)
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return {
      story: data.story,
      title: data.title || deriveTitle(promptData.prompt)
    };
  } catch (error) {
    console.error('Error in story generation service:', error);
    throw error;
  }
};

// Mock implementation for testing/development
const mockGenerateStory = (promptData) => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Create a title based on the prompt
      const title = deriveTitle(promptData.prompt);
      
      // Create a story based on the provided parameters
      let story = `Once upon a time, in a ${promptData.genre === 'fantasy' ? 'magical' : 'wonderful'} world, `;
      
      // Add content based on the prompt
      story += `there was a story about ${promptData.prompt}.\n\n`;
      
      // Adjust length based on storyLength
      const paragraphCount = 
        promptData.storyLength === 'short' ? 3 :
        promptData.storyLength === 'medium' ? 5 : 8;
      
      // Generate some placeholder paragraphs
      for (let i = 0; i < paragraphCount; i++) {
        story += `This is paragraph ${i+1} of the story. It would contain exciting content related to "${promptData.prompt}".\n\n`;
      }
      
      // Add an ending
      story += "And they all lived happily ever after.";
      
      resolve({
        story,
        title
      });
    }, 2000); // Simulate a 2-second API call
  });
};

// Helper function to derive a title from the prompt
const deriveTitle = (prompt) => {
  // Simple implementation: take the first 5 words of the prompt
  const words = prompt.trim().split(/\s+/);
  const titleWords = words.slice(0, 5);
  
  // Capitalize first letter of each word
  const formattedTitle = titleWords
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return formattedTitle + (titleWords.length < words.length ? '...' : '');
};