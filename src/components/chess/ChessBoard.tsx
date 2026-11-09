"use client";

import { useMemo, type CSSProperties } from "react";
import { Chessboard, type ChessboardOptions } from "react-chessboard";
import type { Target } from "@/chess/engine";
import type { Color } from "@/chess/types";

export interface ChessBoardProps {
  fen: string;
  orientation: "white" | "black";
  /** Side to move. Only its pieces can be picked up. */
  turn: Color;
  /** False once the game is over (nothing can be moved). */
  interactive: boolean;
  selected: string | null;
  targets: Target[];
  lastMove: { from: string; to: string } | null;
  checkSquare: string | null;
  /** Accessible description of the position, for screen readers. */
  label: string;
  onSquareClick: (square: string, pieceType: string | null) => void;
  /** Return true to accept the drop. Illegal drops snap back. */
  onDrop: (from: string, to: string) => boolean;
}

const LIGHT = "#F1F3FA";
const DARK = "#7C86BE";

const selectedStyle: CSSProperties = { backgroundColor: "rgba(255, 200, 87, 0.85)" };
const lastMoveStyle: CSSProperties = { backgroundColor: "rgba(20, 184, 166, 0.45)" };
const moveDot: CSSProperties = {
  backgroundImage: "radial-gradient(circle, rgba(81, 70, 216, 0.55) 22%, transparent 24%)",
};
const captureRing: CSSProperties = {
  backgroundImage: "radial-gradient(circle, transparent 58%, rgba(255, 133, 133, 0.9) 60%, rgba(255, 133, 133, 0.9) 78%, transparent 80%)",
};
const checkStyle: CSSProperties = {
  backgroundImage: "radial-gradient(circle, rgba(255, 70, 70, 0.95) 0%, rgba(255, 70, 70, 0.55) 45%, transparent 75%)",
};

/**
 * The chessboard. It only draws a position and reports taps and drags; it holds
 * no chess rules. The game screen decides what is legal and tells this
 * component what to highlight.
 */
export function ChessBoard({
  fen,
  orientation,
  turn,
  interactive,
  selected,
  targets,
  lastMove,
  checkSquare,
  label,
  onSquareClick,
  onDrop,
}: ChessBoardProps) {
  const squareStyles = useMemo(() => {
    const styles: Record<string, CSSProperties> = {};
    if (lastMove) {
      styles[lastMove.from] = lastMoveStyle;
      styles[lastMove.to] = lastMoveStyle;
    }
    if (checkSquare) styles[checkSquare] = { ...styles[checkSquare], ...checkStyle };
    for (const t of targets) styles[t.to] = { ...styles[t.to], ...(t.capture ? captureRing : moveDot) };
    if (selected) styles[selected] = { ...styles[selected], ...selectedStyle };
    return styles;
  }, [lastMove, checkSquare, targets, selected]);

  const options: ChessboardOptions = {
    position: fen,
    boardOrientation: orientation,
    allowDragging: interactive,
    allowDrawingArrows: false,
    showAnimations: true,
    animationDurationInMs: 160,
    lightSquareStyle: { backgroundColor: LIGHT },
    darkSquareStyle: { backgroundColor: DARK },
    squareStyles,
    boardStyle: { borderRadius: 14, overflow: "hidden", boxShadow: "0 6px 20px rgb(32 40 68 / 0.16)" },
    dropSquareStyle: { boxShadow: "inset 0 0 0 4px rgba(81, 70, 216, 0.6)" },
    canDragPiece: ({ piece }) => interactive && piece.pieceType.startsWith(turn === "w" ? "w" : "b"),
    onSquareClick: ({ piece, square }) => onSquareClick(square, piece ? piece.pieceType : null),
    // A tap on a piece is reported as a piece click, so both routes lead to the same handler.
    onPieceClick: ({ piece, square }) => {
      if (square) onSquareClick(square, piece.pieceType);
    },
    onPieceDrop: ({ sourceSquare, targetSquare }) => (targetSquare ? onDrop(sourceSquare, targetSquare) : false),
  };

  return (
    <div role="group" aria-label={label} className="mx-auto aspect-square w-full max-w-[40rem] touch-manipulation select-none">
      <Chessboard options={options} />
    </div>
  );
}
