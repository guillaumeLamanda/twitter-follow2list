import { FormikValues } from "formik";
import { useUpdateListMutation } from "graphql/mutations/updateList.graphql";
import {
  ListDocument,
  ListQuery,
  ListQueryVariables,
} from "graphql/queries/list.graphql";
import { ListMode } from "../../.cache/__types__";
import { useCallback } from "react";
import ListForm from "./ListForm";

export type ListFormUpdateProps = {
  id: string;
  slug: string;
  name: string;
  description: string;
  mode: ListMode;
  onSubmit: () => void;
  onCancel: () => void;
};

export default function ListFormUpdate({
  id,
  slug,
  name,
  description,
  mode,
  onSubmit: _onSubmit,
  ...props
}: ListFormUpdateProps) {
  const [updateList] = useUpdateListMutation({
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

  const onSubmit = useCallback(
    async (values: FormikValues) => {
      await updateList({
        variables: {
          input: {
            id,
            slug,
            mode: values.mode || mode,
            description: values.description,
            title: values.name,
          },
        },
      });
      _onSubmit();
    },
    [_onSubmit, id, mode, slug, updateList]
  );

  return (
    <ListForm
      onSubmit={onSubmit}
      name={name}
      description={description}
      mode={mode}
      {...props}
    />
  );
}
