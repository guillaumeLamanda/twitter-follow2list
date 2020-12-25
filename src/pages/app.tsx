import { NextPage } from "next";
import getFriends from "functions/getFriends";
import { FriendsList, ListsList } from "twitter-api-client";
import { DragEvent, MouseEvent, useState } from "react";
import getLists from "functions/getLists";
import getUser from "functions/getUser";

type Props = {
  friends: FriendsList;
  lists: ListsList[];
};
const AppPage: NextPage<Props> = ({ friends, lists }) => {
  const [selected, setSelected] = useState<Array<number>>([]);
  const toggleSelectedId = (id) => {
    setSelected(
      isIdSelected(selected, id)
        ? filterIdFromSelected(selected, id)
        : [...selected, id]
    );
  };

  const onFriendClick = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    toggleSelectedId(id);
  };
  const onFriendDragStart = (e: DragEvent<HTMLLIElement>, id: number) => {
    if (!isIdSelected) toggleSelectedId(id);
    e.dataTransfer.effectAllowed = "link";
    e.dataTransfer.setData("text/plain", selected.join(","));
    // e.dataTransfer.setDragImage()
  };

  return (
    <div className="flex content justify-between">
      <ul className="list flex-col space-y-3 w-1/4">
        {friends?.users.map(({ name, profile_image_url, id }) => (
          <FriendListItem
            key={id}
            id={id}
            onFriendDragStart={onFriendDragStart}
            onFriendClick={onFriendClick}
            profilImageUrl={profile_image_url}
            name={name}
            selected={selected.some((sId) => sId === id)}
          />
        ))}
      </ul>

      <ul className="list w-1/4">
        {lists.map(({ name, description, id }) => (
          <ListListItem key={id} name={name} description={description} />
        ))}
      </ul>
    </div>
  );
};

function ListListItem({ name, description }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <li
      className="flex py-3 place-items-center place-content-between transition-all ease-in-out"
      onDrop={(e) => {
        console.log({ drop: e });
        console.log(e.dataTransfer.getData("text/plain"));
        if (e.currentTarget.classList.contains("py-7"))
          e.currentTarget.classList.remove("py-7");
        e.stopPropagation();
        e.preventDefault();
      }}
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onDragEnter={(e) => {
        e.currentTarget.classList.add("py-7");
        e.stopPropagation();
      }}
      onDragLeave={(e) => {
        if (e.currentTarget.classList.contains("py-7"))
          e.currentTarget.classList.remove("py-7");
        e.stopPropagation();
      }}
    >
      <div className="space-y-1">
        {isEditing ? (
          <>
            <ListTitleInput title={name} />
            <ListDescriptionInput description={description} />
          </>
        ) : (
          <>
            <span className="text-lg font-bold">{name}</span>
            <span>{description}</span>
          </>
        )}
      </div>
      {isEditing ? (
        <button onClick={() => setIsEditing(false)}>save</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>edit</button>
      )}
    </li>
  );
}

type ListTitleInputProps = {
  title: string;
};
const ListTitleInput = ({ title }: ListTitleInputProps) => {
  const [value, setValue] = useState(title);

  return (
    <input
      name="title"
      placeholder="list name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="flex flex-row dark:bg-gray-600 dark:text-gray-100 p-1 rounded"
    />
  );
};

type ListDescriptionInputProps = {
  description: string;
};
const ListDescriptionInput = ({ description }: ListDescriptionInputProps) => {
  const [value, setValue] = useState(description);

  return (
    <textarea
      name="description"
      placeholder="list description"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="dark:bg-gray-600 dark:text-gray-100 p-1 rounded"
    />
  );
};

function filterIdFromSelected(selected: number[], id: number) {
  return selected.filter((sId) => sId !== id);
}

function isIdSelected(selected: number[], id: number) {
  return selected.some((selectedId) => selectedId === id);
}

export async function getServerSideProps() {
  const friends = await getFriends();
  const { screen_name: userScreenName } = await getUser();
  const lists = await (await getLists()).filter(
    ({ user: { screen_name } }) => screen_name === userScreenName
  );

  return {
    props: {
      friends,
      lists,
    },
  };
}
export default AppPage;

type FriendListItemProps = {
  id: number;
  onFriendDragStart: (e: DragEvent<HTMLLIElement>, id: number) => void;
  onFriendClick: (e: MouseEvent<HTMLButtonElement>, id: number) => void;
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
