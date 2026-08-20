"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Eye, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ThemeToggle";

const PUZZLE_IMAGE = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85";

export default function NotFound() {
  const router = useRouter();

  const [tiles, setTiles] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [showTarget, setShowTarget] = useState<boolean>(false);

  // Helper to check if tiles array is in correct 0..8 order
  const checkIsSolved = (currentTiles: number[]) => {
    return currentTiles.every((val, index) => val === index);
  };

  // Shuffle tiles logic
  const shuffleTiles = useCallback(() => {
    let shuffled: number[];
    do {
      shuffled = [...Array(9).keys()].sort(() => Math.random() - 0.5);
    } while (checkIsSolved(shuffled)); // Ensure initial state is not solved

    setTiles(shuffled);
    setDraggedIdx(null);
    setDragOverIdx(null);
    setIsSolved(false);
  }, []);

  // Shuffle on initial load
  useEffect(() => {
    shuffleTiles();
  }, [shuffleTiles]);

  // Swap tiles helper - Prevents moving tiles that are already correctly placed!
  const swapTiles = (fromIdx: number, toIdx: number) => {
    if (fromIdx === toIdx || isSolved) return;

    // Lock check: Do not swap if fromIdx or toIdx is already in its correct position
    const isFromCorrect = tiles[fromIdx] === fromIdx;
    const isToCorrect = tiles[toIdx] === toIdx;
    if (isFromCorrect || isToCorrect) return;

    const newTiles = [...tiles];
    const temp = newTiles[fromIdx];
    newTiles[fromIdx] = newTiles[toIdx];
    newTiles[toIdx] = temp;

    setTiles(newTiles);
    setDraggedIdx(null);
    setDragOverIdx(null);

    // Check win condition -> Automatically navigate to home page if solved!
    if (checkIsSolved(newTiles)) {
      setIsSolved(true);
      setTimeout(() => {
        router.push("/");
      }, 1200);
    }
  };

  // Drag and Drop event handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    const isCorrectPos = tiles[index] === index;
    if (isSolved || isCorrectPos) {
      e.preventDefault();
      return;
    }
    setDraggedIdx(index);
    e.dataTransfer.setData("text/plain", index.toString());
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    const isCorrectPos = tiles[index] === index;
    if (isCorrectPos) return; // Cannot drop onto a locked correct tile

    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIdx !== index) {
      setDragOverIdx(index);
    }
  };

  const handleDragLeave = (_e: React.DragEvent) => {
    setDragOverIdx(null);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const sourceIdxStr = e.dataTransfer.getData("text/plain");
    const sourceIdx = sourceIdxStr ? parseInt(sourceIdxStr, 10) : draggedIdx;

    if (sourceIdx !== null && !isNaN(sourceIdx)) {
      swapTiles(sourceIdx, targetIndex);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#fdf8f8] dark:bg-[#121212] text-[#1c1b1b] dark:text-[#f4f0ef] px-6 sm:px-12 md:px-16 pt-8 pb-12 transition-colors duration-300 select-none">
      
      {/* Header */}
      <header className="flex items-center justify-between w-full max-w-[1440px] mx-auto mb-6">
        <Link
          href="/"
          className="font-raleway text-[20px] md:text-[24px] font-normal tracking-[0.2em] uppercase text-[#1c1b1b] dark:text-[#f4f0ef] hover:opacity-80 transition-opacity"
        >
          DECORIUM
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Split Content Layout - Center Aligned Both Sides */}
      <main className="w-full max-w-[1440px] mx-auto my-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center justify-center">
          
          {/* LEFT SIDE: DRAG & DROP 9-BOX TILE PUZZLE GAME (CENTER ALIGNED) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center text-center w-full">
            
            {/* Game Toolbar Controls (Icons Only) */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <Button
                variant="icon"
                size="icon"
                onClick={shuffleTiles}
                icon={RefreshCw}
                aria-label="Shuffle tiles"
                title="Shuffle tiles"
              />

              <Button
                variant="icon"
                size="icon"
                onClick={() => setShowTarget(!showTarget)}
                icon={Eye}
                aria-label={showTarget ? "Hide target image" : "Show target image"}
                title={showTarget ? "Hide target image" : "Show target image"}
                className={showTarget ? "bg-[#1c1b1b] !text-white dark:bg-[#f4f0ef] dark:!text-[#121212]" : ""}
              />
            </div>

            {/* 3x3 Tile Drag & Drop Game Container (No Outer Border / No BG Color) */}
            <div className="relative w-[300px] sm:w-[360px] md:w-[400px] aspect-square overflow-hidden bg-transparent border-none">
              
              {/* Target Image Preview Overlay */}
              <AnimatePresence>
                {showTarget && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.95 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 overflow-hidden pointer-events-none"
                  >
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${PUZZLE_IMAGE})` }}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="font-label-caps text-label-caps text-white bg-black/80 px-4 py-2 rounded-full uppercase tracking-widest backdrop-blur-md">
                        TARGET IMAGE
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 3x3 Drag & Drop Grid (Border-Free Tile Grid) */}
              <div className="grid grid-cols-3 grid-rows-3 gap-1 w-full h-full">
                {tiles.map((tileOriginalIdx, gridPosIndex) => {
                  const isDraggingThis = draggedIdx === gridPosIndex;
                  const isDragOverThis = dragOverIdx === gridPosIndex;
                  const isCorrectPos = tileOriginalIdx === gridPosIndex;

                  // Color state: Vibrant Color if correct position, dragging, target hover, or puzzle solved!
                  const isColorful = isCorrectPos || isDraggingThis || isDragOverThis || isSolved;

                  // Calculate background offset for 3x3 crop
                  const origRow = Math.floor(tileOriginalIdx / 3);
                  const origCol = tileOriginalIdx % 3;
                  const bgPosX = origCol * 50; // 0%, 50%, 100%
                  const bgPosY = origRow * 50; // 0%, 50%, 100%

                  return (
                    <div
                      key={tileOriginalIdx}
                      draggable={!isCorrectPos && !isSolved}
                      onDragStart={(e) => handleDragStart(e, gridPosIndex)}
                      onDragOver={(e) => handleDragOver(e, gridPosIndex)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, gridPosIndex)}
                      className={`relative w-full h-full rounded-none border-none overflow-hidden transition-all duration-300 focus:outline-none ${
                        isColorful ? "grayscale-0 opacity-100" : "grayscale opacity-60 hover:opacity-90"
                      } ${
                        isCorrectPos
                          ? "cursor-default"
                          : "cursor-grab active:cursor-grabbing hover:scale-[1.02]"
                      } ${
                        isDraggingThis
                          ? "opacity-50 scale-95 z-20"
                          : isDragOverThis
                          ? "ring-2 ring-emerald-500 scale-105 z-10"
                          : ""
                      }`}
                      style={{
                        backgroundImage: `url(${PUZZLE_IMAGE})`,
                        backgroundSize: "300% 300%",
                        backgroundPosition: `${bgPosX}% ${bgPosY}%`,
                      }}
                    />
                  );
                })}
              </div>

              {/* Victory Overlay -> Redirecting Home */}
              <AnimatePresence>
                {isSolved && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-30 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-white text-center rounded-xl"
                  >
                    <CheckCircle2 className="size-14 text-emerald-400 mb-3 animate-bounce" />
                    <h3 className="font-raleway text-headline-md uppercase font-light tracking-wide mb-2">
                      PUZZLE SOLVED!
                    </h3>
                    <p className="font-body-sm text-white/80 max-w-xs mb-4">
                      Moving to Home Page...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

          {/* RIGHT SIDE: 404 & PAGE NOT FOUND TEXT (CENTER ALIGNED) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center text-center w-full">
            <span className="font-label-caps text-label-caps text-[#5d5f5f] dark:text-[#8e8e8e] uppercase tracking-widest block mb-2">
              ERROR 404
            </span>

            <h1 className="font-raleway text-[90px] sm:text-[130px] lg:text-[160px] font-light leading-none tracking-tight text-[#1c1b1b] dark:text-[#f4f0ef] mb-4">
              404
            </h1>

            <h2 className="font-raleway text-headline-md sm:text-headline-lg uppercase font-light tracking-wide text-[#1c1b1b] dark:text-[#f4f0ef] mb-3">
              PAGE NOT FOUND
            </h2>

            <p className="font-body-md text-body-md text-[#5d5f5f] dark:text-[#a0a0a0] max-w-md mb-8">
              Drag and drop the tiles on the left into their correct positions. Correctly placed tiles reveal full color and lock in place!
            </p>

            <Button href="/" variant="primary" size="md" icon={ArrowRight} className="rounded-full px-8 py-3.5">
              Skip & Go Home
            </Button>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-between w-full max-w-[1440px] mx-auto pt-6 border-t border-[#c4c7c7]/30 dark:border-[#262626] font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase tracking-widest">
        <span>ERROR 404</span>
        <span>DECORIUM © 2026</span>
      </footer>

    </div>
  );
}
