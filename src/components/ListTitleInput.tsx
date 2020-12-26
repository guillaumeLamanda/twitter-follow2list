import { useField } from "formik";

type ListTitleInputProps = {
  name: string;
};
const ListTitleInput = ({ name }: ListTitleInputProps) => {
  const [fieldInputProps] = useField(name);
  return (
    <input
      {...fieldInputProps}
      placeholder="list name"
      className="flex flex-row dark:bg-gray-600 dark:text-gray-100 p-1 rounded"
    />
  );
};

export default ListTitleInput;
