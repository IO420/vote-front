"use client";

import { usePathname } from "next/navigation";
import VoteTracker from "../components/vote/VoteTracker";
import wallPaper from "../components/vote/img/wallpaper.avif";
import MapeoVote from "../components/vote/MapeoVote";
import Guard from "../services/guard";

export default function VotePage() {
  const votes = [
    { id: 1, name: "Vote 1", image: wallPaper },
    { id: 2, name: "Vote 2", image: wallPaper },
    { id: 3, name: "Vote 3", image: wallPaper },
  ];

  function formatPathname(path: string) {
    const cleanedPath = path.startsWith("/") ? path.slice(1) : path;

    return cleanedPath.replace(/([A-Z])/g, " $1").trim();
  }

  const pathname = usePathname();
  const formattedPath = formatPathname(pathname);

  return (
    <>
      <Guard>
        <VoteTracker
          title={`vote: ${formattedPath}`}
          items={votes}
          RenderComponent={MapeoVote}
        />
      </Guard>
    </>
  );
}
