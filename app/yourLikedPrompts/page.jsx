"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PromptCard from "@app/components/PromptCard";

const YourLikes = () => {
  const { data : session, status } = useSession();
  const [likedPrompts, setLikedPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [isClient, setIsClient] = useState(false); // State to check if it's client-side
  const router = useRouter();


  useEffect(() => {

    if (status === "loading") return; // Wait for session to load

    const fetchLikedPrompts = async () => {
      try {
        const response = await fetch(
          `/api/users/${session.user.id}/likedPrompts`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch liked prompts");
        }

        const prompts = await response.json();
        setLikedPrompts(prompts);
      } catch (error) {
        console.error("Error fetching liked prompts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedPrompts();
  }, [session, router]);

  if (loading) return <p>Loading your liked prompts...</p>;

  return (
    <div>
      <h1>Your Liked Prompts</h1>
      {likedPrompts.length === 0 ? (
        <p>You haven't liked any prompts yet.</p>
      ) : (
        <div className="mt-10 prompt_layout">
          {likedPrompts.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => {}}
              handleDelete={() => {}}
              handleTagClick={() =>{}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default YourLikes;
