"use client";

import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useRef } from "react";
import { API, Storage } from "aws-amplify";
import { useRouter } from "next/navigation";
const { nanoid } = require("nanoid");
import { createPost } from "@/graphql/mutations";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const page = () => {
  const [post, setPost] = useState({ title: "", content: "" });
  const { title, content } = post;
  const router = useRouter();
  const imageFileInput = useRef(null);

  const [image, setImage] = useState("");
  function onChange(e) {
    setPost(() => ({
      ...post,
      [e.target.name]: e.target.value,
    }));
  }
  async function createNewPost() {
    if (!title || !content) {
      throw new Error("Fill Out the forms");
      return;
    }
    const id = nanoid();

    if (image) {
      const filename = `${image.name}_${nanoid()}`; //creatin an image name that looks like partname_hdosahdoas
      post.coverImage = filename;
      await Storage.put(filename, image);
    }
    const newPost = {
      ...post,
      id: id,
    };
    await API.graphql({
      query: createPost,
      variables: { input: newPost },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    router.push("/Screens/" + id);
  }
  const uploadImage = async () => {
    imageFileInput.current.click();
  };
  function handleChange(e) {
    const fileUploaded = e.target.files[0];
    if (!fileUploaded) return;
    setImage(fileUploaded);
  }
  return (
    <div className="">
      <h1 className="text-5xl text-center block py-32">Create new Post</h1>
      <input
        onChange={onChange}
        name="title"
        placeholder="Title"
        value={post.title}
        className="border-b pb-2 text-lg h-12 w-3/4 mb-6 bg-slate-300 text-white placeholder:-gray-500 "
      ></input>
      <SimpleMDE
        value={post.content}
        onChange={(value) => setPost({ ...post, content: value })}
      />
      <input
        type="file"
        ref={imageFileInput}
        className="absolute w-0 h-0 "
        onChange={handleChange}
      ></input>
      {image && <img src={URL.createObjectURL(image)} className="my-4" />}
      <button
        type="button"
        className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
        onClick={uploadImage}
      >
        {" "}
        Upload Cover Image
      </button>
      <button
        type="button"
        className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
        onClick={createNewPost}
      >
        {" "}
        Create Post
      </button>
    </div>
  );
};

export default page;
