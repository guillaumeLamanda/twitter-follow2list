import { useState } from "react";
import ListDescriptionInput from "./ListDescriptionInput";
import ListTitleInput from "./ListTitleInput";

function ListListItem({ name, description }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <li
      className="flex py-3 place-items-center place-content-between transition-all ease-in-out"
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
      <div className="space-y-1">
        {isEditing ? (
          <>
            <ListTitleInput title={name} />
            <ListDescriptionInput description={description} />
          </>
        ) : (
          <>
            <span className="text-lg font-bold">{name}</span>
            <span>{description}</span>
          </>
        )}
      </div>
      {isEditing ? (
        <button onClick={() => setIsEditing(false)}>save</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>edit</button>
      )}
    </li>
  );
}

export default ListListItem;
