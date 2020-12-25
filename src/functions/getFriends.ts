import getClient from "./getClient";

const getFriends = () => {
  const client = getClient();
  return client.accountsAndUsers.friendsList();
};

export default getFriends;
