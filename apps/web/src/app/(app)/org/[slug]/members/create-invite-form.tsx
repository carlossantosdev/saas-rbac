'use client'

import { AlertTriangle, CheckCircle, Loader2, UserPlus } from 'lucide-react'
import { useParams } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCustomFormState } from '@/hooks/use-custom-form-state'
import { queryClient } from '@/lib/react-query'

import { createInviteAction } from './actions'

export function CreateInviteForm() {
  // const { slug: orgSlug } = useParams<{ slug: string }>()
  // const [formState, handleSubmit, isPending] = useCustomFormState(
  //   createInviteAction,
  //   undefined,
  //   () => {
  //     queryClient.invalidateQueries({ queryKey: [orgSlug, 'projects'] })
  //   },
  // )

  const [formState, handleSubmit, isPending] = useCustomFormState(
    createInviteAction,
    undefined,
  )

  return (
    <form
      onSubmit={handleSubmit}
      /* action={formAction} */
      className="space-y-4"
    >
      {formState.success === false && formState.message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Invite failed!</AlertTitle>
          <AlertDescription>
            <p>{formState.message}</p>
          </AlertDescription>
        </Alert>
      )}

      {formState.success && formState.message && (
        <Alert variant="success">
          <CheckCircle className="size-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            <p>{formState.message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex gap-4">
        <div className="flex-1 space-y-1">
          <Input name="email" type="email" id="email" placeholder="Email" />
          {formState.errors?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {formState.errors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Select name="role" defaultValue="MEMBER">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="MEMBER">Member</SelectItem>
              <SelectItem value="BILLING">Billing</SelectItem>
            </SelectContent>
          </Select>
          {formState.errors?.role && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {formState.errors.role[0]}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isPending} className="w-[125px]">
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <UserPlus className="mr-2 size-4" />
              Invite user
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
