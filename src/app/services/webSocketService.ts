// webSocketService.ts
import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

const socketUrl = 'http://localhost:3000'; // Cambia la URL según tu configuración

export interface Vote {
  name: string;
  count: number;
}

export const useWebSocket = () => {
  const [votes, setVotes] = useState<Vote[]>([]); // Estado para almacenar las votaciones
  const socket: Socket = io(socketUrl); // Crear la conexión al socket

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado al servidor de votación');
    });

    // Escuchar el evento 'updateVotes' del servidor
    socket.on('updateVotes', (updatedVotes: Vote[]) => {
      setVotes(updatedVotes); // Actualiza el estado con las votaciones recibidas
    });

    // Limpiar la conexión al desmontar el componente
    return () => {
      socket.off('updateVotes'); // Desuscribirse del evento al desmontar
      socket.disconnect(); // Desconectar el socket si es necesario
    };
  }, [socket]); // Añadimos el socket como dependencia

  return { votes }; // Retornar las votaciones
};
