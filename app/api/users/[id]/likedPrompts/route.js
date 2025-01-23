import { connectToDb } from "@utils/database";
import UserLikedPrompts from "@models/userLikedPrompts";
import Prompt from "@models/prompts";

export const GET = async (req, { params }) => {
  const { id } = await params; 

  console.log("Fetching liked prompts for user:", id);

  try {
    await connectToDb();

    // Find the user's liked prompts record
    const userLikedPrompts = await UserLikedPrompts.findOne({ userId: id });  // Ensure that the field is userId, not Id
    
    if (!userLikedPrompts) {
      return new Response(JSON.stringify({ message: "User has not liked any prompts." }), { status: 404 });
    }

    // Get the liked prompts' details from the Prompt model
    const likedPrompts = await Prompt.find({ _id: { $in: userLikedPrompts.likedPrompts } });

    return new Response(JSON.stringify(likedPrompts), { status: 200 });
  } catch (error) {
    console.error("Error fetching liked prompts:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch liked prompts", error }), { status: 500 });
  }
};
