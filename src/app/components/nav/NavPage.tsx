"use client";
import React, { useState, useEffect } from "react";
import "./navPage.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function NavPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    setIsAuthenticated(!!token); // true si existe el token, false si no
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (token) {
      try {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
      
        setIsAdmin(decodedPayload.type === 1);
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsAdmin(false); // En caso de error en la decodificación, establece false
      }
    } else {
      setIsAdmin(false); // Si no hay token, establece false
    }
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("Token");
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <div className="navPage" onClick={toggleVisibility}>
      <h4 className="titleTrackerVote">NavPage</h4>
      <ul className={`mainPage ${isVisible ? "show" : ""}`}>
        <Link href={'/'}><li className={pathname === '/' ? 'select':''}>Home</li></Link>

        {isAdmin && (
          <>
            <Link href={'/CreateUser'}><li className={pathname === '/CreateUser' ? 'select':''}>Create User</li></Link>
            <Link href={'/CreateVote'}><li className={pathname === '/CreateVote' ? 'select':''}>Create Vote</li></Link>
            <Link href={'/VoteAssignment'}><li className={pathname === '/VoteAssignment' ? 'select':''}>Vote Assignment</li></Link>
            <Link href={'/VoteStatus'}><li className={pathname === '/VoteStatus' ? 'select':''}>Vote Status</li></Link>
          </>
        )}
      </ul>
      
      {isAuthenticated && (
        <button className="logoutButton" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
}
