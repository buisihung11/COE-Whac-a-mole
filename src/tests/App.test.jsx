import { fireEvent, render, screen } from "@testing-library/react";
import { afterAll, beforeEach, describe, expect, it, test } from "vitest";
import React from "react";
import App from "../App";

describe("Whac-a-mole App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(screen.getByText(/Whack-a-mole game/i)).toBeInTheDocument();
  });

  it("starts the game when 'Start game' button is clicked", () => {
    render(<App />);
    const startButton = screen.getByText(/Start game/i);
    fireEvent.click(startButton);
    expect(startButton).toBeDisabled();
  });

  // ... additional tests ...
});

test("start game button works correctly", async () => {
  const { getByText } = render(<App />);
  const startButton = getByText("Start game");

  // Click on the start button
  fireEvent.click(startButton);

  // Expect the time left to be 30 after starting the game
  expect(getByText("30s")).toBeInTheDocument();

  // Check if the start button is disabled after starting the game
  expect(startButton).toBeDisabled();
});

// Mock Math.random to always return a value > 0.5
const originalMathRandom = Math.random;

afterAll(() => {
  // Restore the original Math.random function after testing
  Math.random = originalMathRandom;
});

test("Whack-a-mole game score updates correctly - Mole", async () => {
  Math.random = () => 0.6;

  const { getByText, getByTestId, container } = render(<App />);

  // Start the game
  fireEvent.click(getByText("Start game"));

  // Wait for the game to start (change the timeLeft to 29s to ensure the game starts)
  await new Promise((resolve) => setTimeout(resolve, 2500));

  // Get the initial score
  const initialScore = Number(
    container.querySelector("#game-score").textContent
  );

  // Find a mole and hit it
  fireEvent.click(getByTestId("mole"));

  // Check if the score has increased by 1
  const updatedScore = Number(
    container.querySelector("#game-score")?.textContent
  );
  expect(updatedScore).toBe(initialScore + 1);
});

test("Whack-a-mole game score updates correctly - Rabbit", async () => {
  // Mock Math.random to always return a value > 0.5
  Math.random = () => 0.4;

  const { getByText, getByTestId, container } = render(<App />);

  // Start the game
  fireEvent.click(getByText("Start game"));

  // Wait for the game to start (change the timeLeft to 29s to ensure the game starts)
  await new Promise((resolve) => setTimeout(resolve, 2500));

  // Get the initial score
  const initialScore = Number(
    container.querySelector("#game-score").textContent
  );

  // Find a mole and hit it
  fireEvent.click(getByTestId("rabbit"));

  // Check if the score has increased by 1
  const updatedScore = Number(
    container.querySelector("#game-score")?.textContent
  );
  expect(updatedScore).toBe(initialScore - 1);
});
