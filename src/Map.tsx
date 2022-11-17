import React, { useContext, useState } from "react";

import { AppContext } from "./App";
import { mapsKey } from "./config";
import "./Map.css";
import { Gebouw } from "./schema";

export const Map = () => {
  const { setCurrent } = useContext(AppContext);

  return <div className="Map">Ik besta nog niet</div>;
};
