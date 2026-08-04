import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

// Mock the components used in Home to simplify the test
jest.mock("@/components/Navbar", () => {
  return function MockNavbar() {
    return <div data-testid="navbar">Navbar</div>;
  };
});

jest.mock("@/components/Hero", () => {
  return function MockHero() {
    return <div data-testid="hero">Hero</div>;
  };
});

jest.mock("@/components/Features", () => {
  return function MockFeatures() {
    return <div data-testid="features">Features</div>;
  };
});

jest.mock("@/components/HowItWorks", () => {
  return function MockHowItWorks() {
    return <div data-testid="how-it-works">How It Works</div>;
  };
});

jest.mock("@/components/FAQ", () => {
  return function MockFAQ() {
    return <div data-testid="faq">FAQ</div>;
  };
});

jest.mock("@/components/Footer", () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer</div>;
  };
});

describe("Home Page", () => {
  it("renders all main components", () => {
    render(<Home />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByTestId("features")).toBeInTheDocument();
    expect(screen.getByTestId("how-it-works")).toBeInTheDocument();
    expect(screen.getByTestId("faq")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
