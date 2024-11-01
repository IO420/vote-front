import { io, Socket } from 'socket.io-client';
import { useEffect, useState, useRef } from 'react';

const socketUrl = 'http://localhost:3000'; 

// Define la interfaz Vote para reflejar la estructura de datos recibida
export interface Vote {
  id_user_elections: number; // ID único para cada voto
  option: string; // Opción del voto
}

export const useWebSocket = () => {
  const [votes, setVotes] = useState<Vote[]>([]); 
  const socketRef = useRef<Socket | null>(null); // Almacena la referencia del socket

  useEffect(() => {
    // Crea el socket solo si no existe aún
    if (!socketRef.current) {
      socketRef.current = io(socketUrl);

      socketRef.current.on('connect', () => {
        console.log('Conectado al servidor de votación');
      });

      // Escuchar por actualizaciones de votos
      socketRef.current.on('updateVoters', (data: Vote[]) => {
        console.log('Voto recibido:', data);
        setVotes(data); // Actualiza el estado de votos con todos los votos recibidos
      });
    }

    return () => {
      // Desconecta el socket solo si la referencia existe
      if (socketRef.current) {
        socketRef.current.off('updateVoters');
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []); 

  return { votes };
};
