import React, { useRef, useEffect, useState } from "react";

export default function RPG() {
    const canvasRef = useRef(null);
    const radius = 20;
    const speed = 5;
    const [keysPressed, setKeysPressed] = useState({});

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const drawCircle = (x, y) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = "#f00";
            ctx.fill();
        };

        const handleKeyDown = (e) => {
            setKeysPressed((prevState) => ({
                ...prevState,
                [e.key]: true,
            }));
        };

        const handleKeyUp = (e) => {
            setKeysPressed((prevState) => ({
                ...prevState,
                [e.key]: false,
            }));
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        const animate = () => {
            let dx = 0;
            let dy = 0;
            if (keysPressed["a"]) {
                dx -= speed;
            }
            if (keysPressed["d"]) {
                dx += speed;
            }
            if (keysPressed["w"]) {
                dy -= speed;
            }
            if (keysPressed["s"]) {
                dy += speed;
            }
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 0) {
                const newX = x + (dx / distance) * speed;
                const newY = y + (dy / distance) * speed;
                drawCircle(newX, newY);
                x = newX;
                y = newY;
            } else {
                drawCircle(x, y);
            }
            requestAnimationFrame(animate);
        };
        animate();

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [keysPressed]);

    let x = 50;
    let y = 50;

    return <canvas ref={canvasRef} width={500} height={500} />;
};