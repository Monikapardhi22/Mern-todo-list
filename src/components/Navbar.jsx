import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({  onLogout }) {
  const nav = useNavigate();

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#7e5bef',
    fontFamily: 'cursive',
    color: 'white',
    flexWrap: 'wrap',
    borderBottom: "0.5px solid #ffffff",
    fontSize: "18px",
  };

  const leftStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  const rightStyle = {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: '5px',
    fontSize: "18px",
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    // fontSize: '1rem',
    paddingLeft: "12px",
    fontSize:"23px",
  };

  const buttonStyle = {
    padding: '6px 12px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#ffffff',
    color: '#7e5bef',
    fontFamily: 'cursive',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: "18px",
  };

  const handleLogout = () => {
    onLogout();        
    nav('/login');     
  };

  return (
    <nav style={navStyle}>
      <div style={leftStyle}>
        <Link to="/" style={linkStyle}>TodoApp</Link>
      </div>
      <div style={rightStyle}>
        
            <Link to="/login" style={linkStyle}>Profile</Link>
            <button onClick={handleLogout} style={buttonStyle}>Logout</button>
         
            
        
      </div>
    </nav>
  );
}
