import { useListsQuery } from "graphql/queries/lists.graphql";
import ListListItem from "./ListListItem";

export default function ListList() {
  const { data } = useListsQuery();
  return (
    <ul className="overflow-scroll">
      {data?.lists?.map(({ id, slug }) => (
        <ListListItem key={id} id={id} slug={slug} />
      ))}
    </ul>
  );
}
