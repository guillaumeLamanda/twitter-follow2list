import { useListsQuery } from "graphql/queries/lists.graphql";
import { ListFormAdd } from "./ListFormAdd";
import ListListItem from "./ListListItem";

export default function ListList() {
  const { data } = useListsQuery();
  return (
    <ul>
      {data?.lists?.map(({ id, slug }) => (
        <ListListItem key={id} id={id} slug={slug} />
      ))}
      <ListFormAdd />
    </ul>
  );
}
