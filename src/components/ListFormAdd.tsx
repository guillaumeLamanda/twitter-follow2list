import { FormikValues } from "formik";
import { useState } from "react";
import ListForm from "./ListForm";

export function ListFormAdd() {
  const [editing, setEditing] = useState(false);

  const hideForm = () => setEditing(false);

  const onSubmit = (values: FormikValues) => {
    console.log(values);
  };

  if (editing)
    return (
      <ListForm
        description=""
        name=""
        onCancel={hideForm}
        onSubmit={onSubmit}
      />
    );
  return (
    <button
      className="primary-button"
      onClick={() => {
        setEditing(true);
      }}
    >
      create new list
    </button>
  );
}
