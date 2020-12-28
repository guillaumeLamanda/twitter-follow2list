import { useFriendsQuery } from "graphql/queries/friends.graphql";
import { DragEvent, MouseEvent } from "react";
import FriendListItem from "./FriendListItem";

function filterIdFromSelected(selected: string[], id: string) {
  return selected.filter((sId) => sId !== id);
}

function isIdSelected(selected: string[], id: string) {
  return selected.some((selectedId) => selectedId === id);
}

const PAGE_SIZE = 15;

export default function FriendList() {
  const { data, fetchMore } = useFriendsQuery({
    variables: { first: PAGE_SIZE },
  });
  const [selected, setSelected] = useState<Array<string>>([]);
  const toggleSelectedId = (id) => {
    setSelected(
      isIdSelected(selected, id)
        ? filterIdFromSelected(selected, id)
        : [...selected, id]
    );
  };

  const onFriendClick = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    toggleSelectedId(id);
  };
  const onFriendDragStart = (e: DragEvent<HTMLLIElement>, id: string) => {
    if (!isIdSelected) toggleSelectedId(id);
    e.dataTransfer.effectAllowed = "link";
    e.dataTransfer.setData("text/plain", selected.join(","));
  };

  return (
    <ul className="list space-y-3 w-1/4">
      {data?.friends?.nodes.map(({ name, imageSrc, id }) => (
        <FriendListItem
          key={id}
          id={id}
          onFriendDragStart={onFriendDragStart}
          onFriendClick={onFriendClick}
          profilImageUrl={imageSrc}
          name={name}
          selected={selected.some((sId) => sId === id)}
        />
      ))}
      <button
        className="flex flex-row p-3 bg-blue-300 rounded self-center"
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
  );
}
