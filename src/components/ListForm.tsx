import { FormikProvider, useFormik } from "formik";
import { useUpdateListMutation } from "graphql/mutations/updateList.graphql";
import {
  ListDocument,
  ListQuery,
  ListQueryVariables,
} from "graphql/queries/list.graphql";
import ListDescriptionInput from "./ListDescriptionInput";
import ListTitleInput from "./ListTitleInput";

type ListFormProps = {
  id: string;
  slug: string;
  name: string;
  description: string;
  onSubmit: () => void;
};
const ListForm = ({ id, slug, name, description, onSubmit }: ListFormProps) => {
  const [updateList] = useUpdateListMutation();
  const form = useFormik<{ name: string; description: string }>({
    initialValues: {
      name,
      description,
    },
    onSubmit: async (values) => {
      updateList({
        variables: {
          input: {
            id,
            slug,
            description: values.description,
            title: values.name,
          },
        },
        optimisticResponse: ({ input }) => ({
          updateList: {
            ...input,
            name: input.title || name,
            description: input.description || description,
            __typename: "UserList",
          },
          __typename: "Mutation",
        }),
        update: (cache, result) => {
          if (result.errors?.length) return;
          console.log({ result });
          cache.writeQuery<ListQuery, ListQueryVariables>({
            query: ListDocument,
            variables: {
              id,
              slug,
            },
            data: {
              list: result.data?.updateList,
              __typename: "Query",
            },
          });
        },
      });
      onSubmit();
    },
  });

  return (
    <FormikProvider value={form}>
      <div className="space-y-1">
        <ListTitleInput name="name" />
        <ListDescriptionInput name="description" />
      </div>
      <button disabled={form.isSubmitting} onClick={form.submitForm}>
        save
      </button>
    </FormikProvider>
  );
};

export default ListForm;
