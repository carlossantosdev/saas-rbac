export interface SignInWithPasswordBody {
  email: string
  password: string
}

export interface SignInWithPasswordResponse200 {
  token: string
}
