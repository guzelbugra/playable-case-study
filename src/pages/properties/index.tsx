import { FC, useEffect, useRef, useState } from "react";
import { store } from "../../store";
import { SELECT_OPTIONS } from "../../store/input-store";
import { observer } from "mobx-react-lite";
import Switch from "../../components/switch";
import TextInput from "../../components/text-input";
import SelectInput from "../../components/select-input";
import ImageInput from "../../components/image-input";

enum MessageType {
  Select = "Select",
  Switch = "Switch",
  Text = "Text",
  Image = "Image",
}

interface Message {
  messageType: MessageType;
  content: string | null;
}

export const Properties: FC<{}> = () => {
  const frameRef = useRef<HTMLIFrameElement>(null);

  // Adding event Listener to determine if the frame is loaded
  // iframe page pings when it is ready, so wen set default variables for preview
  useEffect(() => {
    const onFrameLoad = (event: any) => {
      setDefaultVariables();
    };
    window.addEventListener("message", onFrameLoad);
  }, []);

  const setDefaultVariables = () => {
    sendMessage({
      messageType: MessageType.Switch,
      content: "false",
    });
    sendMessage({
      messageType: MessageType.Select,
      content: SELECT_OPTIONS[0],
    });
    sendMessage({
      messageType: MessageType.Text,
      content: "",
    });
    sendMessage({
      messageType: MessageType.Image,
      content: null,
    });
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    store.inputStore.setTextInputValue(value);
    sendMessage({
      messageType: MessageType.Text,
      content: value,
    });
  };

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    store.inputStore.setSelectInputValue(value);
    sendMessage({ messageType: MessageType.Select, content: value });
  };

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const image = event.target.files[0];
      getBase64(image).then((base64) => {
        store.inputStore.setImageBase64(String(base64));
        sendMessage({
          messageType: MessageType.Image,
          content: String(base64),
        });
      });
    } else {
      store.inputStore.setImageBase64(undefined);
      sendMessage({
        messageType: MessageType.Image,
        content: null,
      });
    }
  };

  const getBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const onSwitchChange = () => {
    if (store.inputStore.switchInputValue) {
      store.inputStore.setSwitchInputValue(false);
      sendMessage({
        messageType: MessageType.Switch,
        content: String(false),
      });
    } else {
      store.inputStore.setSwitchInputValue(true);
      sendMessage({
        messageType: MessageType.Switch,
        content: String(true),
      });
    }
  };

  const sendMessage = (message: Message) => {
    frameRef.current?.contentWindow?.postMessage(
      { type: message.messageType, content: message.content },
      "*"
    );
  };

  return (
    <div className="block md:flex h-auto md:h-screen">
      <div className="w-full md:w-2/4 p-10">
        <div className="font-extrabold text-4xl mb-10">Properties</div>
        <div className="w-full md:w-3/4">
          <TextInput
            value={store.inputStore.textInputValue}
            onChange={onInputChange}
            placeHolder="Demo Text Input"
          />
        </div>
        <div className="w-full md:w-3/4 mt-6">
          <SelectInput
            value={store.inputStore.selectInputValue}
            options={SELECT_OPTIONS}
            onChange={onSelectChange}
          />
        </div>
        <div className="w-full md:w-3/4 mt-6">
          <ImageInput
            onChange={onImageChange}
            value={store.inputStore.imageBase64}
          />
        </div>
        <div className="w-full md:w-3/4 mt-6">
          <Switch
            value={store.inputStore.switchInputValue}
            onChange={onSwitchChange}
          />
        </div>
      </div>
      <div className="w-full md:w-2/4 p-10 flex items-center flex-col h-800 md:h-screen">
        <div className="font-extrabold text-4xl mb-10">Device Preview</div>
        <div className="relative w-10/12 h-3/4 flex items-center justify-center">
          <img
            className="w-full md:w-5/6 max-h-full object-contain"
            src={"/phone-image.png"}
          />
          <iframe
            className="w-full md:w-5/6 max-h-full absolute top-0 h-4/5 mt-0 lg:mt-10 xl:mt-10"
            ref={frameRef}
            src={process.env.REACT_APP_IFRAME_PATH}
            height={500}
            width={400}
          />
        </div>
      </div>
    </div>
  );
};

export default observer(Properties);
