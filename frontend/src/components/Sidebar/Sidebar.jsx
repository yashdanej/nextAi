import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../../imgs/logo.png";
import { SidebarData } from "../../Data/Data";
import { UilSignOutAlt, UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
const Sidebar = ({ selected, setSelected }) => {
  const [expanded, setExpanded] = useState(true);
  const sideBarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };
  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpanded(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="Sidebar"
        variants={sideBarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* Logo */}
        <div className="logo">
          <span>
            Next<span>Ai</span>
          </span>
        </div>

        {/* menu */}
        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => setSelected(index)}
                className={selected === index ? "menuItem active" : "menuItem"}
              >
                <div>
                  <item.icon />
                </div>
                <span>{item.heading}</span>
              </div>
            );
          })}

          <div className="menuItem">
            <UilSignOutAlt />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
