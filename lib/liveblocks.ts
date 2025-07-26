import {Liveblocks} from "@liveblocks/node";

const key = process.env.LIVEBLOCKS_PRIVATE_KEY;

if(!key) {
  console.warn("LIVEBLOCKS_PRIVATE_KEY is not defined in the environment variables.");
}

const liveblocks = key ? new Liveblocks({
  secret: key,
}) : null;

export default liveblocks;
