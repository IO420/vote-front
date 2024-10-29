import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import NavPage from "./components/nav/NavPage";

export const metadata: Metadata = {
  title: "Vote",
  description: "vote app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="main">
          <NavPage />
          <section className="mainContainer"> {children}</section>
        </div>
        <Footer />
      </body>
    </html>
  );
}
