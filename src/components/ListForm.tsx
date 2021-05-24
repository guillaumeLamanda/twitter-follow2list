import { FormikConfig, FormikProvider, useFormik } from "formik";
import ListDescriptionInput from "./ListDescriptionInput";
import ListModeInput from "./ListModeInput";
import ListTitleInput from "./ListTitleInput";
import { ListMode } from "../../.cache/__types__";

export interface FormValues {
  name: string;
  description: string;
  mode: ListMode;
}

type ListFormProps = {
  name: string;
  description: string;
  mode: ListMode;
  onSubmit: FormikConfig<FormValues>["onSubmit"];
  onCancel: () => void;
};

const ListForm = ({
  name,
  description,
  mode,
  onSubmit,
  onCancel,
}: ListFormProps) => {
  const form = useFormik<FormValues>({
    initialValues: {
      name,
      description,
      mode,
    },
    onSubmit,
  });

  return (
    <FormikProvider value={form}>
      <form className="space-x-2 inline-flex" onSubmit={form.handleSubmit}>
        <div className="space-y-1">
          <ListTitleInput name="name" />
          <ListDescriptionInput name="description" />
          <ListModeInput />
        </div>
        <div className="flex flex-col space-y-2 justify-around">
          <button
            className="py-1 px-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            type="submit"
            disabled={form.isSubmitting}
          >
            save
          </button>
          <button
            className="py-1 px-2 focus:ring-red-500 focus:ring-offset-red-200 text-white hover:text-pink-600 w-full transition ease-in duration-200 text-center text-base font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            disabled={form.isSubmitting}
            onClick={onCancel}
          >
            cancel
          </button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default ListForm;
