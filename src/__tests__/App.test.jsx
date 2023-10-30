import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Whac-a-mole App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(screen.getByText(/Whac-a-mole game/i)).toBeInTheDocument();
  });

  it("starts the game when 'Start game' button is clicked", () => {
    render(<App />);
    const startButton = screen.getByText(/Start game/i);
    fireEvent.click(startButton);
    expect(startButton).toBeDisabled();
  });

  // ... additional tests ...
});
