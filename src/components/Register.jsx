import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

export default function Register({ setUser }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const nav = useNavigate();

  const submit = async (e) => {
  e.preventDefault();
  try {
    const res = await registerUser(form);  
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setUser(res.data.user);
    nav("/todos");
  } catch (err) {
    console.log(err.response);
    alert(err.response?.data?.message || "Registration failed");
  }
};
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #7e5bef, #ffffff)',
    padding: '10px',
    fontFamily: 'cursive',
    fontSize:"18px",
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '15px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    fontSize:"18px",
  };

  const inputStyle = {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontFamily: 'cursive',
    // fontSize:"18px",
  };

  const buttonStyle = {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#7e5bef',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'cursive',
    fontSize:"18px",
  };

  const labelStyle = {
    fontWeight: 'bold',
    color: '#5a2fbf',
    fontSize:"18px",
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={submit} style={formStyle}>
        <h2 style={{ textAlign: 'center', color: '#5a2fbf' }}>Register</h2>

        <label style={labelStyle}>Name:</label>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Register
        </button>
      </form>
    </div>
  );
}
