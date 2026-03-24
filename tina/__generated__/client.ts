import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: 'C:/Users/jniet/OneDrive/Dokumenty/Vercel/adflux-ux/tina/__generated__/.cache/1773923901328', url: 'http://localhost:4001/graphql', token: 'abcd1234abcd1234', queries,  });
export default client;
  