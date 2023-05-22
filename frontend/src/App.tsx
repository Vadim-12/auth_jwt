import React, { useContext, useEffect, useState } from 'react'
import './styles/index.scss'
import LoginForm from './components/LoginForm'
import { Context } from '.'
import { observer } from 'mobx-react-lite'
import { IUser } from './models/IUser'
import UserService from './services/UserService'
import PostService from "./services/PostService";
import {IPost} from "./models/IPost";
import Loader from "./components/Loader";

function App() {
  const {store} = useContext(Context)
  const [text, setText] = useState<string>('')

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  async function getPosts() {
    try {
      const postsResponse = await PostService.fetchPosts()
      store.setPosts(postsResponse.data)
      const usersResponse = await UserService.fetchUsers()
      store.setUsers(usersResponse.data)
    } catch (e) {
      console.log(e)
    }
  }

  async function createPost() {
    try {
      const payload = {
        text,
        authorId: store.user.id
      }
      const response = await PostService.createPost(store.user.id, text)
      store.setPosts([...store.posts, response.data])
    } catch (e) {
      console.log(e)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setText('')
    await createPost()
  }

  if (store.isLoading) {
    return <Loader/>
  }

  if (!store.isAuth) {
    return (
      <div className='auth-wrapper'>
        <LoginForm/>
      </div>
    )
  }

  return (
    <div className='container'>
      <h1>{`Пользователь авторизован ${store.user.email}`}</h1>
      <p>{store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'ПОДТВЕРДИТЕ АККАУНТ!!!'}</p>
      <div className='ui-btns'>
        <button onClick={() => store.logout()}>Выйти</button>
        <button onClick={getPosts}>Загрузить посты</button>
      </div>
      <div className='posts-block'>
        <form className='create-post-form' onSubmit={handleSubmit}>
          <textarea value={text} onChange={e => setText(e.target.value)}/>
          <button type='submit'>Отправить</button>
        </form>
        <ul className='posts'>
          {
            store.posts.map(post => {
              const user = store.users.find(user => user.id === post.author.id)
              return (
                <li key={post.id} className='post'>
                  <h2 className='post-author'>
                    <span className='prop-name'>Автор</span>: {user?.email}
                  </h2>
                  <div className='post-date'>
                    <span className='prop-name'>Дата</span>: {post.date.toString()}
                  </div>
                  <div className='post-content'>
                    {post.text}
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default observer(App)