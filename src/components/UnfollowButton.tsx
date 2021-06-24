import { useSelectedFriends } from "contexts/selected-friends";
import { useUnfollowMutation } from "graphql/mutations/unfollow.graphql";
import removeFriendsFromCache from "lib/removeFriendsFromCache";
import { useCallback } from "react";

export default function UnfollowButton() {
  const { friends, reset } = useSelectedFriends();
  const [unfollow, { loading }] = useUnfollowMutation({
    update: (cache) => {
      removeFriendsFromCache(friends, cache);
    },
  });

  const onClick = useCallback(async () => {
    await unfollow({
      variables: {
        ids: friends,
      },
    });
    reset();
  }, [friends, reset, unfollow]);

  return (
    !!friends.length && (
      <button className="primary-button" disabled={loading} onClick={onClick}>
        unfollow
      </button>
    )
  );
}
