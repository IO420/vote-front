'use client'
import React, { useEffect, useState } from "react";
import VoteAssignment from "../components/vote/VoteAssignment";
import VoteTracker from "../components/vote/VoteTracker";
import { useFetch } from "../services/fetch"; 
import MapeoUser, { User } from "../components/vote/MapeoUser";
import UserTracker from "../components/user/UserTracker";

export default function Page() {
  const { fetchData } = useFetch();
  const [users, setUsers] = useState<User[]>([]); // Asegúrate de que 'users' sea un arreglo de 'User'

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fetchData({}, "/user", "GET", true);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <VoteAssignment />
      <UserTracker
        title="Users"
        items={users} // Debe ser un arreglo de usuarios
        RenderComponent={MapeoUser}
      />
    </>
  );
}
