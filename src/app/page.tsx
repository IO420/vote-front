"use client";
import React, { useEffect, useState } from "react";
import Votetracker from "./components/vote/VoteTracker";
import MapeoVote from "./components/vote/MapeoVote";
import { useFetch } from "./services/fetch";
import { VoteType } from "./services/VoteType";
import Login from "./components/login/Login";

export default function Page() {
  const { fetchData } = useFetch();
  const [votes, setVotes] = useState<VoteType[]>([]); // Ensure this is typed as an array
  const [hasVoted, setHasVoted] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem("Token");
    if (jwtToken) {
      const parts = jwtToken.split(".");
      if (parts.length === 3) {
        const decodedPayload = JSON.parse(atob(parts[1]));
        setUserId(decodedPayload.id_user);
      }
    }
  }, []);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const data = await fetchData(
          {},
          "/user-elections/bringUserElection",
          "GET",
          true
        );
        // Ensure that data is an array
        if (Array.isArray(data)) {
          setVotes(data);
        } else {
          setVotes([]); // Reset to empty array if data is not an array
        }
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    };

    fetchVotes();
  }, [userId]);

  // Check if votes is an array and filter valid votes (not null or undefined)
  const validVotes = Array.isArray(votes)
    ? votes.filter((vote): vote is VoteType => vote !== null && vote !== undefined)
    : []; // Default to empty array if votes is not an array

  // Filter votes with option null (pending votes)
  const pendingVotes = validVotes.filter((vote) => vote.option === null);

  // Filter votes with option not null (responded votes)
  const respondedVotes = validVotes.filter((vote) => vote.option !== null);

  if (!userId) {
    return (
      <>
        <p>Inicia sesión para continuar.</p>
        <Login />
      </>
    );
  }

  return (
    <>
      {/* Votetracker para votos pendientes */}
      <Votetracker
        key={userId}
        title="Votos Pendientes"
        items={pendingVotes}
        RenderComponent={MapeoVote}
      />

      {/* Votetracker para votos respondidos */}
      <Votetracker
        key={userId + 1}
        title="Votos Respondidos"
        items={respondedVotes}
        RenderComponent={MapeoVote}
      />

      {hasVoted && <p>Ya has votado. Gracias por tu participación.</p>}
    </>
  );
}
