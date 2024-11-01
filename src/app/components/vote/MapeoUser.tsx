import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./vote.css"; 
import wallpaper from './img/wallpaper.avif';

export interface User {
  id_user: number; // Cambié 'id' a 'id_user' para que coincida con los datos que recibes
  name: string;
}

interface MapeoVoteProps {
  user: User; // Asegúrate de que esto coincida con la estructura de datos
}

const MapeoUser: React.FC<MapeoVoteProps> = ({ user }) => {
  if (!user) {
    return <div>No user data</div>; // Manejo del caso donde 'user' es undefined
  }

  return (
    <Link href={`/${user.name.toLowerCase().replace(/\s+/g, "")}`} passHref>
      <div className="voteCard" style={{ cursor: "pointer", position: 'relative', height: '200px', width: '300px' }}>
        <div className="img" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <Image
            src={wallpaper}
            alt={`Image of ${user.name}`}
            objectFit="cover"
            layout="fill"
          />
        </div>
        <h2 className="voteName">{user.name}</h2>
      </div>
    </Link>
  );
}

export default MapeoUser;
