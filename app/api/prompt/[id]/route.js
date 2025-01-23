import { connectToDb } from "@utils/database"
import Prompt from "@models/prompts";


// GET to read
export const GET = async(request, { params }) => {
    try {
        await connectToDb();
        const id = await params.id;

        const prompt = await Prompt.findById(id).populate('creator');

        if(!prompt){
            return new Response("Prompt not found ", {status: 404})
        }

        return new Response(JSON.stringify(prompt), { status: 200})
    } catch (error) {
        return new Response("Failed to fetch prompt", { status: 500})
    }
}

// PATCH to update the prompt
export const PATCH = async(request, {params}) => {
    const {prompt, tag} = await request.json()

    try {
        await connectToDb()

        const id = await params.id;
        const existingPrompt = await Prompt.findById(id)

        if(!existingPrompt) return new Response("Prompt not found", {status:404})

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), { status: 200})

    } catch (error) {
        return new Response("Failed to update prompt", {status:500})
    }
}

// DELETE to delete it
export const DELETE = async(request, {params}) => {
    try {
        connectToDb();
        const id = await params.id;

        await Prompt.findByIdAndDelete(id)
        return new Response("Prompt deleted succesfully", { status: 200})

    } catch (error) {
        return new Response("failed to delete prompt", { status: 500})
        
    }
}