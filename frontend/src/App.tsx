import React, { useContext, useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import { Context } from '.'
import { observer } from 'mobx-react-lite'
import { IUser } from './models/IUser'
import UserService from './services/UserService'
import PostService from "./services/PostService";
import {IPost} from "./models/IPost";

function App() {
  const {store} = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])
  const [posts, setPosts] = useState<IPost[]>([])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  async function getPosts() {
    try {
      const postsResponse = await PostService.fetchPosts()
      setPosts(postsResponse.data)
      const usersResponse = await UserService.fetchUsers()
      setUsers(usersResponse.data)
    } catch (e) {
      console.log(e)
    }
  }

  if (store.isLoading) {
    return <div>Загрузка...</div>
  }

  if (!store.isAuth) {
    return <LoginForm/>
  }

  return (
    <div>
      <h1>{`Пользователь авторизован ${store.user.email}`}</h1>
      <h1>{store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'ПОДТВЕРДИТЕ АККАУНТ!!!'}</h1>
      <button onClick={() => store.logout()}>Выйти</button>
      <div>
        <button onClick={getPosts}>Загрузить посты</button>
        <ul>
          {
            posts.map(post => {
              const user = users.find(user => user.id === post.author.id)
              return (
                <li key={post.id}>{`${post.date} - ${user ? user.email : ''} - ${post.text}`}</li>
              )

            })
          }
        </ul>
      </div>
    </div>
  )
}

export default observer(App)