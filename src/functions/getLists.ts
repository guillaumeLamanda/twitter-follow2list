import getClient from "./getClient";

export default function getLists() {
  const client = getClient();
  return client.accountsAndUsers.listsList();
}
