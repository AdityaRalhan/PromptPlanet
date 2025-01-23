import { connectToDb } from "@utils/database";
import UserLikedPrompts from "@models/userLikedPrompts";
import Prompt from "@models/prompts";

export const PATCH = async (req, { params }) => {

//   console.log("API route reached");

  const { id } = await params;
  const body = await req.json(); // Parse the body correctly
  const { userId, liked } = body;

//   console.log("Received ID:", id);
//   console.log("Received userId:", userId);
//   console.log("Received liked status:", liked);

  try {
    await connectToDb();

    // Find the prompt by ID
    const prompt = await Prompt.findById(id);
    if (!prompt) {
      return new Response(JSON.stringify({ message: "Prompt not found" }), {
        status: 404,
      });
    }

    // Check if the user has already liked or disliked this prompt
    const userLikedPrompts = await UserLikedPrompts.findOne({ userId });

    if (!userLikedPrompts) {
      // If the user hasn't liked any prompts yet, create a new document for them
      const newUserLikedPrompts = new UserLikedPrompts({
        userId,
        likedPrompts: liked ? [id] : [],
      });
      await newUserLikedPrompts.save();
    } else {
      // If the user already has a liked prompts record
      if (liked) {
        if (!userLikedPrompts.likedPrompts.includes(id)) {
          userLikedPrompts.likedPrompts.push(id); // Add prompt ID to liked prompts if not already liked
        }
      } else {
        const index = userLikedPrompts.likedPrompts.indexOf(id);
        if (index > -1) {
          userLikedPrompts.likedPrompts.splice(index, 1); // Remove prompt ID if disliked
        }
      }
      await userLikedPrompts.save();
    }

    // Update the prompt's like/dislike counts
    if (liked) {
      prompt.likes += 1; // Increment like count
    } else {
      prompt.dislikes += 1; // Increment dislike count
    }
    await prompt.save();

    return new Response(
      JSON.stringify({ message: "Prompt updated successfully", prompt }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to update the prompt", error }),
      { status: 500 }
    );
  }
};
