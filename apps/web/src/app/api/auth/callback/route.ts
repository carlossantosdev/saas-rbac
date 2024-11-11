import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { signInWithGithubRequest } from '@/http/requests/sign-in-with-github-request'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { message: 'Github OAuth code was not found.' },
      { status: 400 },
    )
  }

  const { token } = await signInWithGithubRequest({ code })

  ;(await cookies()).set('token', token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = '/'
  redirectUrl.search = ''

  return NextResponse.redirect(redirectUrl)
}
