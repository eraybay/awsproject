"use client";
import React from "react";
import { API, Storage } from "aws-amplify";
import { useState, useEffect, useRef } from "react";
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
  const [coverImage, setcoverImage] = useState(null);
  const [localImage, setlocalImage] = useState(null);
  const fileInput = useRef(null);
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
    const updateCoverImage = async (image) => {
      const imageKey = await Storage.get(image);
      setcoverImage(imageKey);
    };
    if (postData.data.getPost.coverImage) {
      updateCoverImage(postData.data.getPost.coverImage);
    }

    console.log(post);
  };
  async function uploadImage() {
    fileInput.current.click();
  }
  function onChangeFile(e) {
    const fileUpload = e.target.files[0];
    if (!fileUpload) return;
    setcoverImage(fileUpload);
    setlocalImage(URL.createObjectURL(fileUpload));
  }
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
    if (coverImage && localImage) {
      const filename = `${coverImage.name}_${nanoid()}`;
      postUpdated.coverImage = filename;
      await Storage.put(filename, coverImage);
    }
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
      {coverImage && (
        <div className="">
          <img
            src={localImage ? localImage : coverImage}
            className="w-48 h-48 object-cover"
          />
        </div>
      )}
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
      <input
        type="file"
        ref={fileInput}
        className="absolute w-0 h-0"
        onChange={onChangeFile}
      ></input>
      <button
        onClick={uploadImage}
        className="mb-4 bg-blue-400 px-8 py-2 rounded-lg font-semibold"
      >
        Upload Cover Image
      </button>
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
