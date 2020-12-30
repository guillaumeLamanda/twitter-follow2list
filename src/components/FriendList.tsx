import { isIdSelected, useSelectedFriends } from "contexts/selected-friends";
import { useFriendsQuery } from "graphql/queries/friends.graphql";
import { DragEvent, MouseEvent } from "react";
import FriendListItem from "./FriendListItem";

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
  if (loading) return <span> loading...</span>;

  return (
    <>
      <ul className="bg-gray-800 rounded p-5 inline-flex flex-col">
        {data?.friends?.nodes.map(({ name, imageSrc, id }) => (
          <FriendListItem
            key={id}
            id={id}
            onFriendDragStart={onFriendDragStart}
            onFriendClick={onFriendClick}
            profilImageUrl={imageSrc}
            name={name}
            selected={isIdSelected(selectedFriends, id)}
          />
        ))}
        <button
          className="p-3 m-auto bg-blue-300 rounded"
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
      </ul>
    </>
  );
}
