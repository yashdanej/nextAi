import React, { useState } from "react";
import {
  UilCommentAlt,
  UilMusic,
  UilImages,
  UilVideo,
  UilArrow,
} from "@iconscout/react-unicons";
import ReactMarkdown from "react-markdown";
import { trefoil } from "ldrs";
trefoil.register();

const Code = () => {
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [loader, setLoader] = useState(false);
  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const getCode = async () => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: value }],
        max_tokens: 100,
      }),
    };
    try {
      setLoader(true);
      const response = await fetch(
        `https://api.openai.com/v1/chat/completions`,
        options
      );
      const data = await response.json();
      console.log("message", data);
      setMessage(data?.choices[0].message.content);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };

  // Default values shown

  return (
    <div className="MyConvoAi">
      <section className="mysection">
        <p>
          <span style={{ color: "grey", fontSize: "14px" }}>
            Start with a detailed description &nbsp;
          </span>
        </p>
        <div
          className="cardBody"
          style={{ background: "rgba(215, 252, 218, 0.5)" }}
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
            <p style={{ color: "rgb(5 97 13)" }}>
              <UilArrow />{" "}
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
              getCode();
            }}
          >
            Generate
          </span>
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
      {!loader && message && (
        <section
          style={{
            background: "rgb(171 60 171 / 19%)",
            borderRadius: "15px",
            padding: "10px",
            marginTop: "10px",
          }}
          className="my-5"
        >
          <ReactMarkdown>{message}</ReactMarkdown>
        </section>
      )}
    </div>
  );
};

export default Code;
