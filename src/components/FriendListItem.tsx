import { DragEvent, MouseEvent } from "react";

type FriendListItemProps = {
  id: string;
  onFriendDragStart: (e: DragEvent<HTMLLIElement>, id: string) => void;
  onFriendClick: (e: MouseEvent<HTMLButtonElement>, id: string) => void;
  name: string;
  screenName: string;
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
  screenName,
}: FriendListItemProps) {
  return (
    <li
      key={id}
      className={`flex place-items-center ${
        selected ? "dark:bg-gray-700 bg-gray-300 rounded" : "bg-transparent"
      }`}
      onDragStart={(e) => onFriendDragStart(e, id)}
      draggable={true}
    >
      <button
        onClick={(e) => onFriendClick(e, id)}
        className={`flex flex-grow place-items-center space-x-5 p-1`}
      >
        <img
          src={profilImageUrl}
          alt={`friend ${name}`}
          className="rounded-full"
          width={50}
          height={50}
        />
        <span className="font-semibold">{name}</span>
      </button>
      <a
        href={`https://twitter.com/${screenName}`}
        target="_blank"
        rel="noreferrer"
      >
        profil
      </a>
    </li>
  );
}

export default FriendListItem;
