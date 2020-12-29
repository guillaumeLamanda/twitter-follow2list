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
import SettingsContext, { initialState, Setting } from "contexts/settings";
import ActionButton from "components/ActionButtons";

const AppPage: NextPage = () => {
  const [selectedFriends, setSelectedFriends] = useState<Array<string>>([]);

  const toggleSelectedId = (id) => {
    setSelectedFriends(
      isIdSelected(selectedFriends, id)
        ? filterIdFromSelected(selectedFriends, id)
        : [...selectedFriends, id]
    );
  };

  const [settings, setSettings] = useState<Array<Setting>>(initialState);
  const updateSetting = (name: string, status: boolean) => {
    setSettings(
      settings.map((setting) =>
        setting.name === name
          ? {
              ...setting,
              status,
            }
          : setting
      )
    );
  };

  return (
    <SelectedFriendsContext.Provider
      value={{
        friends: selectedFriends,
        toggle: toggleSelectedId,
      }}
    >
      <SettingsContext.Provider
        value={{
          settings,
          update: updateSetting,
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
        <ActionButton />
      </SettingsContext.Provider>
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
