"use client"
import React, { useState } from 'react';
import { useFetch } from '../../services/fetch';

export default function CreateUser() {
  const { fetchData, error } = useFetch();
  const [formData, setFormData] = useState({ name: '', mail: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Cambia a true o false dependiendo de si deseas enviar el token
      const response = await fetchData(formData, '/user/registerUser', 'POST', true);
      setMessage('User created successfully!');
      setFormData({ name: '', mail: '' });
    } catch (error) {
      setMessage('Error creating user: ' + error);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h2 className="title">Create User</h2>

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="mail"
          value={formData.mail}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>

        {message && <p>{message}</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </form>
    </div>
  );
}
