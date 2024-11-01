"use client";
import React, { useEffect, useState } from "react";
import { useFetch } from "../../services/fetch";
import "./vote.css";

export default function VoteAssignment() {
  const { fetchData, error } = useFetch();
  const [users, setUsers] = useState<{ id_user: number; name: string }[]>([]);
  const [votes, setVotes] = useState<{ id_elections: number; name: string }[]>([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [assignedVote, setAssignedVote] = useState("");

  useEffect(() => {
    const fetchUsersAndVotes = async () => {
      try {
        const usersData = await fetchData({}, "/user", "GET");
        setUsers(usersData);

        const votesData = await fetchData({}, "/elections", "GET");
        setVotes(votesData);
      } catch (err) {
        console.error("Error fetching users or votes:", err);
      }
    };

    fetchUsersAndVotes();
  }, []);

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(e.target.value);
    console.log(selectedUser);
  };

  const handleVoteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAssignedVote(e.target.value);
    console.log(assignedVote);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!assignedVote) {
      console.error("Please select a vote");
      return;
    }

    try {
      console.log(selectedUser, assignedVote);
      const voteData = {
        id_user: selectedUser,
        id_elections: assignedVote, // Solo se envía un voto
      };
      const response = await fetchData(
        voteData,
        "/user-elections/assign",
        "POST",
        true
      );
      console.log("Asignación exitosa:", response);
    } catch (error) {
      console.error("Error al asignar la votación:", error);
    }
  };

  return (
    <div className="votetracker">
      <h4 className="titleTrackerVote">Asignación de Votaciones</h4>

      <form className="bodyAssignament" onSubmit={handleSubmit}>
        <section>
          <div className="user-select">
            <label>Select User:</label>
            <select value={selectedUser} onChange={handleUserChange} required>
              <option value="">Select</option>
              {users.map((user) => (
                <option key={user.id_user} value={user.id_user}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="vote-select">
            <label>Select Vote:</label>
            <select
              value={assignedVote} // Cambia para usar un único voto
              onChange={handleVoteChange}
              required
            >
              <option value="">Select Vote</option>
              {votes.map((vote) => (
                <option key={vote.id_elections} value={vote.id_elections}>
                  {vote.name}
                </option>
              ))}
            </select>
          </div>
        </section>

        <button type="submit">Submit Assignment</button>

        {error && <p style={{ color: "red" }}>Error: {error}</p>}
      </form>
    </div>
  );
}
