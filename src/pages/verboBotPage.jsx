import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/common/Layout';
import '../styles/VerboBOT.css'; // You'll need to create this CSS file

const VerboBOT = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [animationState, setAnimationState] = useState('idle');
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  
  useEffect(() => {
    const handleSidebarToggle = (e) => {
      setSidebarCollapsed(e.detail.collapsed);
    };
    window.addEventListener('sidebar-toggle', handleSidebarToggle);
    return () => {
      window.removeEventListener('sidebar-toggle', handleSidebarToggle);
    };
  }, []);

  // Timer for recording duration
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        // Close the audio tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setAnimationState('recording');
      setRecordingTime(0);
      setFeedback(null);
      setAudioUrl(null);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Please allow microphone access to use VerboBOT');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setAnimationState('thinking');
      
      // Simulate processing time
      setTimeout(() => {
        provideDummyFeedback();
      }, 2000);
    }
  };

  const provideDummyFeedback = () => {
    setAnimationState('done');
    setFeedback({
      fillerWords: {
        "um": 7,
        "like": 12,
        "you know": 5
      },
      pacing: "Moderate - Try slowing down a bit for clearer speech",
      clarity: "Good! You're using clear pronunciation most of the time",
      tips: [
        "Try taking a breath instead of saying 'um'",
        "Practice replacing 'like' with short pauses",
        "Record yourself more often to spot patterns"
      ]
    });
  };

  const resetRecording = () => {
    setAudioUrl(null);
    setFeedback(null);
    setAnimationState('idle');
  };

  return (
    <div className={`verbobot-page ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="verbobot-container">
        <div className="verbobot-header">
          <h1>VerboBOT</h1>
          <p>Your friendly speech coach! Record yourself and get feedback.</p>
        </div>
        
        <div className="verbobot-content">
          <div className="robot-animation-container">
            <div className={`robot-animation ${animationState}`}>
              {/* Robot face that changes with state */}
              <div className="robot-face">
                <div className="robot-eyes">
                  <div className="eye"></div>
                  <div className="eye"></div>
                </div>
                <div className="robot-mouth"></div>
              </div>
              
              {animationState === 'recording' && 
                <div className="recording-indicator">
                  <div className="pulse"></div>
                  Recording... {formatTime(recordingTime)}
                </div>
              }
              
              {animationState === 'thinking' && 
                <div className="thinking-indicator">
                  <div className="dot-pulse"></div>
                  Analyzing
                </div>
              }
            </div>
          </div>
          
          <div className="control-panel">
            {!isRecording && !feedback && (
              <button 
                className="record-button" 
                onClick={startRecording}
                aria-label="Start recording"
              >
                Start Recording
              </button>
            )}
            
            {isRecording && (
              <button 
                className="stop-button" 
                onClick={stopRecording}
                aria-label="Stop recording"
              >
                Stop Recording
              </button>
            )}
            
            {audioUrl && (
              <div className="audio-player">
                <h3>Your Recording</h3>
                <audio controls src={audioUrl} className="audio-control"></audio>
              </div>
            )}
            
            {feedback && (
              <div className="feedback-container">
                <h2>Your Speech Analysis</h2>
                
                <div className="filler-words-section">
                  <h3>Filler Words Used:</h3>
                  <div className="filler-words-list">
                    {Object.entries(feedback.fillerWords).map(([word, count]) => (
                      <div key={word} className="filler-word-item">
                        <span className="word">{word}</span>
                        <span className="count">{count}</span>
                        <div 
                          className="count-bar" 
                          style={{width: `${Math.min(count * 8, 100)}%`}}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="speech-metrics">
                  <div className="metric">
                    <h3>Pacing</h3>
                    <p>{feedback.pacing}</p>
                  </div>
                  <div className="metric">
                    <h3>Clarity</h3>
                    <p>{feedback.clarity}</p>
                  </div>
                </div>
                
                <div className="improvement-tips">
                  <h3>Tips to Improve:</h3>
                  <ul>
                    {feedback.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  className="try-again-button" 
                  onClick={resetRecording}
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerboBOT;