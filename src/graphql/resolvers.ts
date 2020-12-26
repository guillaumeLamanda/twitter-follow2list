import getFriends from "functions/getFriends";
import {
  Resolvers,
  User,
} from "../../__generated__/src/graphql/type-defs.graphqls";
import { Context } from "./context";

const formatTwitterUser = ({
  id_str,
  name,
  screen_name,
  profile_image_url,
}): User => ({
  name,
  screenName: screen_name,
  imageSrc: profile_image_url,
  id: id_str,
});

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

      return Promise.all(friends.users.map(formatTwitterUser));
    },
    lists: async (_, { ownership }, { twitterClient }) => {
      const {
        screen_name,
      } = await twitterClient.accountsAndUsers.accountSettings();
      const lists = await twitterClient.accountsAndUsers.listsList({
        ...(ownership === "OWNED" && {
          screen_name,
        }),
      });
      return Promise.all(
        lists
          .filter(({ user: { screen_name: listScreenName } }) =>
            ownership === "OWNED" ? screen_name === listScreenName : true
          )
          .map(({ description, name, full_name, uri, id_str, slug, user }) => ({
            id: id_str,
            name,
            fullName: full_name,
            description,
            slug,
            uri,
            user: formatTwitterUser(user),
          }))
      );
    },
  },
};

export default resolvers;
