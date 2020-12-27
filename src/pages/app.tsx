import { GetServerSideProps, NextPage } from "next";
import { DragEvent, MouseEvent, useState } from "react";
import WithApolloClient from "graphql/withApollo";
import { initializeApollo } from "graphql/apollo";
import { useFriendsQuery } from "graphql/queries/friends.graphql";
import { useListsQuery } from "graphql/queries/lists.graphql";
import { FriendListItem, ListListItem } from "components";

const PAGE_SIZE = 15;

const AppPage: NextPage = () => {
  const [selected, setSelected] = useState<Array<string>>([]);

  const {
    data: { friends } = {},
    fetchMore,
    variables: currentFriendsVariables,
  } = useFriendsQuery({
    variables: { first: PAGE_SIZE },
  });
  const { data: { lists } = {} } = useListsQuery();

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
    <div className="flex content justify-between">
      <ul className="list space-y-3 w-1/4">
        {friends?.nodes.map(({ name, imageSrc, id }) => (
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
          onClick={() => {
            fetchMore({
              variables: {
                after: friends.nextCursor,
                first: PAGE_SIZE,
              },
            });
          }}
        >
          load more
        </button>
      </ul>

      <ul className="list w-1/4">
        {lists?.map(({ id, slug }) => (
          <ListListItem key={id} id={id} slug={slug} />
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

export const getServerSideProps: GetServerSideProps = async () => {
  const client = initializeApollo();

  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
  };
};

export default WithApolloClient(AppPage);
