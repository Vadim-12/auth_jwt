import { IUser } from "../models/IUser";
import {makeAutoObservable} from 'mobx'
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";
import {IPost} from "../models/IPost";

export default class Store {
	user = {} as IUser
	isAuth = false
	isLoading = false
	posts = [] as IPost[]
	users = [] as IUser[]
	error = ''

	constructor() {
		makeAutoObservable(this)
	}

	setAuth(value: boolean) {
		this.isAuth = value
	}

	setUser(user: IUser) {
		this.user = user
	}

	setLoading(value: boolean) {
		this.isLoading = value
	}

	setPosts(posts: IPost[]) {
		this.posts = posts
	}

	setUsers(users: IUser[]) {
		this.users = users
	}

	setError(error: string) {
		this.error = error
	}

	async login(email: string, password: string) {
		try {
			const response = await AuthService.login(email, password)
			console.log(response)
			localStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
		} catch (e: any) {
			this.setError(e.response?.data?.message)
			console.log(e.response?.data?.message)
		}
	}

	async registration(email: string, password: string) {
		try {
			const response = await AuthService.registration(email, password)
			console.log(response)
			localStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
		} catch (e: any) {
			this.setError(e.response?.data?.message)
			console.log(e.response?.data?.message)
		}
	}

	async logout() {
		try {
			const response = await AuthService.logout()
			console.log(response)
			localStorage.removeItem('token')
			this.setAuth(false)
			this.setUser({} as IUser)
		} catch (e: any) {
			this.setError(e.response?.data?.message)
			console.log(e.response?.data?.message)
		}
	}

	async checkAuth() {
		this.setLoading(true)
		try {
			const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
			console.log(response)
			localStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
			console.log(response.data)
		} catch (e: any) {
			this.setError(e.response?.data?.message)
			console.log(e.response?.data?.message)
		} finally {
			this.setLoading(false)
		}
	}
}