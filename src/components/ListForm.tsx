import { FormikProvider, useFormik } from "formik";
import { useUpdateListMutation } from "graphql/mutations/updateList.graphql";
import {
  ListDocument,
  ListQuery,
  ListQueryVariables,
} from "graphql/queries/list.graphql";
import { useCallback } from "react";
import ListDescriptionInput from "./ListDescriptionInput";
import ListTitleInput from "./ListTitleInput";

type ListFormProps = {
  id: string;
  slug: string;
  name: string;
  description: string;
  onSubmit: () => void;
  onCancel: () => void;
};

// export function ListFormUpdate({ id, slug, name, description }: ListFormProps) {
//   const [updateList] = useUpdateListMutation();

//   const onSubmit = useCallback(async (values) => {
//     updateList({
//       variables: {
//         input: {
//           id,
//           slug,
//           description: values.description,
//           title: values.name,
//         },
//       },
//       optimisticResponse: ({ input }) => ({
//         updateList: {
//           ...input,
//           name: input.title || name,
//           description: input.description || description,
//           __typename: "UserList",
//         },
//         __typename: "Mutation",
//       }),
//       update: (cache, result) => {
//         if (result.errors?.length) return;
//         cache.writeQuery<ListQuery, ListQueryVariables>({
//           query: ListDocument,
//           variables: {
//             id,
//             slug,
//           },
//           data: {
//             list: result.data?.updateList,
//             __typename: "Query",
//           },
//         });
//       },
//     });
//   }, []);

//   return <ListForm onSubmit={onSubmit} onCancel name description />;
// }

const ListForm = ({
  id,
  slug,
  name,
  description,
  onSubmit,
  onCancel,
}: ListFormProps) => {
  const form = useFormik<{ name: string; description: string }>({
    initialValues: {
      name,
      description,
    },
    onSubmit,
  });

  return (
    <FormikProvider value={form}>
      <div className="space-x-2 inline-flex">
        <div className="space-y-1">
          <ListTitleInput name="name" />
          <ListDescriptionInput name="description" />
        </div>
        <div className="flex flex-col space-y-2 justify-around">
          <button
            className="py-1 px-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            disabled={form.isSubmitting}
            onClick={form.submitForm}
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
      </div>
    </FormikProvider>
  );
};

export default ListForm;
