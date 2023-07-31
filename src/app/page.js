"use client";

import "./globals.css";
import { useState, useEffect, use, useMemo } from "react";
import { API, Storage } from "aws-amplify";
import Link from "next/link";
import { listRestaurants } from "@/graphql/queries";
import Image from "next/image";
import config from "../../configureAmplify";
import Navbar from "@/app/Components/Navbar";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import Select from "react-select";
import img1 from "./images/pic1.jpg";
import img2 from "./images/pic2.jpg";
import img3 from "./images/pic3.jpg";
import img4 from "./images/pic4.jpg";
import img5 from "./images/pic5.jpg";

import { Amplify } from "aws-amplify";
Amplify.configure(config);

export default function Home({ location }) {
  const [restaurants, setrestaurants] = useState([]);
  const [averageRate, setaverageRate] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "",
    libraries: ["places"],
  });

  useEffect(() => {
    const getData = async () => {
      const restaurant = await fetchRestaurants();
      console.log("Restaurants are: " + restaurants);

      // await generalImagesFetch(restaurant);
    };
    getData();
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
            avgRating = (total / restaurant.rates.items.length).toFixed(2);
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

  const nextSlide = () => {
    setCurrentSlide((oldCurrentSlide) => {
      let nextIndex = oldCurrentSlide + 1;
      if (nextIndex === restaurants.length) {
        nextIndex = 0; // loop back to the first image
      }
      return nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((oldCurrentSlide) => {
      let prevIndex = oldCurrentSlide - 1;
      if (prevIndex < 0) {
        prevIndex = restaurants.length - 1; // loop back to the last image
      }
      return prevIndex;
    });
  };
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="mx-24">
      <h1 className="text-7xl font-bold underline cursor-pointer">Helloooo</h1>

      <div
        id="default-carousel"
        class="relative w-1/2 mx-auto"
        data-carousel="slide"
      >
        <div class="relative overflow-hidden rounded-lg  transition-all duration-700 ease-in-out">
          {restaurants.map((restaurant, index) => (
            <div
              key={restaurant.id}
              class={index === currentSlide ? "block" : "hidden"}
              data-carousel-item
            >
              {restaurant.imageUrls && restaurant.imageUrls.length > 0 && (
                <Image
                  src={restaurant.imageUrls[0]}
                  alt={`${restaurant.title}`}
                  className=""
                  width={800}
                  height={800}
                />
              )}
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white py-1 px-3 rounded-r-lg focus:outline-none  text-secondary shadow-md shadow-secondary hover:shadow-lg hover:shadow-secondary transition duration-900 hover:border-2 border-secondary  rounded-md"
        >
          +
        </button>
        <button
          onClick={nextSlide}
          class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white py-1 px-3 rounded-l-lg focus:outline-none text-secondary shadow-md shadow-secondary hover:shadow-lg hover:shadow-secondary transition duration-900 hover:border-2 border-secondary  rounded-md"
        >
          -
        </button>
      </div>

      <h1 className="text-primary font-primary font-semibold text-3xl">
        {" "}
        Yakınınzdaki Restoranlar{" "}
      </h1>
      <div class="grid grid-cols-4 gap-4 mt-8">
        <div className=" text-third flex flex-col">
          <Image
            src={img1}
            width={200}
            height={200}
            alt="..."
            className="object-cover w-3/4 h-48 rounded-lg"
          />

          <div className="flex pl-10 pt-8 gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>

            <p className="text-center">Beyti Restoran</p>
          </div>
        </div>
        <div className=" text-third flex flex-col">
          <Image
            src={img2}
            width={200}
            height={200}
            alt="..."
            className="object-cover w-3/4 h-48 rounded-lg"
          />
          <div className="flex pl-10 pt-8 gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>

            <p className="text-center">Beyti Restoran</p>
          </div>
        </div>
        <div className=" text-third flex flex-col">
          <Image
            src={img3}
            width={200}
            height={200}
            alt="..."
            className="object-cover w-3/4 h-48 rounded-lg "
          />
          <div className="flex pl-10 pt-8 gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>

            <p className="text-center">Beyti Restoran</p>
          </div>
        </div>
        <div className=" text-third flex flex-col">
          <Image
            src={img4}
            width={200}
            height={200}
            alt="..."
            className="object-cover w-3/4 h-48 rounded-lg"
          />
          <div className="flex pl-10 pt-8 gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>

            <p className="text-center">Beyti Restoran</p>
          </div>
        </div>
        <div className=" text-third flex flex-col">
          <Image
            src={img5}
            width={200}
            height={200}
            alt="..."
            className="object-cover w-3/4 h-48 rounded-lg"
          />
          <div className="flex pl-10 pt-8 gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>

            <p className="text-center">Beyti Restoran</p>
          </div>
        </div>
      </div>
      <h1 className="text-primary font-primary font-semibold text-3xl mt-5">
        {" "}
        Öne Çıkanlar{" "}
      </h1>
      <div className="grid grid-cols-4 gap-4 mt-8">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              {restaurant.imageUrls && restaurant.imageUrls.length > 0 && (
                <Image
                  src={restaurant.imageUrls[0]}
                  alt={`${restaurant.title}`}
                  className="w-full h-80 object-cover"
                  width={800}
                  height={800}
                />
              )}
            </a>
            <div class="px-5 pb-5">
              <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {restaurant.title}
              </h5>

              <div class="flex items-center mt-2.5 mb-5">
                <svg
                  class="w-4 h-4 text-yellow-300 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                  {restaurant.avgRating}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-gray-900 dark:text-white">
                  $$$
                </span>
                <Link href={"/Screens/list-restaurants"}>
                  <button class="text-white bg-primary transition duration-500 hover:bg-forth focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                    View the Resaurant
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center my-16">
        <button className="bg-forth mx-auto shadow-md w-36 h-12 py-3 rounded-lg shadow-secondary text-white  transition duration-300 hover:shadow-xl hover:rounded-md hover:border-2 border-secondary">
          View More
        </button>
      </div>
      <div className="carousel w-full">
        <div id="item1" className="carousel-item w-full">
          <div class="grid grid-cols-6 gap-4 mt-8">
            <div className=" text-third flex flex-col">
              <Image
                src={img1}
                width={200}
                height={200}
                alt="..."
                className="object-cover w-full h-48 rounded-3xl"
              />

              <p className="text-center font-mono my-10">Burger</p>
            </div>
            <div className=" text-third flex flex-col">
              <Image
                src={img1}
                width={200}
                height={200}
                alt="..."
                className="object-cover w-full h-48 rounded-3xl"
              />

              <p className="text-center font-mono my-10">Burger</p>
            </div>
            <div className=" text-third flex flex-col">
              <Image
                src={img1}
                width={200}
                height={200}
                alt="..."
                className="object-cover w-full h-48 rounded-3xl"
              />

              <p className="text-center font-mono my-10">Burger</p>
            </div>
            <div className=" text-third flex flex-col">
              <Image
                src={img1}
                width={200}
                height={200}
                alt="..."
                className="object-cover w-full h-48 rounded-3xl"
              />

              <p className="text-center font-mono my-10">Burger</p>
            </div>
            <div className=" text-third flex flex-col">
              <Image
                src={img1}
                width={200}
                height={200}
                alt="..."
                className="object-cover w-full h-48 rounded-3xl"
              />

              <p className="text-center font-mono my-10">Burger</p>
            </div>
            <div className=" text-third flex flex-col">
              <Image
                src={img1}
                width={200}
                height={200}
                alt="..."
                className="object-cover w-full h-48 rounded-3xl"
              />

              <p className="text-center font-mono my-10">Burger</p>
            </div>
          </div>
        </div>
        <div id="item2" className="carousel-item w-full">
          <div class="grid grid-cols-6 gap-4 mt-8">
            <div className=" text-third flex flex-col">
              <Image
                src={img1}
                width={200}
                height={200}
                alt="..."
                className="object-cover w-full h-48 rounded-3xl"
              />

              <p className="text-center font-mono my-10">Burger</p>
            </div>
            <div className=" text-third flex flex-col">
              <Image
                src={img1}
                width={200}
                height={200}
                alt="..."
                className="object-cover w-full h-48 rounded-3xl"
              />

              <p className="text-center font-mono my-10">Burger</p>
            </div>
            <div className=" text-third flex flex-col">
              <Image
                src={img1}
                width={200}
                height={200}
                alt="..."
                className="object-cover w-full h-48 rounded-3xl"
              />

              <p className="text-center font-mono my-10">Burger</p>
            </div>
            <div className=" text-third flex flex-col">
              <Image
                src={img1}
                width={200}
                height={200}
                alt="..."
                className="object-cover w-full h-48 rounded-3xl"
              />

              <p className="text-center font-mono my-10">Burger</p>
            </div>
            <div className=" text-third flex flex-col">
              <Image
                src={img1}
                width={200}
                height={200}
                alt="..."
                className="object-cover w-full h-48 rounded-3xl"
              />

              <p className="text-center font-mono my-10">Burger</p>
            </div>
            <div className=" text-third flex flex-col">
              <Image
                src={img1}
                width={200}
                height={200}
                alt="..."
                className="object-cover w-full h-48 rounded-3xl"
              />

              <p className="text-center font-mono my-10">Burger</p>
            </div>
          </div>
        </div>
        <div id="item3" className="carousel-item w-full">
          <div class="grid grid-cols-6 gap-4 mt-8">
            <div className=" text-third flex flex-col">
              <Image
                src={img1}
                width={200}
                height={200}
                alt="..."
                className="object-cover w-full h-48 rounded-3xl"
              />

              <p className="text-center font-mono my-10">Burger</p>
            </div>
            <div className=" text-third flex flex-col">
              <Image
                src={img1}
                width={200}
                height={200}
                alt="..."
                className="object-cover w-full h-48 rounded-3xl"
              />

              <p className="text-center font-mono my-10">Burger</p>
            </div>
            <div className=" text-third flex flex-col">
              <Image
                src={img1}
                width={200}
                height={200}
                alt="..."
                className="object-cover w-full h-48 rounded-3xl"
              />

              <p className="text-center font-mono my-10">Burger</p>
            </div>
            <div className=" text-third flex flex-col">
              <Image
                src={img1}
                width={200}
                height={200}
                alt="..."
                className="object-cover w-full h-48 rounded-3xl"
              />

              <p className="text-center font-mono my-10">Burger</p>
            </div>
            <div className=" text-third flex flex-col">
              <Image
                src={img1}
                width={200}
                height={200}
                alt="..."
                className="object-cover w-full h-48 rounded-3xl"
              />

              <p className="text-center font-mono my-10">Burger</p>
            </div>
            <div className=" text-third flex flex-col">
              <Image
                src={img1}
                width={200}
                height={200}
                alt="..."
                className="object-cover w-full h-48 rounded-3xl"
              />

              <p className="text-center font-mono my-10">Burger</p>
            </div>
          </div>
        </div>
        <div id="item4" className="carousel-item w-full"></div>
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        <a href="#item1" className="btn btn-xs">
          1
        </a>
        <a href="#item2" className="btn btn-xs">
          2
        </a>
        <a href="#item3" className="btn btn-xs">
          3
        </a>
        <a href="#item4" className="btn btn-xs">
          4
        </a>
      </div>

      <Map />
    </div>
  );
}

function Map() {
  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const [selected, setSelected] = useState(null);
  return (
    <div>
      <div className="">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>
      <GoogleMap
        zoom={10}
        center={selected}
        mapContainerClassName="w-96 h-96 mx-auto"
      >
        {selected && <MarkerF position={selected} />}
      </GoogleMap>
    </div>
  );
}
const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (selectedOption) => {
    const address = selectedOption.value;
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  const options = data.map(({ place_id, description }) => ({
    value: description,
    label: description,
  }));

  const handleInputChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Select
        options={options}
        onInputChange={handleInputChange}
        isSearchable={true}
        isDisabled={!ready}
        onChange={handleSelect}
        placeholder="Search an address"
      />
    </div>
  );
};
