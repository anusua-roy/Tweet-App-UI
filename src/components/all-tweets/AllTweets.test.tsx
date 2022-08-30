import { render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { server } from "../../mocks/mockServer";
import AllTweets from "./AllTweets";

describe("All Tweets", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  test("new tweet container rendered", async () => {
    render(
      <SnackbarProvider>
        <AllTweets />
      </SnackbarProvider>
    );
    const newTweet = await screen.findByTestId("new-tweet-container");
    expect(newTweet).toBeInTheDocument();
  });
  test("new tweet form rendered", async () => {
    render(
      <SnackbarProvider>
        <AllTweets />
      </SnackbarProvider>
    );
    const newTweetTextField = await screen.findByTestId("new-post-textfield");
    expect(newTweetTextField).toBeInTheDocument();
    const newTweetPostBtn = await screen.findByTestId("new-tweet-post-button");
    expect(newTweetPostBtn).toBeInTheDocument();
  });
  test("tweets container rendered", async () => {
    render(
      <SnackbarProvider>
        <AllTweets />
      </SnackbarProvider>
    );
    const tweetsContainer = await screen.findAllByTestId("tweet-container");
    expect(tweetsContainer).toHaveLength(2);
  });
});
