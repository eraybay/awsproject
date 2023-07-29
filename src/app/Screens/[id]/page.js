"use client";
import React from "react";
import { API, Storage } from "aws-amplify";
import { useRouter } from "next/navigation";
import { listPosts, getPost } from "@/graphql/queries";
import { useEffect, useState } from "react";
import { createComment } from "@/graphql/mutations";
import dynamic from "next/dynamic";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
const { nanoid } = require("nanoid");

const PostPage = ({ params }) => {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [coverImage, setcoverImage] = useState(null);
  const [comment, setComment] = useState({ message: "" });
  const [showMe, setShowMe] = useState(false);
  const { message } = comment;

  function toogle() {
    setShowMe(!showMe);
  }
  const { id } = params;

  useEffect(() => {
    const getData = async () => {
      const post = await fetchById();
      await CoverImageFetch(post);
    };
    getData();
  }, []);
  const CoverImageFetch = async (post) => {
    if (post.coverImage) {
      const imagekey = await Storage.get(post.coverImage);
      setcoverImage(imagekey);
    } else {
      console.log("Error has occured");
    }
  };

  const fetchById = async () => {
    try {
      console.log(id);
      const postData = await API.graphql({
        query: getPost,
        variables: { id },
      });
      setPost(postData.data.getPost);
      return postData.data.getPost;
    } catch (error) {
      console.error("Error fetching posts:    ", error);
    }
  };

  async function createTheComment() {
    if (!message) {
      return new Error();
    }
    const id = nanoid();
    comment.id = id;
    try {
      await API.graphql({
        query: createComment,
        variables: { input: comment },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
    } catch (error) {
      throw new Error();
    }
    router.push("/");
  }

  if (!post) {
    return <div></div>;
  }
  return (
    <div>
      <h1 className="text-5xl mt-4 font-semibold underline text-black">
        {post.title}
      </h1>
      {coverImage && (
        <img src={coverImage} className="mt-4 object-cover w-64 h-64" />
      )}
      <p className="text-sm font-light my-4"> By: {post.username}</p>
      <p className=" text-xl"> By: {post.content}</p>
      <div>
        <button
          type="button"
          className="mb-4 bg-green-600 text-white font-semibold px-8 py-2 rounded-lg"
          onClick={toogle}
        >
          Write a comment
        </button>
        {
          <div style={{ display: showMe ? "block" : "none" }}>
            <SimpleMDE
              value={comment.message}
              onChange={(value) =>
                setComment({ ...comment, message: value, postID: post.id })
              }
            />
            <button
              type="button"
              className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
              onClick={createTheComment}
            >
              Publish Comment
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default PostPage;
