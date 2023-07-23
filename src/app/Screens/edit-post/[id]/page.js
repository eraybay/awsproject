"use client";
import React from "react";
import { API, Storage } from "aws-amplify";
import { useState, useEffect } from "react";
import { updatePost } from "@/graphql/mutations";
import { useRouter } from "next/navigation";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
const { nanoid } = require("nanoid");
import dynamic from "next/dynamic";
import { getPost } from "@/graphql/queries";

const page = ({ params }) => {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const { id } = params;
  useEffect(() => {
    fetchPost();
  }, []);
  const fetchPost = async () => {
    if (!id) {
      throw new Error();
      return;
    }
    const postData = await API.graphql({
      query: getPost,
      variables: { id },
    });
    setPost(postData.data.getPost);
    console.log(post);
  };
  if (!post) return;
  function onChange(e) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }));
    console.log(post);
  }
  const { title, content } = post;
  async function updateCurrentPost() {
    if (!title || !content) return;
    const postUpdated = {
      id,
      content,
      title,
    };
    await API.graphql({
      query: updatePost,
      variables: { input: postUpdated },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    router.push("/Screens/my-posts");
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-wide mt-6 mb-2">
        Edit Post
      </h1>
      <input
        onChange={onChange}
        name="title"
        placeholder="title"
        value={post.title}
        className="border-b pb-2 my-4 text-lg text-gray-500 y-2"
      />
      <SimpleMDE
        value={post.content}
        onChange={(value) => setPost({ ...post, content: value })}
      />{" "}
      <button
        onClick={updateCurrentPost}
        className="mb-4 bg-blue-400 px-8 py-2 rounded-lg font-semibold"
      >
        Update Post
      </button>
    </div>
  );
};

export default page;
