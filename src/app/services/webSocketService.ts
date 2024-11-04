import { io, Socket } from 'socket.io-client';
import { useEffect, useState, useRef } from 'react';

const socketUrl = 'http://localhost:3000'; 

// Define la interfaz Vote para reflejar la estructura de datos recibida
export interface Vote {
  id_user_elections: number;
  option: string | null;
}

export const useWebSocket = () => {
  const [votes, setVotes] = useState<Vote[]>([]); 
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Conecta solo si el socket aún no está conectado
    if (!socketRef.current) {
      socketRef.current = io(socketUrl);

      socketRef.current.on('connect', () => {
        console.log('Conectado al servidor de votación');
      });

      // Escuchar por actualizaciones de votos
      socketRef.current.on('updateVoters', (data: Vote | Vote[]) => {
        console.log('Voto recibido:', data);

        if (Array.isArray(data)) {
          // Si data es un array, actualiza todos los votos
          setVotes(data.filter(vote => vote.option !== null));
        } else {
          // Si data es un solo objeto, lo añade a la lista de votos
          setVotes((prevVotes) => [...prevVotes, data].filter(vote => vote.option !== null));
        }
      });
    }

    // Limpieza al desmontar el componente
    return () => {
      if (socketRef.current) {
        socketRef.current.off('updateVoters');
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return { votes };
};
