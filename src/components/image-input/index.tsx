import { observer } from "mobx-react-lite";
import { FC, useRef } from "react";

type Props = {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageInput: FC<Props> = (props) => {
  const { value, onChange } = props;
  const ref = useRef<HTMLInputElement>(null);

  const onCLickImage = () => {
    ref.current?.click();
  };

  return (
    <div>
      <label className="block tracking-wide text-gray-700 text-xs font-bold">
        Image Input Demo
      </label>
      <img
        className="cursor-pointer border-2 border-transparent hover:border-purple-600"
        src={value ? value : "/empty-image.png"}
        onClick={onCLickImage}
      />

      <input
        ref={ref}
        type="file"
        hidden
        onChange={onChange}
        accept="image/*"
      />
    </div>
  );
};
export default observer(ImageInput);
