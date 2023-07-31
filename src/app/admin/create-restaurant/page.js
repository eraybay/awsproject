"use client";

import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useRef, useMemo, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { useRouter } from "next/navigation";
const { nanoid } = require("nanoid");
import { createRestaurant } from "@/graphql/mutations";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import Select from "react-select";
import config from "../../../../configureAmplify";
import { Amplify } from "aws-amplify";
Amplify.configure(config);

const page = () => {
  const [restaurant, setrestaurant] = useState({ title: "", content: "" });
  const { title, content } = restaurant;
  const router = useRouter();
  const imageFileInput = useRef(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "",
    libraries: ["places"],
  });
  const [selectedCoords, setSelectedCoords] = useState(null);

  const [image, setImage] = useState("");
  function onChange(e) {
    setrestaurant(() => ({
      ...restaurant,
      [e.target.name]: e.target.value,
    }));
  }
  async function createNewrestaurant() {
    if (!title || !content) {
      throw new Error("Fill Out the forms");
      return;
    }
    const id = nanoid();

    let filenames = [];
    if (image && Array.isArray(image)) {
      const uploadPromises = image.map(async (img) => {
        const filename = `${img.name}_${nanoid()}`;
        filenames.push(filename);
        await Storage.put(filename, img);
      });
      await Promise.all(uploadPromises);
      restaurant.generalImages = filenames;
    }

    const newrestaurant = {
      ...restaurant,
      id: id,
      lat: selectedCoords ? selectedCoords.lat : null,
      lng: selectedCoords ? selectedCoords.lng : null,
    };
    await API.graphql({
      query: createRestaurant,
      variables: { input: newrestaurant },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    router.push("/Screens/" + id);
  }

  const uploadImage = async () => {
    imageFileInput.current.click();
  };
  function handleChange(e) {
    const filesUploaded = Array.from(e.target.files); // Convert FileList to array
    if (!filesUploaded) return;
    setImage(filesUploaded); // Set state with array of File objects
  }

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="">
      <h1 className="text-5xl text-center block py-32">
        Create new restaurant
      </h1>
      <input
        onChange={onChange}
        name="title"
        placeholder="Title"
        value={restaurant.title}
        className="border-b pb-2 text-lg h-12 w-3/4 mb-6 bg-slate-300 text-white placeholder:-gray-500 "
      ></input>
      <SimpleMDE
        value={restaurant.content}
        onChange={(value) => setrestaurant({ ...restaurant, content: value })}
      />
      <input
        type="file"
        ref={imageFileInput}
        className="absolute w-0 h-0 "
        onChange={handleChange}
        multiple // Allow multiple files to be selected
      ></input>
      {image &&
        image.map((img, index) => (
          <img key={index} src={URL.createObjectURL(img)} className="my-4" />
        ))}
      <button
        type="button"
        className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
        onClick={uploadImage}
      >
        {" "}
        Upload Cover Image
      </button>
      <Map setSelectedCoords={setSelectedCoords} />{" "}
      <button
        type="button"
        className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
        onClick={createNewrestaurant}
      >
        {" "}
        Create restaurant
      </button>
    </div>
  );
};
function Map({ setSelectedCoords }) {
  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <div className="">
        <PlacesAutocomplete
          setSelected={setSelected}
          setSelectedCoords={setSelectedCoords}
        />{" "}
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

const PlacesAutocomplete = ({ setSelected, setSelectedCoords }) => {
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
    setSelectedCoords({ lat, lng });
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

export default page;
