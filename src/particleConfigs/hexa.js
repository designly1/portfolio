const hexa = {
    particles: {
        color: {
            value: "#00FFAA",
            animation: {
                enable: true,
                speed: 15
            }
        },
        move: {
            attract: {
                enable: false,
                distance: 100,
                rotate: {
                    x: 2000,
                    y: 2000
                }
            },
            direction: "none",
            enable: true,
            outModes: {
                default: "destroy"
            },
            path: {
                clamp: false,
                enable: true,
                delay: {
                    value: 0
                },
                generator: "polygonPathGenerator",
                options: {
                    sides: 6,
                    turnSteps: 30,
                    angle: 30
                }
            },
            random: false,
            speed: 6,
            straight: false,
            trail: {
                fillColor: "#000",
                length: 20,
                enable: true
            }
        },
        number: {
            density: {
                enable: true,
                area: 800
            },
            value: 0
        },
        opacity: {
            value: 1
        },
        shape: {
            type: "circle"
        },
        size: {
            value: 2
        }
    },
    fullScreen: {
        zIndex: -2
    },
    emitters: {
        direction: "none",
        rate: {
            quantity: 1,
            delay: 0.25
        },
        size: {
            width: 0,
            height: 0
        },
        position: {
            x: 50,
            y: 50
        }
    }
}

export default hexa;