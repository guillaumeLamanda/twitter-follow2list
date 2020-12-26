import { useState } from "react";

type ListTitleInputProps = {
  title: string;
};
const ListTitleInput = ({ title }: ListTitleInputProps) => {
  const [value, setValue] = useState(title);

  return (
    <input
      name="title"
      placeholder="list name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="flex flex-row dark:bg-gray-600 dark:text-gray-100 p-1 rounded"
    />
  );
};

export default ListTitleInput;
