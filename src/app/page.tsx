import React from "react";
import Login from "./components/login/Login";
import Vote from "./components/vote/Vote";
import Votetracker from "./components/vote/VoteTracker";
import wallPaper from "./components/vote/img/wallpaper.avif";
import MapeoVote from "./components/vote/MapeoVote";

export default function page() {
  const votes = [
    { id: 1, name: "Vote 1", image: wallPaper },
    { id: 2, name: "Vote 2", image: wallPaper },
    { id: 3, name: "Vote 3", image: wallPaper },
  ];

  return (
    <>
      <Votetracker
        title="Pending Votes"
        items={votes}
        RenderComponent={MapeoVote}
      />
      <Votetracker
        title="Submitted votes"
        items={votes}
        RenderComponent={MapeoVote}
      />
    </>
  );
}
