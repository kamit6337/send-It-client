import { render, screen, waitFor } from "@testing-library/react";
import Home from "@/pages/home/Home";
import { vi } from "vitest";
import * as PostsHook from "@/hooks/posts/useFollowingUserPosts";
import * as AuthHook from "@/hooks/auth/useLoginCheck";
import TestWrapper from "./providers/TestWrapper.test";

// mock return user data
vi.mock("@/hooks/auth/useLoginCheck", () => ({
  __esModule: true,
  default: () => ({
    data: {
      _id: "1", // same as currentUserId in your mockPost.user
      email: "test@example.com",
      name: "User",
      photo: "",
    },
  }),
}));

// Mock Intersection Observer
vi.mock("react-intersection-observer", () => ({
  useInView: () => ({ ref: () => {}, inView: false }),
}));

// Mock useFollowingUserPosts
const mockUseFollowingUserPosts = (overrides = {}) => {
  vi.spyOn(PostsHook, "default").mockReturnValue({
    isLoading: false,
    error: null,
    data: { pages: [] },
    isFetchingNextPage: false,
    hasNextPage: false,
    fetchNextPage: vi.fn(),
    ...overrides,
  });
};

describe("Home page", () => {
  it("renders loading state", () => {
    mockUseFollowingUserPosts({ isLoading: true });

    render(<Home />, { wrapper: TestWrapper });

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders error message", () => {
    mockUseFollowingUserPosts({ error: { message: "Something went wrong" } });

    render(<Home />, { wrapper: TestWrapper });

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders empty message when no posts", () => {
    mockUseFollowingUserPosts({ data: { pages: [] } });

    render(<Home />, { wrapper: TestWrapper });

    expect(screen.getByText(/no post available yet/i)).toBeInTheDocument();
  });

  it("renders posts when data is available", async () => {
    const mockPost = {
      _id: "123",
      message: "Hello world",
      replies: [],
      user: { _id: "1", email: "test@example.com", name: "User", photo: "" },
      createdAt: new Date().toISOString(),
    };

    mockUseFollowingUserPosts({
      data: { pages: [[mockPost]] },
    });

    render(<Home />, { wrapper: TestWrapper });

    await waitFor(() => {
      expect(screen.getByText(/hello world/i)).toBeInTheDocument();
    });
  });
});
