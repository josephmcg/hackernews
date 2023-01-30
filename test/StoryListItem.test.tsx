import { render, screen } from "@testing-library/react";
import { StoryListItem } from "~/components/StoryListItem";

describe("StoryListItem", () => {
  test("should render a story author", () => {
    render(
      <StoryListItem
        id={0}
        type={"job"}
        by="author"
        time={0}
        text={""}
        kids={[]}
        score={0}
        title={""}
      />
    );
    expect(screen.getByText(/author/i)).toBeDefined();
  });

  test("should render a story title", () => {
    render(
      <StoryListItem
        id={0}
        type={"job"}
        by="author"
        time={0}
        text={""}
        kids={[]}
        score={0}
        title={"title"}
      />
    );
    expect(screen.getByText(/title/i)).toBeDefined();
  });

  test("should render descendants", () => {
    render(
      <StoryListItem
        id={0}
        type={"job"}
        by="author"
        time={0}
        text={""}
        kids={[]}
        score={0}
        title={"title"}
        descendants={25}
      />
    );
    expect(screen.getByText(/25/i)).toBeDefined();
  });

  test("should add href if url is present", () => {
    render(
      <StoryListItem
        id={0}
        type={"job"}
        by="author"
        time={0}
        text={""}
        kids={[]}
        score={0}
        title={"title"}
        url="test"
      />
    );

    expect(screen.getByTestId(/^link/)).toHaveProperty("href");
  });
});
