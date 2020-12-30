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
        <div className="mx-5">
          <ListList />
        </div>
      )}
      <button
        className="p-3 rounded-full bg-red-700 font-semibold text-sm text-gray-100"
        onClick={toggleExpended}
      >
        Ajouter à une liste
      </button>
    </>
  );
}
