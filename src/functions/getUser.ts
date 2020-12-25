import getClient from "./getClient";

export default function getUser() {
  const client = getClient();
  return client.accountsAndUsers.accountSettings();
}
