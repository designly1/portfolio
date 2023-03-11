import React, { useEffect, useRef } from 'react'

export default function Stars(props) {
    const fieldRef = useRef();

    useEffect(() => {
        if (fieldRef) {
            const {
                drawInterval,
                streakOpacity,
                acceleration,
            } = {
                // Default config
                drawInterval: 40,
                streakOpacity: 0.6,
                acceleration: 1,
                ...props
            }

            const f = fieldRef.current.getContext("2d");
            let stars = {};
            let starIndex = 0;
            let numStars = 0;
            let starsToDraw = (fieldRef.current.width * fieldRef.current.height) / 200;

            function Star() {
                this.X = fieldRef.current.width / 2;
                this.Y = fieldRef.current.height / 2;

                this.SX = Math.random() * 10 - 5;
                this.SY = Math.random() * 10 - 5;

                let start = 0;

                if (fieldRef.current.width > fieldRef.current.height)
                    start = fieldRef.current.width;
                else
                    start = fieldRef.current.height;

                this.X += this.SX * start / 10;
                this.Y += this.SY * start / 10;

                this.W = 1;
                this.H = 1;

                this.age = 0;
                this.dies = 500;

                starIndex++;
                stars[starIndex] = this;

                this.ID = starIndex;
                this.C = "#ffffff";
            }

            Star.prototype.Draw = function () {
                this.X += this.SX;
                this.Y += this.SY

                this.SX += this.SX / (50 / acceleration);
                this.SY += this.SY / (50 / acceleration);

                this.age++;

                if (this.age == Math.floor(50 / acceleration) | this.age == Math.floor(150 / acceleration) | this.age == Math.floor(300 / acceleration)) {
                    this.W++;
                    this.H++;
                }

                if (this.X + this.W < 0 | this.X > fieldRef.current.width |
                    this.Y + this.H < 0 | this.Y > fieldRef.current.height) {
                    delete stars[this.ID];
                    numStars--;
                }

                f.fillStyle = this.C;
                f.fillRect(this.X, this.Y, this.W, this.H);
            }

            function draw() {
                if (fieldRef.current.width != window.innerWidth)
                    fieldRef.current.width = window.innerWidth;
                if (fieldRef.current.height != window.innerHeight)
                    fieldRef.current.height = window.innerHeight;

                f.fillStyle = `rgba(0, 0, 0, ${streakOpacity})`;
                f.fillRect(0, 0, fieldRef.current.width, fieldRef.current.height);

                for (var i = numStars; i < starsToDraw; i++) {
                    new Star();
                    numStars++;
                }

                for (var star in stars) {
                    stars[star].Draw();
                }
            }

            const id = setInterval(draw, drawInterval);

            return () => clearInterval(id);
        }
    }, [fieldRef, props])

    return (
        <canvas
            className="fixed top-0 right-0 bottom-0 left-0"
            style={{ zIndex: -2 }}
            ref={fieldRef}
        ></canvas>
    )
}
