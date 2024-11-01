'use client';
import React, { useState } from 'react';
import { useFetch } from '../../services/fetch';

export default function CreateVote() {
  const [voteName, setVoteName] = useState('');
  const [endDate, setEndDate] = useState(''); // Estado para la fecha de finalización
  const { fetchData, error } = useFetch();

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const voteData = {
      name: voteName,
      end: endDate,
    };

    try {
      const response = await fetchData(voteData, '/elections', 'POST', true);
      console.log('Response:', response);
    } catch (error) {
      console.error('Error al crear la votación:', error);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h2 className="title">Create Vote</h2>

        <label>Vote Name</label>
        <input
          type="text"
          value={voteName}
          onChange={(e) => setVoteName(e.target.value)}
          required
        />

        <label>End Date</label>
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </form>
    </div>
  );
}
