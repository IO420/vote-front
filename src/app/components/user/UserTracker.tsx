import React from "react";

import "../vote/vote.css"; // Aplica los mismos estilos
import MapeoUser, { User } from "../vote/MapeoUser";

interface UserTrackerProps {
  title: string;
  items: User[]; // Asegúrate de que 'items' sea un arreglo de 'User'
}

const UserTracker: React.FC<UserTrackerProps> = ({ title, items }) => {
  return (
    <div className="votetracker">
      <h4 className="titleTrackerVote">{title}</h4>
      <section className="bodyTracker">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((user) => (
            <div key={user.id_user}>
              <MapeoUser user={user} /> {/* Pasa el usuario correcto */}
            </div>
          ))
        ) : (
          <p>No hay usuarios disponibles.</p> // Mensaje en caso de que no haya usuarios
        )}
      </section>
    </div>
  );
};

export default UserTracker;
