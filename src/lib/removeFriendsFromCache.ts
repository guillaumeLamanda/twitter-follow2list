import { ApolloCache } from "@apollo/client";

export default function removeFriendsFromCache(
  friendsIds: string[],
  cache: ApolloCache<unknown>
) {
  friendsIds.forEach((friendId) => {
    cache.evict({
      id: `User:${friendId}`,
    });
  });
}
