import { observable } from "mobx";
import InputStore from "./input-store";

export default class Store {
  @observable inputStore: InputStore;

  constructor() {
    this.inputStore = new InputStore();
  }
}

export const store = new Store();
