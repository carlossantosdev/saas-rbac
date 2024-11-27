'use client'

import { Separator } from '@radix-ui/react-separator'
import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCustomFormState } from '@/hooks/use-custom-form-state'

// import { useActionState } from 'react'
import githubIcon from '../../../assets/icons/github-icon.svg'
import { signInWithGithub } from '../actions'
import { signInWithPasswordAction } from './actions'

export function SignInForm() {
  // const [formState, formAction, isPending] = useActionState(
  //   signInWithPasswordAction,
  //   { success: true, message: null, errors: null },
  // )

  const router = useRouter()
  const searchParams = useSearchParams()

  const [formState, handleSubmit, isPending] = useCustomFormState(
    signInWithPasswordAction,
    undefined,
    () => {
      router.push('/')
    },
  )

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleSubmit}
        /* action={formAction} */
        className="space-y-4"
      >
        {formState.success === false && formState.message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed!</AlertTitle>
            <AlertDescription>
              <p>{formState.message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input
            name="email"
            type="email"
            id="email"
            defaultValue={searchParams.get('email') ?? ''}
          />
          {formState.errors?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {formState.errors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" id="password" />
          {formState.errors?.password && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {formState.errors.password[0]}
            </p>
          )}

          <Link
            href="/auth/forgot-password"
            className="text-xs font-medium text-foreground hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Sign in with e-mail'
          )}
        </Button>

        <Button className="w-full" variant="link" asChild size="sm">
          <Link href="/auth/sign-up">Create new account</Link>
        </Button>
      </form>

      <Separator />

      <form action={signInWithGithub}>
        <Button type="submit" className="w-full" variant="outline">
          <Image
            src={githubIcon}
            className="mr-2 size-4 dark:invert"
            alt="Github Icon"
            title="Github Icon"
          />
          Sign in with Github
        </Button>
      </form>
    </div>
  )
}
