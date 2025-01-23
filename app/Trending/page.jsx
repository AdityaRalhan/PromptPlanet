"use client";
import PromptCard from "@app/components/PromptCard";
import { useEffect, useState } from "react";

const TrendingPage = () => {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    // Fetching the prompts from the backend API
    const fetchPrompts = async () => {
      try {
        const response = await fetch("/api/prompt/trending"); // Adjust the endpoint as per your API
        const data = await response.json();

        if (response.ok) {
          setPrompts(data.prompts);
        } else {
          setError(data.message || "Failed to fetch prompts");
        }
      } catch (error) {
        console.log("error while fetching prompts in Trending page", error);
      }
    };

    fetchPrompts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
  <h1 className="text-3xl font-bold mb-6">Trending Prompts</h1>
  <div className="mt-10 prompt_layout flex flex-col gap-8">
        {prompts.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => {}}
            handleDelete={() => {}}
            handleTagClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingPage;
