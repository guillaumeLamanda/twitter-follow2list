import { useState } from "react";
import { useListQuery } from "graphql/queries/list.graphql";
import ListForm from "./ListForm";

type ListListItemProps = {
  id: string;
  slug: string;
};
function ListListItem({ id, slug }: ListListItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { data, loading, error } = useListQuery({
    variables: { id, slug },
    fetchPolicy: "cache-first",
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;

  const {
    list: { name, description },
  } = data;

  if (isEditing)
    return (
      <li className="flex py-3 place-items-center place-content-between transition-all ease-in-out">
        <ListForm
          id={id}
          slug={slug}
          description={description}
          name={name}
          onSubmit={() => setIsEditing(false)}
        />
      </li>
    );

  return (
    <li
      className="flex py-3 place-items-center place-content-between transition-all ease-in-out space-x-3"
      onDrop={(e) => {
        if (e.currentTarget.classList.contains("py-7"))
          e.currentTarget.classList.remove("py-7");
        e.stopPropagation();
        e.preventDefault();
      }}
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onDragEnter={(e) => {
        e.currentTarget.classList.add("py-7");
        e.stopPropagation();
      }}
      onDragLeave={(e) => {
        if (e.currentTarget.classList.contains("py-7"))
          e.currentTarget.classList.remove("py-7");
        e.stopPropagation();
      }}
    >
      <div className="space-y-1 flex flex-col">
        <span className="text-lg font-bold">{name}</span>
        <span className="w-52">{description}</span>
      </div>

      <button onClick={() => setIsEditing(true)}>edit</button>
    </li>
  );
}

export default ListListItem;
