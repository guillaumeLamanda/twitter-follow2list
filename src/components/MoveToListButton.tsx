import { ListList } from "components";
import { useSelectedFriends } from "contexts/selected-friends";
import { useState } from "react";

export default function MoveToListButton() {
  const { friends } = useSelectedFriends();
  const [expended, setExpended] = useState(false);
  const toggleExpended = () => {
    setExpended(!expended);
  };

  if (!friends.length) return null;

  return (
    <>
      {expended && (
        <div className="h-1/3 overflow-scroll">
          <ListList />
        </div>
      )}
      <button
        className="p-5 rounded-full bg-red-700 font-semibold text-gray-100"
        onClick={toggleExpended}
      >
        Ajouter à une liste
      </button>
    </>
  );
}
