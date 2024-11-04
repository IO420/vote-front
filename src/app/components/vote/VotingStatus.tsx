"use client"; // Asegúrate de que esto esté al inicio del archivo

import './vote.css';
import React from "react";
import { useWebSocket, Vote } from "@/app/services/webSocketService";

export default function VotingStatus() {
  const { votes } = useWebSocket();

  const validVotes = (Array.isArray(votes) ? votes : []).filter(
    (vote): vote is Vote => vote !== null && vote !== undefined
  );

  const filteredVotes = validVotes.filter(vote => vote.option !== null);

  return (
    <div className="votetracker">
      <h4 className="titleTrackerVote">Estado de las Votaciones</h4>
      <ul className="bodyTracker">
        {filteredVotes.length > 0 ? (
          filteredVotes.map((vote: Vote) => (
            <li className="votes" key={vote.id_user_elections}>{vote.option}</li>
          ))
        ) : (
          <li>No hay votos registrados.</li>
        )}
      </ul>
    </div>
  );
}
