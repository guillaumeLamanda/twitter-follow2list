import { useSettings } from "contexts/settings";
import { useState } from "react";

export default function SettingsButton() {
  const [expended, setExpended] = useState(false);
  const toggleExpended = () => {
    setExpended(!expended);
  };

  const { settings, update } = useSettings();

  return (
    <>
      {expended && (
        <ul>
          {settings.map(({ name, description, status }) => (
            <li key={name} className="flex flex-row space-x-3 items-center">
              <input
                type="checkbox"
                checked={status}
                onClick={() => {
                  update(name, !status);
                }}
              />
              <div className="flex flex-col">
                <span className="font-bold">{name}</span>
                <span>{description}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        className="p-5 rounded-full bg-blue-700 font-semibold text-gray-100 transform duration-200 ease-in-out"
        onClick={toggleExpended}
      >
        Settings
      </button>
    </>
  );
}
