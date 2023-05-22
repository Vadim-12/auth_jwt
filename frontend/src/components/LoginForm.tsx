import React, {FC, useContext, useState} from "react"
import { Context } from ".."
import { observer } from "mobx-react-lite"

const LoginForm: FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const {store} = useContext(Context)

	return (
		<div className='auth-form'>
			<input
				onChange={e => setEmail(e.target.value)}
				value={email}
				type="text"
				placeholder="email"
			/>
			<input
				onChange={e => setPassword(e.target.value)}
				value={password}
				type="password"
				placeholder="Пароль"
			/>
			<div className='auth-btns'>
				<button onClick={() => store.login(email, password)}>
					Вход
				</button>
				<button onClick={() => store.registration(email, password)}>
					Регистрация
				</button>
			</div>
			{store.error && (
				<p className='auth-error'>{store.error}</p>
			)}
		</div>
	)
}

export default observer(LoginForm)