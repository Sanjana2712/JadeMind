import React, { useState } from 'react';
import Sidebar from '../sidebar';
import ThemeToggle from '../ThemeToggle';
import '../../styles/global.css';
import '../../styles/SidebarIntegration.css';

export const Layout = ({ children }) => {
  // State for sidebar collapse
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="app-layout">
      <header className="app-header">
        <h1>Luna</h1>
        <ThemeToggle />
      </header>
      
      <div className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <Sidebar onToggle={toggleSidebar} />
      </div>
      
      <main className={`app-content ${collapsed ? 'content-expanded' : ''}`}>
        {children}
      </main>
      
    </div>
  );
};

export default Layout;