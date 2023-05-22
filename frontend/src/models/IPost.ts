import {IUser} from "./IUser"

export interface IPost {
  id: string
  author: IUser
  text: string
  date: Date
}