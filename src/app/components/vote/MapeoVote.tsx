import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link"; 
import "./vote.css";

export interface Vote {
  id: number;
  name: string;
  image: StaticImageData;
}

interface MapeoVoteProps {
  vote: Vote;
}

export default function MapeoVote({ vote }: MapeoVoteProps) {
  return (
    <Link href={`/${vote.name.toLowerCase().replace(/\s+/g, "")}`} passHref>
      <div className="voteCard" style={{ cursor: "pointer" }}>
        <div className="img">
          <Image
            src={vote.image}
            alt={`Image of ${vote.name}`}
            objectFit="cover"
            layout="fill"
          />
        </div>
        <h2 className="voteName">{vote.name}</h2>
      </div>
    </Link>
  );
}
