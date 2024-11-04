'use client'
import { useEffect, useState } from "react";
import CreateVote from "../components/Create/CreateVote";
import VoteTracker from "../components/vote/VoteTracker";
import { useFetch } from "../services/fetch";
import { VoteType } from "../services/VoteType";
import MapeoVote from "../components/vote/MapeoVote";

export default function Page() {

  const { fetchData } = useFetch();
  const [votes, setVotes] = useState<VoteType[]>([]); // Ensure this is typed as an array
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

  return (
    <>
      <CreateVote />{" "}
      <VoteTracker
        title="Votos Pendientes"
        items={votes}
        RenderComponent={MapeoVote}
      />
    </>
  );
}
