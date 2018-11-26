import { Deserializable } from "./Deserializable.modal";

export class Book {
  id: number;
  image: string;
  title: string;
  author: string;
  status :string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
