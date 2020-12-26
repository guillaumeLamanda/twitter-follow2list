import getFriends from "functions/getFriends";
import { Resolvers } from "../../__generated__/src/graphql/type-defs.graphqls";
import { Context } from "./context";

const resolvers: Resolvers<Context> = {
  Query: {
    hello: () => `Hello World`,
    friends: async (
      _,
      { pagination: { after: cursor, first } = {} },
      { twitterClient }
    ) => {
      const friends = await twitterClient.accountsAndUsers.friendsList({
        count: first,
        ...(!!cursor && { cursor }),
      });

      return Promise.all(
        friends.users.map(
          ({ id_str, name, screen_name, profile_image_url, description }) => ({
            name,
            screenName: screen_name,
            imageSrc: profile_image_url,
            id: id_str,
          })
        )
      );
    },
  },
};

export default resolvers;
