import { useState } from "react";

type ListDescriptionInputProps = {
  description: string;
};
const ListDescriptionInput = ({ description }: ListDescriptionInputProps) => {
  const [value, setValue] = useState(description);

  return (
    <textarea
      name="description"
      placeholder="list description"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="dark:bg-gray-600 dark:text-gray-100 p-1 rounded"
    />
  );
};

export default ListDescriptionInput;
