import { observer } from "mobx-react-lite";
import { FC } from "react";

type Props = {
  value: boolean;
  onChange: () => void;
};

const Switch: FC<Props> = (props) => {
  const { value, onChange } = props;

  return (
    <div>
      <label className="block tracking-wide text-gray-700 text-xs font-bold mb-3">
        Switch Input Demo
      </label>
      <div
        className={`w-14 h-7 flex items-center rounded-full px-1 cursor-pointer transition-transform ${
          value ? "bg-purple-600" : "bg-gray-300"
        }`}
        onClick={onChange}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
            value ? "translate-x-7" : ""
          }`}
        ></div>
      </div>
    </div>
  );
};
export default observer(Switch);
