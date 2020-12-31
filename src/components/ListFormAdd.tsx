import { FormikValues } from "formik";
import { useCreateListMutation } from "graphql/mutations/createList.graphql";
import {
  ListsDocument,
  ListsQuery,
  ListsQueryVariables,
} from "graphql/queries/lists.graphql";
import { useState } from "react";
import ListForm from "./ListForm";

export function ListFormAdd() {
  const [editing, setEditing] = useState(false);

  const hideForm = () => setEditing(false);
  const [createList] = useCreateListMutation({
    update: (cache, result) => {
      if (!result.data) return;
      const data = cache.readQuery<ListsQuery, ListsQueryVariables>({
        query: ListsDocument,
      });

      cache.writeQuery<ListsQuery, ListsQuery>({
        query: ListsDocument,
        data: {
          __typename: "Query",
          lists: [result.data.createList, ...data.lists],
        },
      });
    },
  });

  const onSubmit = async (values: FormikValues) => {
    await createList({
      variables: {
        input: {
          title: values.name,
          description: values.description,
        },
      },
    });
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
