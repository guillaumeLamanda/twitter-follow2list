import { DragEvent, MouseEvent } from "react";

type FriendListItemProps = {
  id: string;
  onFriendDragStart: (e: DragEvent<HTMLLIElement>, id: string) => void;
  onFriendClick: (e: MouseEvent<HTMLButtonElement>, id: string) => void;
  name: string;
  profilImageUrl: string;
  selected: boolean;
};
function FriendListItem({
  id,
  onFriendDragStart,
  onFriendClick,
  profilImageUrl,
  name,
  selected,
}: FriendListItemProps) {
  return (
    <li
      key={id}
      className="flex"
      onDragStart={(e) => onFriendDragStart(e, id)}
      draggable={true}
    >
      <button
        onClick={(e) => onFriendClick(e, id)}
        className={`flex flex-grow place-items-center space-x-3 p-1 ${
          selected ? "border-green-600 border rounded" : ""
        }`}
      >
        <img src={profilImageUrl} className="rounded-full" />
        <span>{name}</span>
      </button>
    </li>
  );
}

export default FriendListItem;
