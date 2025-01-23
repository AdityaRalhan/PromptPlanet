"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  // to see if the image has been copied or not
  const [copied, setCopied] = useState(" ");
  const [likedDisliked, setLikedDisliked] = useState(" ");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  const handleLikedDisliked = async (e) => {
    const userId = session.user.id
    // console.log("this is the userid",userId);
    // console.log("sending liked status",e);

    setLikedDisliked(e);
    
    try {
      await fetch(`/api/prompt/${post._id}/updateLikes`, {
        method: 'PATCH',
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ liked: e, userId: userId }),
      });
    } catch (error) {
      console.error("Error while updating prompt:", error);
    }
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image? post.creator.image : '/assets/images/profile.png'}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="copy_btn" onClick={handleCopy}>
            <Image
              src={
                copied === post.prompt
                  ? "/assets/icons/tick.svg"
                  : "assets/icons/copy.svg"
              }
              width={15}
              height={15}
              alt="copied tag"
            />
          </div>
          <div className="copy_btn" onClick={() => handleLikedDisliked(true)}>
            <Image
              src={
                likedDisliked === true
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/like.png"
              }
              width={15}
              height={15}
              alt="copied tag"
            />
          </div>
          <div className="copy_btn" onClick={() => handleLikedDisliked(false)}>
            <Image
              src={
                likedDisliked === false
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/dislike.png"
              }
              width={15}
              height={15}
              alt="copied tag"
            />
          </div>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <div className="flex gap-40">
        <p
          className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          # {post.tag}
        </p>
        <p className="font-inter text-sm blue_gradient cursor-pointer">
          {post.likes}
        </p>
      </div>

      {/* checking if the logged in user is the  creator and is on the /profile page? */}
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>

          <p
            className="font-inter text-sm rose_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
