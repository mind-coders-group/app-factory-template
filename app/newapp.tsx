"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NewAppPage() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
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
    alert(error ? error.message : "App created!");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New App</h1>
      <input
        className="border p-2 mb-4 w-full"
        placeholder="App Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="border p-2 mb-4 w-full"
        placeholder="App Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create App"}
      </button>
    </div>
  );
}
