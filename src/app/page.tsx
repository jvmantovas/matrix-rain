"use client";
import React from "react";
import MatrixRain from "../components/RainCanvas/Rain";
import { RainContainer } from "../components/RainCanvas/RainStyles";

export default function Home() {
  return (
    <RainContainer>
      <MatrixRain />
    </RainContainer>
  );
}
