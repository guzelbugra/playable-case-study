import { observer } from "mobx-react-lite";
import { FC } from "react";

type Props = {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
};

const TextInput: FC<Props> = (props) => {
  const { value, placeHolder, onChange } = props;

  return (
    <div>
      <label className="block tracking-wide text-gray-700 text-xs font-bold">
        Text Input Demo
      </label>
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder={placeHolder || ""}
        className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border-2 border-gray-300 outline-none focus:outline-none focus:border-purple-600 hover:border-purple-600 w-full"
      />
    </div>
  );
};
export default observer(TextInput);
