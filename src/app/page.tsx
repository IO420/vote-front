import React from "react";
import Login from "./components/login/Login";
import CreateUser from "./components/Create/CreateUser";
import CreateVote from "./components/Create/CreateVote";
import Vote from "./components/vote/Vote";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Votetracker from "./components/vote/VoteTracker";

export default function page() {
  return (
    <>
      <Header />
        <CreateUser />
        <Login />
        <CreateVote />
        <Vote />
        <Votetracker/>
      <Footer />
    </>
  );
}
