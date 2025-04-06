import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/common/Layout';
import HomePage from './pages/HomePage';
import VerboBOT from './pages/verboBotPage';
import StoryTimePage from './pages/StoryTimePage';
import { ThemeProvider } from './components/ThemeContext';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/storytime" element={<StoryTimePage />} />
            <Route path="/verbobot" element={<VerboBOT/>}/>

          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;