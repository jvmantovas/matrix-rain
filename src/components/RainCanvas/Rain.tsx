import React, { useEffect, useRef } from "react";

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  type SymbolProps = {
    characters: string;
    x: number;
    y: number;
    fontSize: number;
    text: string;
    canvasHeight: number;
  };

  class Symbol {
    characters: string;
    x: number;
    y: number;
    fontSize: number;
    text: string;
    canvasHeight: number;
    constructor(x: number, y: number, fontSize: number, canvasHeight: number) {
      this.characters =
        "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      this.x = x;
      this.y = y;
      this.fontSize = fontSize;
      this.text = "";
      this.canvasHeight = canvasHeight;
    }
    draw(context: CanvasRenderingContext2D) {
      this.text = this.characters.charAt(
        Math.floor(Math.random() * this.characters.length)
      );
      context.fillStyle = "#0F0";
      context.fillText(
        this.text,
        this.x * this.fontSize,
        this.y * this.fontSize
      );
      if (this.y * this.fontSize > this.canvasHeight) {
        this.y = 0;
      } else {
        this.y++;
      }
    }
  }

  class Effect {
    canvasWidth: number;
    canvasHeight: number;
    fontSize: number;
    columns: number;
    symbols: Symbol[];
    constructor(canvasWidth: number, canvasHeight: number) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.fontSize = 25;
      this.columns = this.canvasWidth / this.fontSize;
      this.symbols = [];
      this.#initialize();
    }
    #initialize() {
      for (let i = 0; i < this.columns; i++) {
        this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
      }
    }
  }
  return <canvas ref={canvasRef} />;
};

export default MatrixRain;
