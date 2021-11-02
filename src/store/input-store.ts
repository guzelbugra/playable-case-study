import { makeAutoObservable, observable } from "mobx";

export const SELECT_OPTIONS = ["Option 1", "Option 2", "Option 3", "Option 4"];

export default class FrameStore {
  @observable selectInputValue?: string;
  @observable switchInputValue: boolean;
  @observable textInputValue: string;
  @observable imageBase64?: string;

  constructor() {
    this.switchInputValue = false;
    this.selectInputValue = SELECT_OPTIONS[0];
    this.textInputValue = "";
    makeAutoObservable(this);
  }

  setSelectInputValue = (value: string) => {
    this.selectInputValue = value;
  };

  setSwitchInputValue = (value: boolean) => {
    this.switchInputValue = value;
  };

  setTextInputValue = (value: string) => {
    this.textInputValue = value;
  };

  setImageBase64 = (value: string | undefined) => {
    this.imageBase64 = value;
  };
}
