import { useField } from "formik";

export default function ListModeInput() {
  const [{ name, onChange, value }] = useField("mode");

  return (
    <div className="space-x-3 flex flex-row justify-between">
      <label className="dark:text-gray-400">Mode</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="dark:bg-gray-600 dark:text-gray-100 p-1 rounded"
      >
        <option value="private" label="Private" />
        <option value="public" label="Public" />
      </select>
    </div>
  );
}
