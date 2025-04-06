import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Link, useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MicIcon from '@mui/icons-material/Mic';
import PersonIcon from '@mui/icons-material/Person';
import PercentIcon from '@mui/icons-material/Percent';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Sidebar = ({ onToggle }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const expandedWidth = 240;
  const collapsedWidth = 70;

  const toggleSidebar = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    if (onToggle) {
      onToggle(newCollapsedState);
    }
    window.dispatchEvent(new CustomEvent('sidebar-toggle', { 
      detail: { collapsed: newCollapsedState } 
    }));
  };

  const listItemStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
    padding: collapsed ? '12px 0' : '12px 16px',
    marginBottom: '8px',
    borderRadius: '12px',
    justifyContent: collapsed ? 'center' : 'flex-start',
    transition: 'all 0.3s ease',
  };

  const linkStyle = {
    color: 'inherit',
    textDecoration: 'none',
    width: '100%',
  };

  const getItemStyle = (path) => ({
    ...listItemStyle,
    backgroundColor: location.pathname === path ? '#e8f4ff' : 'transparent',
    color: location.pathname === path ? '#4a6ea9' : '#555',
  });

  return (
    <Box 
      sx={{
        width: collapsed ? collapsedWidth : expandedWidth,
        flexShrink: 0,
        position: 'fixed',
        left: 0,
        top: 'var(--header-height)', 
        height: 'calc(100vh - var(--header-height) - var(--footer-height))', 
        backgroundColor: '#f9f9f9',
        borderRight: '1px solid #eaeaea',
        padding: collapsed ? '20px 0' : '20px 16px',
        boxShadow: '2px 0 10px rgba(0,0,0,0.05)',
        zIndex: 100,
        borderRadius: '0 15px 15px 0',
        transition: 'width 0.3s ease, padding 0.3s ease',
        overflow: 'hidden',
      }}
      aria-label="sidebar navigation"
    >
      
<Box sx={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  mb: 3,
  position: 'relative',
  paddingTop: collapsed ? '30px' : '20px', 
}}>
  <IconButton
    onClick={toggleSidebar}
    sx={{
      position: 'absolute',
      right: collapsed ? '50%' : 0,
      transform: collapsed ? 'translateX(50%)' : 'none',
      top: collapsed ? -15 : 0, 
      backgroundColor: '#f0f7ff',
      '&:hover': {
        backgroundColor: '#e8f4ff',
      },
      width: 30,
      height: 30,
      padding: 0,
      transition: 'right 0.3s ease, transform 0.3s ease, top 0.3s ease',
    }}
    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
  >
    {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
  </IconButton>
  
  <Avatar
    sx={{
      width: collapsed ? 40 : 70,
      height: collapsed ? 40 : 70,
      bgcolor: '#a9c4f5',
      color: '#4a6ea9',
      borderRadius: '50%',
      cursor: 'pointer',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      mb: 2,
      fontSize: collapsed ? '1.2rem' : '2rem',
      transition: 'width 0.3s ease, height 0.3s ease, font-size 0.3s ease',
      position: 'relative',
    }}
  >
    <PersonIcon fontSize="inherit" />
  </Avatar>
  
  {!collapsed && (
    <>
      <Typography variant="h6" sx={{ fontWeight: 600, color: '#4a6ea9' }}>
        Luna
      </Typography>
      <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>
        Magical stories
      </Typography>
    </>
  )}
</Box>
      
      <Divider sx={{ mb: 2, backgroundColor: '#e0e0e0' }} />
      
      <List sx={{ p: 0 }}>
      <Link to="/storytime" style={linkStyle}>
  <ListItem
    key="StoryTime"
    style={getItemStyle('/storytime')}
  >
    <MenuBookIcon sx={{ mr: collapsed ? 0 : 2, fontSize: '1.4rem', fontWeight:'bold' }} />
    {!collapsed && (
      <Typography
        variant="body1"
        sx={{
          fontWeight: location.pathname === '/storytime' ? 600 : 400,
        }}
      >
        StoryTime
      </Typography>
    )}
  </ListItem>
</Link>

        <Link to="/VerboBot" style={linkStyle}>
          <ListItem
            key="VerboBot"
            style={getItemStyle('/VerboBot')}
          >
            <MicIcon sx={{ mr: collapsed ? 0 : 2, fontSize: '1.4rem' }} />
            {!collapsed && (
              <Typography
                variant="body1"
                sx={{
                  fontWeight: location.pathname === '/VerboBot' ? 600 : 400,
                }}
              >
                VerboBot
              </Typography>
            )}
          </ListItem>
        </Link>
        
        <Link to="/avatar" style={linkStyle}>
          <ListItem
            key="Avatar"
            style={getItemStyle('/avatar')}
          >
            <PersonIcon sx={{ mr: collapsed ? 0 : 2,fontSize: '1.4rem'}} />
            {!collapsed && (
              <Typography
                variant="body1"
                sx={{
                  fontWeight: location.pathname === '/avatar' ? 600 : 400,
                }}
              >
                Persona
              </Typography>
            )}
          </ListItem>
        </Link>

        <Link to="/math" style={linkStyle}>
          <ListItem
            key="MathWhiz"
            style={getItemStyle('/math')}
          >
            <PercentIcon sx={{ mr: collapsed ? 0 : 2, fontSize: '1.4rem'}} />
            {!collapsed && (
              <Typography
                variant="body1"
                sx={{
                  fontWeight: location.pathname === '/math' ? 600 : 400,
                }}
              >
                MathWhiz
              </Typography>
            )}
          </ListItem>
        </Link>
      </List>
    </Box>
  );
};

export default Sidebar;