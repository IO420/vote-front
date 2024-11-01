"use client";
import React, { useState, useEffect } from "react";
import "./navPage.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function NavPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para verificar autenticación
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Verificar si el token está en localStorage
    const token = localStorage.getItem("Token");
    setIsAuthenticated(!!token); // true si existe el token, false si no
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("Token");
    setIsAuthenticated(false); // Cambia el estado de autenticación
    router.push("/");
  };

  return (
    <div className="navPage" onClick={toggleVisibility}>
      <h4 className="titleTrackerVote">NavPage</h4>
      <ul className={`mainPage ${isVisible ? "show" : ""}`}>
        <Link href={'/'}><li className={pathname === '/' ? 'select':''}>Home</li></Link>

        {isAuthenticated && (
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
