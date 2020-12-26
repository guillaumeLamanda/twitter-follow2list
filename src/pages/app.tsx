import { NextPage } from "next";
import { FriendsList, ListsList } from "twitter-api-client";
import { DragEvent, MouseEvent, useState } from "react";
import WithApolloClient from "graphql/withApollo";
import { initializeApollo } from "graphql/apollo";
import {
  FriendsDocument,
  FriendsQuery,
  FriendsQueryVariables,
  useFriendsQuery,
} from "graphql/queries/friends.graphql";
import { useListQuery } from "graphql/queries/lists.graphql";
import { FriendListItem, ListListItem } from "components";

const PAGE_SIZE = 15;

type Props = {
  friends: FriendsList;
  lists: ListsList[];
};
const AppPage: NextPage<Props> = () => {
  const [selected, setSelected] = useState<Array<string>>([]);

  const { data: { friends } = {} } = useFriendsQuery({
    variables: { first: PAGE_SIZE },
  });
  const { data: { lists } = {} } = useListQuery();

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
    // e.dataTransfer.setDragImage()
  };

  return (
    <div className="flex content justify-between">
      <ul className="list flex-col space-y-3 w-1/4">
        {friends?.map(({ name, imageSrc, id }) => (
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
      </ul>

      <ul className="list w-1/4">
        {lists?.map(({ name, description, id }) => (
          <ListListItem key={id} name={name} description={description} />
        ))}
      </ul>
    </div>
  );
};

function filterIdFromSelected(selected: string[], id: string) {
  return selected.filter((sId) => sId !== id);
}

function isIdSelected(selected: string[], id: string) {
  return selected.some((selectedId) => selectedId === id);
}

export const getStaticProps = async () => {
  const client = initializeApollo();

  await client.query<FriendsQuery, FriendsQueryVariables>({
    query: FriendsDocument,
    variables: { first: PAGE_SIZE },
  });

  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
  };
};

export default WithApolloClient(AppPage);
