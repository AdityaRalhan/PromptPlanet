    'use client'
    import {useState} from 'react'
    import { useSession } from 'next-auth/react'
    import { useRouter} from 'next/navigation'
    import Form from '@app/components/Form'

    const CreatePrompt = () => {

        const router = useRouter();
        const {data: session} = useSession()
        const id =  session?.user.id

        const [submitting, setSubmitting] = useState(false)
        const [post, setPost] = useState({
            prompt: "",
            tag: "",
            likes: 0,
            dislikes: 0
        })

        const createPrompt = async(e) => {
            e.preventDefault()
            setSubmitting(true);

            try {
                const response = await fetch(`/api/prompt/${id}/new`,{
                    method: 'POST',
                    body: JSON.stringify({
                        prompt: post.prompt,
                        userId: session?.user.id,
                        tag: post.tag,
                        likes: post.likes,
                        dislikes: post.dislikes
                    })
                })

                if (response.ok) {
                    router.push('/')
                }
            } catch (error) {
                console.log("error while creating prompt", error);
            }
            finally{
                setSubmitting(false)
            }
        }

    return (
        <Form
            type="Create"
            post={post}
            setPost = {setPost}
            submitting = {submitting}
            handleSubmit = {createPrompt}


        />
    )
    }

    export default CreatePrompt
