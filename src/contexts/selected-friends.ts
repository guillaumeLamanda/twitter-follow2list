import { createContext, useContext } from "react";

type SelectedFriendsContextType = {
  friends: string[];
  toggle: (id: string) => void;
};

const SelectedFriendsContext = createContext<SelectedFriendsContextType>({
  friends: [],
  toggle: () => {},
});

export function filterIdFromSelected(selected: string[], id: string) {
  return selected.filter((sId) => sId !== id);
}

export function isIdSelected(selected: string[], id: string) {
  return selected.some((selectedId) => selectedId === id);
}

export const useSelectedFriends = () => {
  return useContext(SelectedFriendsContext);
};

export default SelectedFriendsContext;
