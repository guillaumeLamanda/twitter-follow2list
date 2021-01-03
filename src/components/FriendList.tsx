import { isIdSelected, useSelectedFriends } from "contexts/selected-friends";
import { useFriendsQuery } from "graphql/queries/friends.graphql";
import { DragEvent, MouseEvent } from "react";
import FriendListItem from "./FriendListItem";
import Loader from "./Loader";

const PAGE_SIZE = 15;

export default function FriendList() {
  const { data, fetchMore, error, loading } = useFriendsQuery({
    variables: { first: PAGE_SIZE },
  });
  const {
    friends: selectedFriends,
    toggle: toggleSelectedFriends,
  } = useSelectedFriends();

  const onFriendClick = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    toggleSelectedFriends(id);
  };
  const onFriendDragStart = (e: DragEvent<HTMLLIElement>, id: string) => {
    if (!isIdSelected(selectedFriends, id)) toggleSelectedFriends(id);
    e.dataTransfer.effectAllowed = "link";
    e.dataTransfer.setData("text/plain", selectedFriends.join(","));
  };

  if (error)
    return (
      <span className="text-red-500 bg-red-200 p-3 rounded">
        {error.message}
      </span>
    );
  if (loading) return <Loader />;

  return (
    <>
      <ul className="bg-gray-800 rounded p-5 inline-flex flex-col">
        {data?.friends?.nodes.map(({ name, imageSrc, id, screenName }) => (
          <FriendListItem
            key={id}
            id={id}
            onFriendDragStart={onFriendDragStart}
            onFriendClick={onFriendClick}
            profilImageUrl={imageSrc}
            name={name}
            screenName={screenName}
            selected={isIdSelected(selectedFriends, id)}
          />
        ))}
        {data.friends.nextCursor !== "-1" && (
          <button
            className="p-1 m-auto bg-blue-300 rounded"
            onClick={() => {
              fetchMore({
                variables: {
                  after: data.friends.nextCursor,
                  first: PAGE_SIZE,
                },
              });
            }}
          >
            load more
          </button>
        )}
      </ul>
    </>
  );
}
