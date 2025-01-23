import { connectToDb } from "@utils/database"
import Prompt from "@models/prompts";

export const POST = async(req) => {
    const { userId, prompt, tag} = await req.json();

    try {
        await connectToDb()
        const newPrompt = new Prompt({
            creator: userId,
            prompt: prompt,
            tag: tag,
            likes: 0,
            dislikes: 0
        })

        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt), {status: 201})
    } catch (error) {
        return Response("Failed to create a new prompt", {status: 500})
    }
}