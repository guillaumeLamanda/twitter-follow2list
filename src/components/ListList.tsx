import { useListsQuery } from "graphql/queries/lists.graphql";
import { useState } from "react";
import ListForm from "./ListForm";
import ListListItem from "./ListListItem";

function AddList() {
  const [editing, setEditing] = useState(false);

  // if(editing) return <ListForm />

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

export default function ListList() {
  const { data } = useListsQuery();
  return (
    <ul>
      {data?.lists?.map(({ id, slug }) => (
        <ListListItem key={id} id={id} slug={slug} />
      ))}
      <AddList />
    </ul>
  );
}
