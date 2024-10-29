'use client'
import React, { useState } from "react";
import "./navPage.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavPage() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="navPage" onClick={toggleVisibility}>
      <h4 className="titleTrackerVote">NavPage</h4>
      <ul className={`mainPage ${isVisible ? "show" : ""}`}>
        <Link href={'/'} ><li className={pathname === '/' ? 'select':''}>Home</li></Link>
        <Link href={'/CreateUser'} ><li className={pathname === '/CreateUser' ? 'select':''}>Create User</li></Link>
        <Link href={'/CreateVote'} ><li className={pathname === '/CreateVote' ? 'select':''}>Create Vote</li></Link>
        <Link href={'/VoteAssignment'} ><li className={pathname === '/VoteAssignment' ? 'select':''}>Vote Assignment</li></Link>
        <Link href={'/VoteStatus'} ><li className={pathname === '/VoteStatus' ? 'select':''}>Vote Status</li></Link>
      </ul>
    </div>
  );
}
