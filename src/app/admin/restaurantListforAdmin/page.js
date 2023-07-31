"use client";
import { deleteRestaurant } from "@/graphql/mutations";
import { restaurantsByUsername } from "@/graphql/queries";
import { API, Auth, Storage } from "aws-amplify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import React from "react";

const Myrestaurants = () => {
  const [restaurants, setrestaurants] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchrestaurants();
  }, []);

  useEffect(() => {
    console.log(restaurants);
  }, [restaurants]); // This useEffect will run every time 'restaurants' state updates

  const fetchrestaurants = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const username = `${user.attributes.sub}::${user.username}`;
      const restaurantData = await API.graphql({
        query: restaurantsByUsername,
        variables: { username },
      });
      const restaurantWithImages = await Promise.all(
        restaurantData.data.restaurantsByUsername.items.map(
          async (restaurant) => {
            try {
              let imageUrl = null;
              if (restaurant.coverImage) {
                imageUrl = await Storage.get(restaurant.coverImage);
              }
              return { ...restaurant, imageUrl };
            } catch (error) {
              throw new Error();
            }
          }
        )
      );
      setrestaurants(restaurantWithImages);
    } catch (error) {
      console.log("Error occured: " + error);
    }
  };
  const deleteP = async (id) => {
    try {
      await API.graphql({
        query: deleteRestaurant,
        variables: { input: { id } },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      fetchrestaurants();
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-blue-950 underline mt-6 mb-2">
        My restaurants
      </h1>
      {restaurants.map((restaurant, index) => (
        <div>
          <Link key={index} href={"/Screens/" + restaurant.id}>
            <div className="cursor-pointer border-b border-gray-500 mt-8 pb-4 flex">
              {restaurant.imageUrl && (
                <img
                  src={restaurant.imageUrl}
                  className="w-24 h-24 object-cover"
                />
              )}
              <div className="mx-16">
                <h2 className="text-xl font-semibold mb-4">
                  {" "}
                  {restaurant.title}
                </h2>
                <p className="text-gray-500 mt-2">
                  {" "}
                  Author: {restaurant.username}
                </p>
              </div>
            </div>
          </Link>
          <button
            className="text-sm mr-4 text-red-400 hover:text-green-300 transition duration-300"
            onClick={() => deleteP(restaurant.id)}
          >
            Delete restaurant
          </button>
          <Link
            className="text-sm mr-4 text-blue-400 hover:text-green-300 transition duration-300"
            href={"/Screens/edit-restaurant/" + restaurant.id}
          >
            Edit restaurant
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Myrestaurants;
