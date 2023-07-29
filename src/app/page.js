"use client";
import Image from "next/image";
import "./globals.css";
import { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import Link from "next/link";
import { listPosts } from "@/graphql/queries";
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

      // Create a new version of the posts array with the image URLs
      const postsWithImages = await Promise.all(
        postData.data.listPosts.items.map(async (post) => {
          // Try to get the image URL for this post's coverImage
          let imageURL = null;
          if (post.coverImage) {
            imageURL = await Storage.get(post.coverImage);
          }

          // Return a new version of the post that includes the imageURL
          return { ...post, imageURL };
        })
      );

      setPosts(postsWithImages);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-7xl font-bold underline cursor-pointer">Helloooo</h1>
      {posts.map((post) => (
        <Link key={post.id} href={"/Screens/" + post.id}>
          <div className="border-b mt-8 pb-4 mx-24 border-gray-400">
            <div className="flex ">
              {post.imageURL && (
                <img src={post.imageURL} className="w-24 h-24 object-cover" />
              )}
              <div className="mx-16 ">
                <p className="inline-block mb-4">{post.title} </p>
                <p className=" text-red-500">Author: {post.username}</p>
                {post.comments.items.length > 0 &&
                  post.comments.items.map((comment, index) => (
                    <div
                      key={index}
                      className="py-8 px-8 max-w-xl mx-auto bg-white shadow-lg space-y-2 sm:py-1 
                    sm:flex my-6  sm:items-center sm:space-y-0 sm:space-x-6 mb-2"
                    >
                      <div>
                        <p className="text-gray-500 mt-2">{comment.message}</p>
                        <p className="text-gray-200 mt-2">
                          {comment.createdBy}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
