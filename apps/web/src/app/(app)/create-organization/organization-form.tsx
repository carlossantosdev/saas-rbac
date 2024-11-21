'use client'

import { AlertTriangle, CheckCircle, Loader2 } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCustomFormState } from '@/hooks/use-custom-form-state'

import { createOrganizationAction } from './actions'

export function OrganizationForm() {
  const [formState, handleSubmit, isPending] = useCustomFormState(
    createOrganizationAction,
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
          <AlertTitle>Save organization failed!</AlertTitle>
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

      <div className="space-y-1">
        <Label htmlFor="name">Organization name</Label>
        <Input name="name" type="text" id="name" />
        {formState.errors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {formState.errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">E-mail domain</Label>
        <Input
          name="domain"
          type="text"
          id="domain"
          inputMode="url"
          placeholder="example.com"
        />
        {formState.errors?.domain && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {formState.errors.domain[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline space-x-2">
          <Checkbox
            name="shouldAttachUsersByDomain"
            id="shouldAttachUsersByDomain"
            className="translate-y-0.5"
          />
          <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
            <span className="text-sm font-medium leading-none">
              Auto-join new members
            </span>
          </label>
        </div>
        <p className="block text-sm text-muted-foreground">
          This will automatically invite all members with same e-mail domain to
          this organization.
        </p>
        {formState.errors?.shouldAttachUsersByDomain && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {formState.errors.shouldAttachUsersByDomain[0]}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Save o rganization'
        )}
      </Button>
    </form>
  )
}
