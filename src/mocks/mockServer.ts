import { rest } from "msw";
import { setupServer } from "msw/node";
import { BASE_URL } from "../constants/Static.constants";
import { allTweets } from "./data/allTweets";

export const server = setupServer(
  rest.get(`${BASE_URL}/all`, (req, res, ctx) => {
    return res(ctx.json(allTweets));
  })
);
