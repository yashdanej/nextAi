import React, { useState } from "react";
import {
  UilCommentAlt,
  UilMusic,
  UilImages,
  UilVideo,
  UilArrow,
} from "@iconscout/react-unicons";
import { trefoil } from "ldrs";
import BasicModalDialog from "./BasicModalDialog";
import axios from "axios";
trefoil.register();

const BackgroundRemover = () => {
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(false);
  const Remover = async () => {
    try {
      setLoader(true);
      await axios
        .post("http://localhost:8000/remover")
        .then(function (response) {
          console.log("data", response.data);
          setImage(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };
  return (
    <>
      <div className="MyConvoAi">
        <section className="mysection">
          <p>
            <span style={{ color: "grey", fontSize: "14px" }}>
              Start with a detailed description &nbsp;
            </span>
          </p>
          <div
            className="cardBody"
            style={{ background: "rgba(255, 255, 255, 0.36)" }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <p style={{ color: "rgb(60 165 64)" }}>
                <UilMusic />{" "}
              </p>
              <span onClick={() => setOpen(true)}>Select image</span>
            </div>
          </div>
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
        {open && (
          <BasicModalDialog Remover={Remover} open={open} setOpen={setOpen} />
        )}
        {!loader && image && <img width={500} src={image} alt="" />}
      </div>
    </>
  );
};

export default BackgroundRemover;
