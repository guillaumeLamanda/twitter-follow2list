import { useCallback, useMemo, useState } from "react";
import { useListQuery } from "graphql/queries/list.graphql";
import ListForm from "./ListForm";
import { useSelectedFriends } from "contexts/selected-friends";
import { useAddFriendsToListMutation } from "graphql/mutations/addFriendsToList.graphql";
import { FriendsDocument } from "graphql/queries/friends.graphql";
import { useSettings } from "contexts/settings";

type ListListItemProps = {
  id: string;
  slug: string;
};
function ListListItem({ id, slug }: ListListItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { data, loading, error } = useListQuery({
    variables: { id, slug },
    fetchPolicy: "cache-first",
  });
  const { friends: friendsIds } = useSelectedFriends();
  const { settings } = useSettings();
  const unfollow = useMemo(
    () => settings.find(({ name }) => name === "Unfollow").status,
    [settings]
  );
  const [addFriendsToList] = useAddFriendsToListMutation({
    variables: {
      input: {
        friendsIds,
        listId: id,
        unfollow,
      },
    },
    update: (cache) => {
      if (unfollow)
        friendsIds.forEach((friendId) => {
          cache.evict({
            id: `User:${friendId}`,
          });
        });
    },
    optimisticResponse: {
      addFriendsToList: {
        id,
        __typename: "UserList",
      },
    },
  });

  const onClick = useCallback(async () => {
    await addFriendsToList();
  }, []);

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;

  const {
    list: { name, description },
  } = data;

  if (isEditing)
    return (
      <li className="flex py-3 place-items-center place-content-between transition-all ease-in-out">
        <ListForm
          id={id}
          slug={slug}
          description={description}
          name={name}
          onSubmit={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      </li>
    );

  return (
    <li
      className="flex py-3 place-items-center place-content-between transition-all ease-in-out space-x-3"
      onDrop={async (e) => {
        if (e.currentTarget.classList.contains("py-7"))
          e.currentTarget.classList.remove("py-7");
        e.stopPropagation();
        e.preventDefault();
        await addFriendsToList();
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
      <div className="space-y-1 flex flex-col cursor-pointer" onClick={onClick}>
        <span className="text-lg font-bold">{name}</span>
        <span className="w-52">{description}</span>
      </div>

      <button onClick={() => setIsEditing(true)}>edit</button>
    </li>
  );
}

export default ListListItem;
