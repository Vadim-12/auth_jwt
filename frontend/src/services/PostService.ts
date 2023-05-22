import { AxiosResponse } from "axios";
import $api from "../http";
import { IPost } from "../models/IPost";

export default class PostService {
  static fetchPosts(): Promise<AxiosResponse<IPost[]>> {
    return $api.get<IPost[]>('/posts')
  }

  static createPost(authorId: string, text: string): Promise<AxiosResponse<IPost>> {
    return $api.post<IPost>('/posts', {
      authorId,
      text
    })
  }

  static updatePost(postId: string, text: string): Promise<AxiosResponse<IPost>> {
    return $api.put<IPost>(`/posts/${postId}`, {
      text
    })
  }

  static deletePost(postId: string): Promise<AxiosResponse<IPost>> {
    return $api.delete(`/posts/${postId}`)
  }
}