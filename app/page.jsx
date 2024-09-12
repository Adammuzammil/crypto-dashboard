import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
};

export default Home;
