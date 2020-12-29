import MoveToListButton from "./MoveToListButton";
import SettingsButton from "./SettingsButton";

export default function ActionButton() {
  return (
    <div className="fixed right-10 bottom-10 flex flex-col space-y-5">
      <SettingsButton />
      <MoveToListButton />
    </div>
  );
}
