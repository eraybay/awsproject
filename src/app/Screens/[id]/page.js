"use client";
import React from "react";
import { API, Auth, Storage } from "aws-amplify";
import { useRouter } from "next/navigation";
import { listRestaurants, getRestaurant } from "@/graphql/queries";
import { useEffect, useState } from "react";
import { createComment, createRate } from "@/graphql/mutations";
import dynamic from "next/dynamic";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Rating } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Image from "next/image";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

const { nanoid } = require("nanoid");

const RestaurantPage = ({ params }) => {
  const router = useRouter();
  const [restaurant, setrestaurant] = useState(null);
  const [generalImages, setgeneralImages] = useState(null);
  const [comment, setComment] = useState({ message: "" });
  const [showMe, setShowMe] = useState(false);
  const [rating, setRating] = useState(0);
  const [averageRate, setaverageRate] = useState(0);

  const { message } = comment;

  function toogle() {
    setShowMe(!showMe);
  }
  const { id } = params;
  Auth.currentAuthenticatedUser()
    .then((user) => console.log(user))
    .catch((err) => console.log(err));
  useEffect(() => {
    const getData = async () => {
      const restaurant = await fetchById();
      console.log(restaurant);

      // await generalImagesFetch(restaurant);
    };
    getData();
  }, []);

  // const generalImagesFetch = async (restaurant) => {
  //   if (restaurant.generalImages) {
  //     const imagekey = await Storage.get(restaurant.generalImages);
  //     setgeneralImages(imagekey);
  //   } else {
  //     console.log("Error has occured");
  //   }
  // };
  const fetchById = async () => {
    try {
      console.log(id);
      const response = await API.graphql({
        query: getRestaurant,
        variables: { id },
      });
      const restaurantData = response.data.getRestaurant;

      let imageUrls = [];
      if (restaurantData.generalImages) {
        imageUrls = await Promise.all(
          restaurantData.generalImages.map((image) => Storage.get(image))
        );
      }

      let avgRating = 0;
      if (restaurantData.rates && restaurantData.rates.items.length > 0) {
        const total = restaurantData.rates.items.reduce(
          (acc, rate) => acc + rate.rate_value,
          0
        );
        avgRating = (total / restaurantData.rates.items.length).toFixed(2) / 10;
      }

      const restaurantWithImagesAndRatings = {
        ...restaurantData,
        imageUrls,
        avgRating,
      };

      setrestaurant(restaurantWithImagesAndRatings);
      return restaurantWithImagesAndRatings;
    } catch (error) {
      console.error("Error fetching restaurants:    ", error);
    }
  };

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));

    console.log(rating);
  };
  async function createTheCommentAndRating() {
    // Create the comment
    if (!message) {
      return new Error();
    }
    const commentId = nanoid();
    comment.id = commentId;
    try {
      await API.graphql({
        query: createComment,
        variables: { input: comment },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
    } catch (error) {
      console.log(error);
    }

    // Create the rating
    const rate = {
      id: nanoid(),
      rate_value: rating,
      restaurantID: restaurant.id,
    };
    try {
      await API.graphql({
        query: createRate,
        variables: { input: rate },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
    } catch (error) {
      console.log(error);
    }

    router.push("/");
  }
  const averageRating = (restaurant) => {
    if (restaurant.rates.items.length === 0) {
      return 0;
    }
    const sum = restaurant.rates.items.reduce(
      (total, rate) => total + rate.rate_value,
      0
    );
    return sum / restaurant.rates.items.length / 20;
  };

  if (!restaurant) {
    return <div></div>;
  }
  // Merge and sort comments and rates
  let items = [];

  if (restaurant.comments.items.length > 0) {
    items = items.concat(
      restaurant.comments.items.map((item) => ({ ...item, type: "comment" }))
    );
  }

  if (restaurant.rates.items.length > 0) {
    items = items.concat(
      restaurant.rates.items.map((item) => ({ ...item, type: "rate" }))
    );
  }

  // Sort items by createdAt
  items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="mx-24">
      <h1 className="text-5xl mt-4 font-semibold underline text-black">
        {restaurant.title}
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {restaurant && restaurant.imageUrls && (
          <div className="col-span-1">
            <Image
              src={restaurant.imageUrls[0]}
              alt="Restaurant"
              width={200}
              height={200}
            />
          </div>
        )}

        <div className="col-span-1 grid grid-cols-2 gap-4">
          {restaurant &&
            restaurant.imageUrls &&
            restaurant.imageUrls.slice(1).map((url, index) => (
              <div key={index}>
                <Image src={url} alt="Restaurant" width={200} height={200} />
              </div>
            ))}
        </div>
      </div>
      <div className="grid grid-cols-3 w-full h-96 gap-6 mt-8">
        <div className="border-2 border-black p-12 ">
          <div id="rating preview">
            <div class="flex items-center mb-2">
              <svg
                class="w-4 h-4 text-yellow-300 mr-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                class="w-4 h-4 text-yellow-300 mr-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                class="w-4 h-4 text-yellow-300 mr-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                class="w-4 h-4 text-yellow-300 mr-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                class="w-4 h-4 text-gray-300 mr-1 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <p class="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                {restaurant.avgRating}
              </p>
            </div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
              1,745 global ratings
            </p>
            <div class="flex items-center mt-4">
              <a
                href="#"
                class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                5 star
              </a>
              <div class="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div class="h-5 bg-yellow-300 rounded w-3/4"></div>
              </div>
              <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                70%
              </span>
            </div>
            <div class="flex items-center mt-4">
              <a
                href="#"
                class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                4 star
              </a>
              <div class="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div class="h-5 bg-yellow-300 rounded w-1/4"></div>
              </div>
              <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                17%
              </span>
            </div>
            <div class="flex items-center mt-4">
              <a
                href="#"
                class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                3 star
              </a>
              <div class="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div class="h-5 bg-yellow-300 rounded w-3/12"></div>
              </div>
              <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                8%
              </span>
            </div>
            <div class="flex items-center mt-4">
              <a
                href="#"
                class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                2 star
              </a>
              <div class="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div class="h-5 bg-yellow-300 rounded w-2/6"></div>
              </div>
              <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                4%
              </span>
            </div>
            <div class="flex items-center mt-4">
              <a
                href="#"
                class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                1 star
              </a>
              <div class="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div class="h-5 bg-yellow-300 rounded w-1/12"></div>
              </div>
              <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                1%
              </span>
            </div>
          </div>
          <hr className="mt-3" />
        </div>
        <div className="border-4 border-secondary ">
          <LoadScript googleMapsApiKey="">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={{ lat: restaurant.lat, lng: restaurant.lng }}
              zoom={15}
            >
              <MarkerF
                position={{ lat: restaurant.lat, lng: restaurant.lng }}
              />
            </GoogleMap>
          </LoadScript>
        </div>
        <div className="border-4 border-secondary "></div>
      </div>
      <p className="text-sm font-light my-4"> By: {restaurant.username}</p>
      <p className=" text-xl"> By: {restaurant.content}</p>
      <Rating value={averageRate} />

      <div>
        <button
          type="button"
          className="mb-4 bg-green-600 text-white font-semibold px-8 py-2 rounded-lg"
          onClick={toogle}
        >
          Write a comment
        </button>

        {items.map((item, index) => (
          <div
            className="py-8 px-8 max-w-xl mx-auto bg-white shadow-lg space-y-2 sm:py-1 
            sm:flex my-6  sm:items-center sm:space-y-0 sm:space-x-6 mb-2"
            key={index}
          >
            {item.type === "comment" && (
              <>
                <p className="text-gray-500 mt-2">{item.message}</p>
                <p className="text-black mt-2">{item.postedBy}</p>
              </>
            )}
            {item.type === "rate" && (
              <>
                <p className="text-gray-500 mt-2">{item.rate_value}</p>
                <p className="text-black mt-2">{item.createdAt}</p>
              </>
            )}
          </div>
        ))}

        {
          <div style={{ display: showMe ? "block" : "none" }}>
            <SimpleMDE
              value={comment.message}
              onChange={(value) =>
                setComment({
                  ...comment,
                  message: value,
                  restaurantID: restaurant.id,
                })
              }
            />
            <div>
              <div className="rating">
                <input
                  type="radio"
                  name="rating"
                  value={20}
                  onChange={handleRatingChange}
                  className="mask mask-star-2 bg-green-500"
                />
                <input
                  type="radio"
                  name="rating"
                  value={40}
                  onChange={handleRatingChange}
                  className="mask mask-star-2 bg-green-500"
                />
                <input
                  type="radio"
                  name="rating"
                  value={60}
                  onChange={handleRatingChange}
                  className="mask mask-star-2 bg-green-500"
                />
                <input
                  type="radio"
                  name="rating"
                  value={80}
                  onChange={handleRatingChange}
                  className="mask mask-star-2 bg-green-500"
                />
                <input
                  type="radio"
                  name="rating"
                  value={100}
                  onChange={handleRatingChange}
                  className="mask mask-star-2 bg-green-500"
                />
              </div>
              <button
                type="button"
                className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
                onClick={createTheCommentAndRating}
              >
                Publish Comment and Rating
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default RestaurantPage;
