"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/users", {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
      console.log("Fetched data:", data);
    };
    fetchData();
  }, []);

  return (
    <div className="font-[family-name:var(--font-geist-sans)] p-8">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
    </div>
  );
}
