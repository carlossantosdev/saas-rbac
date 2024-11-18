'use client'

import { Separator } from '@radix-ui/react-separator'
import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import githubIcon from '@/assets/icons/github-icon.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCustomFormState } from '@/hooks/use-custom-form-state'

import { signInWithGithub } from '../actions'
import { signUpAction } from './actions'

export function SignUpForm() {
  const router = useRouter()

  const [formState, handleSubmit, isPending] = useCustomFormState(
    signUpAction,
    undefined,
    () => {
      router.push('/auth/sign-in')
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
          <Label htmlFor="name">Name</Label>
          <Input name="name" type="text" id="name" />
          {formState.errors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {formState.errors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input name="email" type="email" id="email" />
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
        </div>

        <div className="space-y-1">
          <Label htmlFor="password_confirmation">Confirm your password</Label>
          <Input
            name="password_confirmation"
            type="password"
            id="password_confirmation"
          />
          {formState.errors?.password_confirmation && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {formState.errors.password_confirmation[0]}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Create account'
          )}
        </Button>

        <Button className="w-full" variant="link" asChild size="sm">
          <Link href="/auth/sign-in">Already registered? Sign in</Link>
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
          Sign up with Github
        </Button>
      </form>
    </div>
  )
}
