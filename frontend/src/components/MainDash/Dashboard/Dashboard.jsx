import React from "react";
import "./Dashboard.css";
import {
  UilCommentAlt,
  UilMusic,
  UilImages,
  UilVideo,
  UilArrow,
} from "@iconscout/react-unicons";
import {
  UisHouseUser,
  UisMinusSquareFull,
} from "@iconscout/react-unicons-solid";

const Dashboard = ({ setSelected }) => {
  const dashboardData = [
    {
      icon: UilCommentAlt,
      text: "Conversation",
      colorIcon: "rgb(22 43 23 )",
      color: "rgb(90 165 157 / 62%)",
      nav: 1,
    },
    {
      icon: UilMusic,
      text: "Background Remover",
      colorIcon: "rgb(9 35 9 )",
      color: "rgb(255 255 255 / 36%)",
      nav: 2,
    },
    {
      icon: UilImages,
      text: "Image Generation",
      colorIcon: "rgb(39 1 11)",
      color: "rgb(63 75 75 / 83%)",
      nav: 3,
    },
    {
      icon: UilArrow,
      text: "Code gen",
      colorIcon: "rgb(5 97 13)",
      color: "rgb(215 252 218 / 50%)",
      nav: 4,
    },
    {
      icon: UisHouseUser,
      text: "Dashboard",
      colorIcon: "rgb(107 105 109)",
      color: "rgb(52 63 84 / 53%)",
      nav: 5,
    },
  ];
  return (
    <>
      <h1 style={{ textAlign: "center", margin: "0" }}>
        Welcome to the Next<span className="aiColor">Ai</span>
      </h1>
      <span
        style={{
          display: "block",
          margin: "auto",
          textAlign: "center",
          fontSize: "13px",
        }}
      >
        Explore the power of Ai. Chat with smartest Ai - Experience the power of
        Ai
      </span>
      <div className="plainCards">
        {dashboardData.map((item) => {
          return (
            <div
              onClick={() =>
                item.text === "Dashboard" ? null : setSelected(item.nav)
              }
              className="cardBody"
              style={{ background: item.color }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <p style={{ color: item.colorIcon }}>
                  <item.icon />
                </p>
                <p style={{ fontSize: "13px", fontWeight: "bold" }}>
                  {item.text}
                </p>
              </div>
              <span>-{">"}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;
