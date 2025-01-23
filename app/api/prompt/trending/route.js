import { connectToDb } from "@utils/database";
import Prompt from "@models/prompts";

export const GET = async () => {
  try {
    await connectToDb();

    // Find all prompts and sort them by likes in descending order
    const prompts = await Prompt.find().sort({ likes: -1 });

    if (!prompts || prompts.length === 0) {
      return new Response(
        JSON.stringify({ message: "No prompts found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Prompts retrieved successfully", prompts }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to retrieve prompts", error }),
      { status: 500 }
    );
  }
};
