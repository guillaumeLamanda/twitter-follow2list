import { GetServerSideProps, NextPage } from "next";
import WithApolloClient from "graphql/withApollo";
import { initializeApollo } from "graphql/apollo";
import FriendList from "components/FriendList";
import { useState } from "react";
import SelectedFriendsContext, {
  filterIdFromSelected,
  isIdSelected,
} from "contexts/selected-friends";
import SettingsContext, { initialState, Setting } from "contexts/settings";
import ActionButton from "components/ActionButtons";
import UnfollowButton from "components/UnfollowButton";

const AppPage: NextPage = () => {
  const [selectedFriends, setSelectedFriends] = useState<Array<string>>([]);

  const toggleSelectedId = (id) => {
    setSelectedFriends(
      isIdSelected(selectedFriends, id)
        ? filterIdFromSelected(selectedFriends, id)
        : [...selectedFriends, id]
    );
  };

  const resetSelectedFriends = () => {
    setSelectedFriends([]);
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
        reset: resetSelectedFriends,
      }}
    >
      <SettingsContext.Provider
        value={{
          settings,
          update: updateSetting,
        }}
      >
        <div className="mx-10">
          <div className="pt-10 space-y-5 inline-flex flex-col">
            <span className="dark:text-gray-100 font-bold text-center text-xl">
              Choose user(s) to put in a list
            </span>
            <div className="max-h-75-vh overflow-y-auto">
              <FriendList />
            </div>
            <UnfollowButton />
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
