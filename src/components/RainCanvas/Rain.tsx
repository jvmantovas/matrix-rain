import React, { useEffect, useRef } from "react";

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    if (!canvas) return;

    const ctx: any = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Symbol {
      characters: string;
      x: number;
      y: number;
      fontSize: number;
      text: string;
      canvasHeight: number;
      constructor(
        x: number,
        y: number,
        fontSize: number,
        canvasHeight: number
      ) {
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
        context.fillText(
          this.text,
          this.x * this.fontSize,
          this.y * this.fontSize
        );
        if (
          this.y * this.fontSize > this.canvasHeight &&
          Math.random() > 0.98
        ) {
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
        this.initialize();
      }
      initialize() {
        for (let i = 0; i < this.columns; i++) {
          this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
      }
    }

    const effect = new Effect(canvas.width, canvas.height);
    let lastTime = 0;
    const fps = 60;
    const nexFrame = 1000 / fps;
    let timer = 0;

    function animate(timeStamp: number) {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;
      if (timer > nexFrame) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.textAlign = "center";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0aff0a";
        ctx.font = effect.fontSize + "px monospace";
        effect.symbols.forEach((symbol) => symbol.draw(ctx));
        timer = 0;
      } else {
        timer += deltaTime;
      }
      requestAnimationFrame(animate);
    }

    animate(0);
  }, []);
  return <canvas ref={canvasRef} />;
};

export default MatrixRain;
