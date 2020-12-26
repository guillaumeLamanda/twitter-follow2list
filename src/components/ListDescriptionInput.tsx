import { useField } from "formik";

type ListDescriptionInputProps = {
  name: string;
};
const ListDescriptionInput = ({ name }: ListDescriptionInputProps) => {
  const [inputProps] = useField(name);

  return (
    <textarea
      {...inputProps}
      placeholder="list description"
      className="dark:bg-gray-600 dark:text-gray-100 p-1 rounded"
    />
  );
};

export default ListDescriptionInput;
