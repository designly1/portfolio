import React, { useState, useRef, useEffect } from 'react';
import { Howl, Howler } from 'howler';
import Image from 'next/image';
import toast from '@/lib/ui/toast';

import gameOverImg from '@/img/game-over.png'

const CELL_SIZE = 200;
const GRID_SIZE = CELL_SIZE * 3;
const SYMBOL_SIZE = CELL_SIZE * 0.25;
const SYMBOL_O_COLOR = '#00f';
const SYMBOL_X_COLOR = '#f00';
const SYMBOL_THICKNESS = 10;
const GRID_BORDER_COLOR = '#888';
const GRID_TILE_COLOR = '#1e1e1e';
const SFX_VOL = 0.5;
const GAME_DELAY = 200;


const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(''));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [isHumanVsHuman, setIsHumanVsHuman] = useState(true);
    const [gameIsActive, setGameIsActive] = useState(true);
    const [autoGame, setAutoGame] = useState(false);

    const canvasRef = useRef(null);

    // Initialize sound effects
    const sfxPop1 = new Howl({
        src: ['/sfx/pop1.webm', '/sfx/pop1.mp3'],
        volume: SFX_VOL
    });
    const sfxPop2 = new Howl({
        src: ['/sfx/pop2.webm', '/sfx/pop2.mp3'],
        volume: SFX_VOL
    });
    const sfxWin = new Howl({
        src: ['/sfx/win.webm', '/sfx/win.mp3'],
        volume: SFX_VOL
    });
    const sfxGameOver = new Howl({
        src: ['/sfx/game-over.webm', '/sfx/game-over.mp3'],
        volume: SFX_VOL
    });

    const togglePlayer = () => {
        setCurrentPlayer(oldVal => (oldVal === 'X' ? 'O' : 'X'));
    }

    const gameMove = (event) => {
        if (!gameIsActive) return;

        const newBoard = [...board];

        const doComputerMove = (plr) => {
            const computerMove = getComputerMove(newBoard);
            newBoard[computerMove] = plr;
            setBoard(newBoard);

            if (checkWinner(newBoard, plr)) {
                toast({
                    title: 'You Lose!',
                    icon: 'error'
                });
                sfxGameOver.play();
                haltGame();
                return;
            }

            if (isTie(newBoard)) {
                toast({
                    title: 'Tie Game!',
                    icon: 'success'
                });
                sfxWin.play();
                haltGame();
                return;
            }

            togglePlayer();
        }

        if (event) {
            const rect = canvasRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const row = Math.floor(y / CELL_SIZE);
            const col = Math.floor(x / CELL_SIZE);

            const index = row * 3 + col;

            if (board[index] !== '') {
                return;
            }

            newBoard[index] = currentPlayer;
            setBoard(newBoard);
        } else {
            doComputerMove(currentPlayer);
        }

        if (checkWinner(newBoard, currentPlayer)) {

            toast({
                title: `${currentPlayer} wins!`,
                icon: 'success'
            });
            sfxWin.play();
            haltGame();
            return;
        }

        if (isTie(newBoard)) {
            toast({
                title: 'Tie Game!',
                icon: 'success'
            });
            sfxWin.play();
            haltGame();
            return;
        }

        togglePlayer();

        if (!isHumanVsHuman && currentPlayer === 'X') {
            doComputerMove('O');
        }
        // Play pop effect based on player turn
        if (currentPlayer === 'X') {
            sfxPop1.play();
        } else {
            sfxPop2.play();
        }
    }

    const aiPlay = () => {
        gameMove();
        togglePlayer();
    }

    const handleCanvasClick = (event) => {
        return gameMove(event);
    };

    const haltGame = () => {
        setGameIsActive(false);
    }

    const drawBoard = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, GRID_SIZE, GRID_SIZE);

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = board[i * 3 + j];
                const x = j * CELL_SIZE + CELL_SIZE / 2;
                const y = i * CELL_SIZE + CELL_SIZE / 2;

                ctx.fillStyle = GRID_TILE_COLOR;
                ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);

                if (cell === 'X') {
                    drawX(ctx, x, y);
                } else if (cell === 'O') {
                    drawO(ctx, x, y);
                }
            }
        }

        drawGrid(ctx);
    };

    const drawGrid = (ctx) => {
        ctx.strokeStyle = GRID_BORDER_COLOR;
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(CELL_SIZE, 0);
        ctx.lineTo(CELL_SIZE, GRID_SIZE);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(CELL_SIZE * 2, 0);
        ctx.lineTo(CELL_SIZE * 2, GRID_SIZE);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, CELL_SIZE);
        ctx.lineTo(GRID_SIZE, CELL_SIZE);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, CELL_SIZE * 2);
        ctx.lineTo(GRID_SIZE, CELL_SIZE * 2);
        ctx.stroke();

    };

    const drawX = (ctx, x, y) => {
        ctx.strokeStyle = SYMBOL_X_COLOR;
        ctx.lineWidth = SYMBOL_THICKNESS;
        ctx.beginPath();
        ctx.moveTo(x - SYMBOL_SIZE, y - SYMBOL_SIZE);
        ctx.lineTo(x + SYMBOL_SIZE, y + SYMBOL_SIZE);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + SYMBOL_SIZE, y - SYMBOL_SIZE);
        ctx.lineTo(x - SYMBOL_SIZE, y + SYMBOL_SIZE);
        ctx.stroke();
    };

    const drawO = (ctx, x, y) => {
        ctx.strokeStyle = SYMBOL_O_COLOR;
        ctx.lineWidth = SYMBOL_THICKNESS;
        ctx.beginPath();
        ctx.arc(x, y, SYMBOL_SIZE, 0, 2 * Math.PI);
        ctx.stroke();
    };

    const resetGame = () => {
        setGameIsActive(true);
        setBoard(Array(9).fill(''));
        setCurrentPlayer('X');
    };

    const isTie = (currentBoard) => {
        return !currentBoard.includes('');
    };

    const checkWinner = (currentBoard, symbol) => {
        return (
            (currentBoard[0] === symbol && currentBoard[1] === symbol && currentBoard[2] === symbol) ||
            (currentBoard[3] === symbol && currentBoard[4] === symbol && currentBoard[5] === symbol) ||
            (currentBoard[6] === symbol && currentBoard[7] === symbol && currentBoard[8] === symbol) ||
            (currentBoard[0] === symbol && currentBoard[3] === symbol && currentBoard[6] === symbol) ||
            (currentBoard[1] === symbol && currentBoard[4] === symbol && currentBoard[7] === symbol) ||
            (currentBoard[2] === symbol && currentBoard[5] === symbol && currentBoard[8] === symbol) ||
            (currentBoard[0] === symbol && currentBoard[4] === symbol && currentBoard[8] === symbol) ||
            (currentBoard[2] === symbol && currentBoard[4] === symbol && currentBoard[6] === symbol)
        );
    };

    const getComputerMove = (currentBoard) => {
        const emptyCells = [];
        currentBoard.forEach((cell, index) => {
            if (cell === '') {
                emptyCells.push(index);
            }
        });
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    };

    useEffect(() => {
        drawBoard();

        const id = setInterval(() => {
            if (autoGame) {
                if (!gameIsActive) {
                    setAutoGame(false);
                    return;
                };
                aiPlay();
            }
        }, GAME_DELAY);

        // Cleanup interval timer
        return () => clearInterval(id);
    }, [board]);

    return (
        <>
            <div className="m-auto flex flex-col gap-6">
                <h1 className="font-bold text-4xl text-center">Tic-Tac-Toe</h1>
                <canvas
                    ref={canvasRef}
                    width={GRID_SIZE}
                    height={GRID_SIZE}
                    onClick={handleCanvasClick}
                />
                <div className="flex justify-around">
                    <button
                        className="btn-bordered bg-bg2 hover:bg-bg2/40"
                        onClick={resetGame}
                    >Reset Game</button>
                    <button
                        onClick={aiPlay}
                        className="btn-bordered bg-blue-800 hover:bg-blue-700"
                    >
                        AI Move
                    </button>
                    <button
                        onClick={() => {
                            setIsHumanVsHuman(true);
                            setTimeout(() => {
                                setAutoGame(true);
                                aiPlay();
                            }, 50)
                        }}
                        className="btn-bordered bg-red-800 hover:bg-red-700"
                    >
                        Play AI Game
                    </button>
                    <div className="flex gap-2 [&>*]:my-auto">
                        <input id="two-player-opt" type="checkbox" checked={isHumanVsHuman} onChange={() => setIsHumanVsHuman(!isHumanVsHuman)} />
                        <label className="cursor-pointer" htmlFor='two-player-opt'>Two Player</label>
                    </div>
                </div>
            </div>
            {
                gameIsActive
                    ?
                    <></>
                    :
                    <div className="fixed top-0 right-0 bottom-0 left-0 flex flex-col bg-black/50">
                        <Image
                            className="mx-auto mt-auto"
                            src={gameOverImg.src}
                            alt="Game Over"
                            width={600}
                            height={476}
                        />
                        <button
                            className="btn-bordered bg-indigo-700/70 hover:bg-indigo-600 mx-auto mb-auto mt-[-130px]"
                            onClick={resetGame}
                        >New Game</button>
                    </div>
            }
        </>
    );
};

export default TicTacToe;