import { createContext, useContext } from "react";

export interface Setting {
  name: string;
  description: string;
  status: boolean;
}

export type SettingsContextType = {
  settings: Array<Setting>;
  update: (name: string, status: boolean) => void;
};

export const initialState: Array<Setting> = [
  {
    name: "Unfollow",
    description: "Unfollow friend(s) when added in a list",
    status: false,
  },
];

const SettingsContext = createContext<SettingsContextType>({
  settings: initialState,
  update: () => {},
});

export const useSettings = () => {
  return useContext(SettingsContext);
};

export default SettingsContext;
