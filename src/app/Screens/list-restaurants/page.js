"use client";

import { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import Link from "next/link";
import { listRestaurants } from "@/graphql/queries";
import config from "../../../../configureAmplify";
import Navbar from "@/app/Components/Navbar";
import "flowbite";
import { Rating } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

import { Amplify } from "aws-amplify";
import Image from "next/image";
Amplify.configure(config);

export default function Home() {
  const [restaurants, setrestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const restaurantData = await API.graphql({
        query: listRestaurants,
      });

      const restaurantsWithImagesAndRatings = await Promise.all(
        restaurantData.data.listRestaurants.items.map(async (restaurant) => {
          // Try to get the image URLs for each generalImage
          let imageUrls = [];
          if (restaurant.generalImages) {
            imageUrls = await Promise.all(
              restaurant.generalImages.map((image) => Storage.get(image))
            );
          }

          // Calculate the average rating
          let avgRating = 0;
          if (restaurant.rates && restaurant.rates.items.length > 0) {
            const total = restaurant.rates.items.reduce(
              (acc, rate) => acc + rate.rate_value,
              0
            );
            avgRating = (total / restaurant.rates.items.length).toFixed(2) / 10;
          }

          // Return a new version of the restaurant that includes the imageURLs and averageRating
          return { ...restaurant, imageUrls, avgRating };
        })
      );

      setrestaurants(restaurantsWithImagesAndRatings);
      console.log(restaurants);
    } catch (error) {
      console.error("Error fetching restaurants", error);
    }
  };

  return (
    <div className="mx-24">
      <h1 className="text-7xl font-bold text-third">Bütün Restoranlar</h1>

      <div class="flex flex-col">
        <div class="bg-white p-6 rounded-xl shadow-lg">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div class="flex flex-col">
              <label for="name" class="font-medium text-sm text-stone-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="john doe"
                class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
              />
            </div>

            <div class="flex flex-col">
              <label for="email" class="font-medium text-sm text-stone-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="johndoe@example.com"
                class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
              />
            </div>

            <div class="flex flex-col">
              <label for="date" class="font-medium text-sm text-stone-600">
                Published Date
              </label>
              <input
                type="date"
                id="date"
                class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
              />
            </div>

            <div class="flex flex-col">
              <label for="status" class="font-medium text-sm text-stone-600">
                Status
              </label>

              <select
                id="status"
                class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
              >
                <option>Active</option>
                <option>Pending</option>
                <option>Deleted</option>
              </select>
            </div>
          </div>

          <div class="grid md:flex grid-cols-2 justify-end space-x-4 w-full mt-6">
            <button class="px-4 py-2 rounded-lg  bg-stone-400 hover:bg-stone-500 font-bold text-white shadow-lg shadow-stone-200 transition ease-in-out duration-200 translate-10">
              Reset
            </button>

            <button class="px-4 py-2 rounded-lg text-orange-50 bg-orange-400 hover:bg-orange-500 font-bold text-white shadow-lg shadow-orange-200 transition ease-in-out duration-200 translate-10">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-y-8  bg-primary">
        {restaurants.map((restaurant) => (
          <div className="w-full h-96 bg-white mx-6 rounded-lg border-4 border-black">
            <div className="grid grid-cols-12 gap-4 h-full w-full">
              <div className=" w-full h-full col-span-3">
                <Image
                  src={restaurant.imageUrls[0]}
                  alt="... "
                  width={500}
                  height={500}
                  className="w-full h-full"
                ></Image>
              </div>
              <div className="bg-white w-full h-full col-span-6">
                <div className="grid grid-cols-8">
                  <div className="col-span-6">
                    <div className="flex flex-col">
                      <Link href={"/Screens/" + restaurant.id}>
                        <p className="text-xl font-primary font-bold my-4">
                          {restaurant.title}
                        </p>
                      </Link>

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
                      <div className="flex justify-between">
                        <div className="flex flex-col">
                          <div id="comment.name">
                            <p>Kristing waston</p>
                            <p>NATIONAL</p>
                          </div>
                        </div>
                        <p className="text-xl font-medium"></p>
                        <Rating id="" value={restaurant.avgRating} />
                      </div>
                      <div id="comment.content">Harikaydı yaa</div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="flex flex-col justify-between items-center h-full">
                      <div className="">
                        <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
                          $$$$$
                        </span>
                      </div>

                      <div>
                        <Link href={"/"}>
                          <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                            Menü
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-black w-full h-full col-span-3">
                <LoadScript googleMapsApiKey="AIzaSyBzIema2xrlgMpXoEdBv2uZ2TJ8R2gRlYs">
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
            </div>
          </div>
        ))}

        <div className="w-full h-72 bg-white mx-6 rounded-lg border-4 border-black"></div>
        <div className="w-full h-72 bg-white mx-6 rounded-lg border-4 border-black"></div>
      </div>
    </div>
  );
}
