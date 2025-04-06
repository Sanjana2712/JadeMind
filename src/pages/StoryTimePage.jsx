import React, { useState, useEffect } from 'react';
import StoryGenerator from '../components/StoryTime/StoryGenerator';
import StoryDisplay from '../components/StoryTime/StoryDisplay';
import Layout from '../components/common/Layout';
import PromptInput from '../components/StoryTime/PromptInput';
import StoryControls from '../components/StoryTime/StoryControls';
import '../styles/StoryTime.css';

const StoryTimePage = () => {
  const [promptData, setPromptData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyTitle, setStoryTitle] = useState('');
  const [story, setStory] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleSidebarToggle = (e) => {
      setSidebarCollapsed(e.detail.collapsed);
    };
    
    window.addEventListener('sidebar-toggle', handleSidebarToggle);
    
    return () => {
      window.removeEventListener('sidebar-toggle', handleSidebarToggle);
    };
  }, []);

  const handleStoryGenerated = (generatedStory, title) => {
    setStory(generatedStory);
    setStoryTitle(title || 'Your Story');
    setIsGenerating(false);
  };

  const handleGenerateStory = (promptData) => {
    setPromptData(promptData);
    setIsGenerating(true);
  };

  return (
    <div className={`storytime-page ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="storytime-container">
        <div className="storytime-content">
          {!story ? (
            <div className="prompt-section">
              <PromptInput
                onSubmit={handleGenerateStory}
                isLoading={isGenerating}
              />
              {isGenerating && promptData && (
                <StoryGenerator
                  promptData={promptData}
                  onStoryGenerated={handleStoryGenerated}
                />
              )}
            </div>
          ) : (
            <div className="story-section">
              <StoryDisplay
                story={story}
                title={storyTitle}
              />
              <StoryControls
                onNewStory={() => setStory('')}
                storyText={story}
                storyTitle={storyTitle}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryTimePage;