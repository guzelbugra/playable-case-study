import { observer } from "mobx-react-lite";
import { FC } from "react";

type Props = {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
};

const SelectInput: FC<Props> = (props) => {
  const { value, options, onChange } = props;

  return (
    <div className="w-full">
      <label className="block tracking-wide text-gray-700 text-xs font-bold">
        Select Input Demo
      </label>
      <div className="relative">
        <select
          className="block appearance-none w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight border-2 border-gray-300 outline-none focus:outline-none focus:border-purple-600 hover:border-purple-600 text-sm cursor-pointer"
          value={value}
          defaultValue={options[0]}
          onChange={onChange}
        >
          {options.map((o) => (
            <option value={o}>{o}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default observer(SelectInput);
