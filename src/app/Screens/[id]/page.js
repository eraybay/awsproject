"use client";
import React from "react";
import { API, Storage } from "aws-amplify"; // Import Storage from aws-amplify
import { useRouter } from "next/router"; // next/navigation seems incorrect. Please confirm this.
import { getPost } from "@/graphql/queries";
import { useEffect, useState } from "react";

const PostPage = ({ id }) => {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  useEffect(() => {
    fetchById();
  }, []);

  const fetchById = async () => {
    try {
      const postData = await API.graphql({
        query: getPost,
        variables: { id: id || router.query.id }, // use the id from props, if not available, use the id from router query
      });
      setPost(postData.data.getPost);
      if (postData.data.getPost.coverImage) {
        updateCoverImage(postData.data.getPost.coverImage);
      }
    } catch (error) {
      console.error("Error fetching posts:    ", error);
    }
  };

  async function updateCoverImage(coverImage) {
    const imageKey = await Storage.get(coverImage);
    setCoverImage(imageKey);
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-5xl mt-4 font-semibold underline text-black">
        {post.title}
      </h1>
      {coverImage && <img src={coverImage} className="mt-4" />}
      <p className="text-sm font-light my-4"> By: {post.username}</p>
      <p className=" text-xl"> {post.content}</p>{" "}
      {/* Removed "By:" from here */}
    </div>
  );
};

export default PostPage;
