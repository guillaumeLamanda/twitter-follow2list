import { Resolvers, User, UserList } from "../../.cache/__types__";
import { Context } from "./context";

const formatTwitterUser = ({
  id_str,
  name,
  screen_name,
  profile_image_url_https,
}): User => ({
  name,
  screenName: screen_name,
  imageSrc: profile_image_url_https,
  id: id_str,
});

const formatTwitterList = ({
  description,
  name,
  full_name,
  uri,
  id_str,
  slug,
  user,
  mode,
}): UserList => ({
  id: id_str,
  name,
  fullName: full_name,
  description,
  slug,
  uri,
  user: formatTwitterUser(user),
  mode,
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

      return {
        nextCursor: friends.next_cursor_str,
        previousCursor: friends.previous_cursor_str,
        nodes: friends.users.map(formatTwitterUser),
      };
    },
    lists: async (_, { ownership }, { twitterClient }) => {
      const { screen_name } =
        await twitterClient.accountsAndUsers.accountSettings();
      const lists = await twitterClient.accountsAndUsers.listsList({
        ...(ownership === "OWNED" && {
          screen_name,
        }),
      });

      return lists
        .filter(({ user: { screen_name: listScreenName } }) =>
          ownership === "OWNED" ? screen_name === listScreenName : true
        )
        .map(formatTwitterList);
    },
    list: async (_, { id, slug }, { twitterClient }) =>
      twitterClient.accountsAndUsers
        .listsShow({
          list_id: id,
          slug,
        })
        .then(formatTwitterList),
  },
  Mutation: {
    addFriendsToList: async (
      _,
      { input: { friendsIds, listId: list_id, unfollow } },
      { twitterClient }
    ) => {
      await twitterClient.accountsAndUsers.listsMembersCreateAll({
        list_id,
        slug: list_id,
        user_id: friendsIds.join(","),
      });
      if (unfollow) {
        await Promise.all(
          friendsIds.map((user_id) =>
            twitterClient.accountsAndUsers.friendshipsDestroy({
              user_id,
            })
          )
        );
      }
      return twitterClient.accountsAndUsers
        .listsShow({ list_id, slug: list_id })
        .then(formatTwitterList);
    },
    createList: async (
      _,
      { input: { description, title, mode } },
      { twitterClient }
    ) =>
      twitterClient.accountsAndUsers
        .listsCreate({
          name: title,
          description,
          mode,
        })
        .then(formatTwitterList),
    unfollow: (_, { ids }, { twitterClient }) =>
      Promise.all(
        ids.map((id) =>
          twitterClient.accountsAndUsers.friendshipsDestroy({
            user_id: id,
          })
        )
      ).then((users) => users.map(formatTwitterUser)),
    updateList: async (
      _,
      { input: { description, id, slug, title, mode } },
      { twitterClient }
    ) =>
      twitterClient.accountsAndUsers
        .listsUpdate({
          list_id: id,
          slug,
          ...(title && { name: title }),
          ...(description && { description }),
          mode,
        })
        .then(formatTwitterList),
  },
};

export default resolvers;
