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
        className={`flex flex-grow place-items-center space-x-5 p-1 ${
          selected ? "bg-gray-700 rounded" : "bg-transparent"
        }`}
      >
        <img
          src={profilImageUrl}
          className="rounded-full"
          width={50}
          height={50}
        />
        <span className="font-semibold">{name}</span>
      </button>
    </li>
  );
}

export default FriendListItem;
