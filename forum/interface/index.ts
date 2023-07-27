import { ObjectId } from "mongodb";

export interface I_postListItem {
  _id: ObjectId;
  title: string;
  content: string;
}
