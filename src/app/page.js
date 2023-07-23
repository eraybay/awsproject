"use client"; // This line seems unusual and has been commented out.
import Image from "next/image";
import "./globals.css"; // Use a static import for CSS
import { useState, useEffect } from "react";
import { API } from "aws-amplify";
import Link from "next/link";

import { listPosts } from "@/graphql/queries";
import { createPost } from "@/graphql/mutations";
import config from "../../configureAmplify";
import Navbar from "@/app/Components/Navbar";

import { Amplify } from "aws-amplify";
Amplify.configure(config);

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const postData = await API.graphql({
        query: listPosts,
      });
      setPosts(postData.data.listPosts.items);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-7xl font-bold underline cursor-pointer">Helloooo</h1>
      {posts.map((post, index) => (
        <Link key={index} href={"/Screens/" + post.id}>
          <div className="border-b mt-8 pb-4 mx-24 border-gray-400">
            <p key={index}>{post.title}</p>
            <p className=" text-blue" key={index}>
              Author: {post.username}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
