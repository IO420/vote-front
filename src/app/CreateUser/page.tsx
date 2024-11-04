'use client'
import { useEffect, useState } from "react";
import CreateUser from "../components/Create/CreateUser";
import UserTracker from "../components/user/UserTracker";
import { useFetch } from "../services/fetch";
import MapeoUser, { User } from "../components/vote/MapeoUser";

export default function Page() {

  const { fetchData } = useFetch();
  const [users, setUsers] = useState<User[]>([]);

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
      <CreateUser />
      <UserTracker title="Users" items={users} RenderComponent={MapeoUser} />
    </>
  );
}
