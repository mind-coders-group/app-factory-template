"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// 🔐 Tvoje vrednosti (po želji prebaci u .env fajl kasnije)
const supabase = createClient(
  "https://yfgoiwakxciahepgntbo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmZ29pd2FreGNpYWhlcGdudGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNzk0NzAsImV4cCI6MjA2OTY1NTQ3MH0.NBoBlpDeq9Lle5FmxvTEqu2T_i1RveYo50Eo_j5bJK4"
);

export default function NewAppPage() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name) return alert("App name is required");

    setLoading(true);

    const { data, error } = await supabase.from("apps").insert([
      {
        name,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
        description: desc,
        status: "draft",
      },
    ]);

    setLoading(false);

    if (error) {
      alert(`❌ Error: ${error.message}`);
      console.error(error);
    } else {
      alert("✅ App created!");
      setName("");
      setDesc("");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🧠 Create New App</h1>

      <input
        className="border border-gray-300 rounded p-3 mb-4 w-full"
        placeholder="App Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        className="border border-gray-300 rounded p-3 mb-4 w-full"
        placeholder="Short description..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className={`w-full text-white font-semibold py-2 rounded ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? "Creating..." : "🚀 Create App"}
      </button>
    </div>
  );
}

