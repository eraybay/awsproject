"use client";
import { deletePost } from "@/graphql/mutations";
import { postsByUsername } from "@/graphql/queries";
import { API, Auth } from "aws-amplify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import React from "react";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]); // This useEffect will run every time 'posts' state updates

  const fetchPosts = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const username = `${user.attributes.sub}::${user.username}`;
      const postData = await API.graphql({
        query: postsByUsername,
        variables: { username },
      });
      setPosts(postData.data.postsByUsername.items);
    } catch (error) {
      console.log("Error occured: " + error);
    }
  };
  const deleteP = async (id) => {
    try {
      await API.graphql({
        query: deletePost,
        variables: { input: { id } },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      fetchPosts();
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-blue-950 underline mt-6 mb-2">
        My Posts
      </h1>
      {posts.map((post, index) => (
        <div>
          <Link key={index} href={"/Screens/" + post.id}>
            <div className="cursor-pointer border-b border-gray-500 mt-8 pb-4">
              <h2 className="text-xl font-semibold"> {post.title}</h2>
              <p className="text-gray-500 mt-2"> Author: {post.username}</p>
            </div>
          </Link>
          <button
            className="text-sm mr-4 text-red-400 hover:text-green-300 transition duration-300"
            onClick={() => deleteP(post.id)}
          >
            Delete Post
          </button>
          <Link
            className="text-sm mr-4 text-blue-400 hover:text-green-300 transition duration-300"
            href={"/Screens/edit-post/" + post.id}
          >
            Edit Post
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
