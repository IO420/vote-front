import React from "react";
import Image from "next/image";
import "./header.css";
import logo from "./img/escudo-b2.png";
import logo2 from "./img/logo_unam-b.png";

export default function Header() {
  return (
    <header>
      <div className="image">
        <Image src={logo} alt="logo" objectFit="cover" layout="fill" />
      </div>
      <div className="image">
        <Image src={logo2} alt="logo" objectFit="cover" layout="fill" />
      </div>
    </header>
  );
}
{
}
