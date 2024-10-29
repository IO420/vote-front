"use client";
import React from 'react';
import { useWebSocket, Vote } from '@/app/services/webSocketService'; // Ajusta la ruta según tu estructura

export default function VotingStatus() {
  const { votes } = useWebSocket();

  return (
    <div className='votetracker'>
      <h4 className='titleTrackerVote'>Estado de las Votaciones</h4>
      <ul className='bodyTracker'>
        {votes.map((vote: Vote, index: number) => (
          <li key={index}>
            {vote.name}: {vote.count} votos
          </li>
        ))}
      </ul>
    </div>
  );
}
