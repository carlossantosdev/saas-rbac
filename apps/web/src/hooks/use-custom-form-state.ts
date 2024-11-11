import { type FormEvent, useState, useTransition } from 'react'

interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

export function useCustomFormState(
  action: (data: FormData) => Promise<FormState>,
  initialState?: FormState,
  onSuccess?: () => Promise<void> | void,
) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState(
    initialState ?? { success: true, message: null, errors: null },
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)

      if (state.success === true && onSuccess) {
        await onSuccess()
      }

      setFormState(state)
    })
  }

  return [formState, handleSubmit, isPending] as const
}
