import { GetServerSideProps, NextPage } from "next";
import WithApolloClient from "graphql/withApollo";
import { initializeApollo } from "graphql/apollo";
import FriendList from "components/FriendList";
import { useState } from "react";
import SelectedFriendsContext, {
  filterIdFromSelected,
  isIdSelected,
} from "contexts/selected-friends";
import MoveToListButton from "components/MoveToListButton";

const AppPage: NextPage = () => {
  const [selectedFriends, setSelectedFriends] = useState<Array<string>>([]);

  const toggleSelectedId = (id) => {
    setSelectedFriends(
      isIdSelected(selectedFriends, id)
        ? filterIdFromSelected(selectedFriends, id)
        : [...selectedFriends, id]
    );
  };

  return (
    <SelectedFriendsContext.Provider
      value={{
        friends: selectedFriends,
        toggle: toggleSelectedId,
      }}
    >
      <div className="flex justify-around">
        <div className="my-10">
          <span className="dark:text-gray-100 font-bold text-center mb-10">
            Choose user(s) to put in a list
          </span>
          <FriendList />
        </div>
      </div>
      <MoveToListButton />
    </SelectedFriendsContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const client = initializeApollo();

  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
  };
};

export default WithApolloClient(AppPage);
