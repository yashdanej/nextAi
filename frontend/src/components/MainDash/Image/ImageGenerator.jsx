import React, { useEffect, useRef, useState } from "react";
import "./ImageGenerator.css";
import {
  UilCommentAlt,
  UilMusic,
  UilImages,
  UilVideo,
  UilArrow,
} from "@iconscout/react-unicons";
import axios from "axios";
import Modal from "../../Modal";
import { trefoil } from "ldrs";
trefoil.register();

const ImageGenerator = () => {
  const [images, setImages] = useState(null);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const surprisceOptions = [
    "A blue ostrich eating melon",
    "A matisse style shark on the telephone",
    "A pineaplle sunbathing on an island",
  ];
  const surprice = () => {
    setImages(null);
    const randomValue =
      surprisceOptions[Math.floor(Math.random() * surprisceOptions.length)];
    setValue(randomValue);
  };
  const getImages = async () => {
    setImages(null);
    if (value === null) {
      setError("Error! Must have a search term");
      return;
    }
    try {
      setLoader(true);
      await axios
        .post("https://nextai-e8qc.onrender.com/images", {
          message: value,
        })
        .then(function (response) {
          setImages(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    setModalOpen(true);
    setSelectedImage(e.target.files[0]);
    e.target.value = null;
    try {
      const options = {
        method: "POST",
        body: formData,
      };
      const response = await fetch("https://nextai-e8qc.onrender.com/upload", options);
      const data = await response.json();
      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  };
  const generateVariations = async () => {
    console.log("eee2");
    setImages(null);
    if (selectedImage === null) {
      setError("Error | Must have an existing image");
      setModalOpen(false);
      return;
    }
    try {
      setLoader(true);
      const options = {
        method: "POST",
      };
      const response = await fetch("https://nextai-e8qc.onrender.com/variations", options);
      const data = await response.json();
      console.log("images", data);
      setImages(data);
      setError(null);
      setModalOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="imageDiv">
      <section className="mysection">
        <p>
          <span style={{ color: "grey", fontSize: "14px" }}>
            Start with a detailed description &nbsp;
            <span
              onClick={() => surprice()}
              style={{
                cursor: "pointer",
                fontSize: "14px",
                color: "white",
                fontWeight: "700",
              }}
            >
              Surprice me
            </span>
          </span>
        </p>
        <div
          className="cardBody"
          style={{ background: "rgba(63, 75, 75, 0.83)" }}
        >
          <div
            className="inpTxt"
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <p style={{ color: "rgb(141 4 41)" }}>
              <UilImages />{" "}
              <input
                value={value}
                className="imageGenerateTxt"
                type="text"
                onChange={(e) => setValue(e.target.value)}
              />
            </p>
          </div>
          <span
            className="generate"
            onClick={() => {
              getImages();
            }}
          >
            Generate
          </span>
        </div>
        <p className="extra-info">
          Or,
          <span>
            <label htmlFor="files">upload an image </label>
            <input
              onChange={uploadImage}
              id="files"
              type="file"
              accept="image/*"
              hidden
            />
          </span>
          to edit.
        </p>
        {error && <p>{error}</p>}
        {!loader && modalOpen && (
          <div className="overlay">
            <Modal
              generateVariations={generateVariations}
              selectedImage={selectedImage}
              setModalOpen={setModalOpen}
              setSelectedImage={setSelectedImage}
            />
          </div>
        )}
      </section>
      {loader && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <l-trefoil
            size="45"
            stroke="5"
            stroke-length="0.15"
            bg-opacity="0.1"
            speed="3"
            color="white"
          ></l-trefoil>
          <p style={{ fontWeight: "700" }}>
            Next<span style={{ color: "#FF919D" }}>Ai</span> is thinking
          </p>
        </div>
      )}
      {!modalOpen && !loader && images && (
        <section
          style={{ background: "rgb(141 4 41 / 19%)", borderRadius: "15px" }}
          className="image-section"
        >
          {images?.map((image, _index) => {
            return (
              <img
                key={_index}
                src={image.url}
                alt={`Generated image of ${value}`}
              />
            );
          })}
        </section>
      )}
    </div>
  );
};

export default ImageGenerator;
