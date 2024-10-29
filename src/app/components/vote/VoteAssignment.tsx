"use client";
import React, { useState } from "react";
import "./vote.css";

const users = ["Usuario 1", "Usuario 2", "Usuario 3"];
const votes = ["Votación 1", "Votación 2", "Votación 3"];

export default function VoteAssignment() {
  const [selectedUser, setSelectedUser] = useState("");
  const [assignedVotes, setAssignedVotes] = useState([{ vote: "" }]);

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(e.target.value);
  };

  const handleVoteChange = (index: number, value: string) => {
    const newVotes = [...assignedVotes];
    newVotes[index].vote = value;
    setAssignedVotes(newVotes);
  };

  const addVoteField = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAssignedVotes([...assignedVotes, { vote: "" }]);
  };

  const removeVoteField = (index: number) => {
    const newVotes = assignedVotes.filter((_, i) => i !== index);
    setAssignedVotes(newVotes);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    console.log("Usuario:", selectedUser);
    console.log("Votaciones asignadas:", assignedVotes);
  };

  return (
    <div className="votetracker">
      <h4 className="titleTrackerVote">Asignación de Votaciones</h4>

      <form className="bodyAssignament" onSubmit={handleSubmit}>
        <section>
          <div className="user-select">
            <label>Select User:</label>
            <select value={selectedUser} onChange={handleUserChange}>
              <option value="">Select</option>
              {users.map((user, index) => (
                <option key={index} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <div className="vote-select">
            <label>Select Vote:</label>
            {assignedVotes.map((_, index) => (
              <div key={index} className="vote-field">
                <select
                  value={assignedVotes[index].vote}
                  onChange={(e) => handleVoteChange(index, e.target.value)}
                >
                  <option value="">Select Vote</option>
                  {votes.map((vote, i) => (
                    <option key={i} value={vote}>
                      {vote}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => removeVoteField(index)}
                  className="remove-button"
                >
                  Delete
                </button>
              </div>
            ))}
            <button onClick={addVoteField}>Add Vote</button>
          </div>
        </section>

        <button type="submit">Submit Assignment</button>
      </form>
    </div>
  );
}
