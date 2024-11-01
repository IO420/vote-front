import React from "react";
import Image from "next/image";
import Link from "next/link"; 
import "./vote.css"; // Asegúrate de tener los estilos correspondientes
import wallpaper from './img/wallpaper.avif';

export interface Vote {
  id: number;
  election: {
    name: string; // Cambiar a la estructura correcta
  };
}

interface MapeoVoteProps {
  vote: Vote;
}

const MapeoVote: React.FC<MapeoVoteProps> = ({ vote }) => {
  return (
    <Link href={`/${vote.election.name.toLowerCase().replace(/\s+/g, "")}`} passHref>
      <div className="voteCard" style={{ cursor: "pointer", position: 'relative', height: '200px', width: '300px' }}>
        <div className="img" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <Image
            src={wallpaper}
            alt={`Image of ${vote.election.name}`} // Cambiar a la propiedad correcta
            objectFit="cover"
            layout="fill"
          />
        </div>
        <h2 className="voteName">{vote.election.name}</h2> {/* Cambiar a la propiedad correcta */}
      </div>
    </Link>
  );
};

export default MapeoVote;
