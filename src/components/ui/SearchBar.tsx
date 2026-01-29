"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex w-full">
      <input
        type="search"
        placeholder="Search for handcrafted items..."
        className="w-full rounded-md border border-primary/20 pr-12 px-4 py-2 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/30 transition"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md bg-primary hover:bg-primary/90 flex items-center justify-center"
      >
        <Search className="h-4 w-4 text-white" />
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
}
