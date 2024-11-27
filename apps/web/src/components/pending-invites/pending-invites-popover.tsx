'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Check, UserPlus2, X } from 'lucide-react'
import { useState } from 'react'

import { getPendingInvites } from '@/http/requests/get-pending-invites'

import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { acceptInviteAction, refuseInviteAction } from './actions'
dayjs.extend(relativeTime)

export function PendingInvitesPopover() {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  const { data } = useQuery({
    queryKey: ['pending-invites'],
    queryFn: async () => await getPendingInvites(),
    enabled: isOpen,
  })

  async function handleAcceptInvite(inviteId: string) {
    await acceptInviteAction(inviteId)
    queryClient.invalidateQueries({ queryKey: ['pending-invites'] })
  }

  async function handleRefuseInvite(inviteId: string) {
    await refuseInviteAction(inviteId)
    queryClient.invalidateQueries({ queryKey: ['pending-invites'] })
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <UserPlus2 className="size-4" />
          <span className="sr-only">Pending invites</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-88 space-y-2">
        <span className="block text-sm font-medium">
          Pending invites ({data?.invites.length ?? '0'})
        </span>

        {data?.invites.length === 0 && (
          <p className="text-sm text-muted-foreground">No invites found.</p>
        )}

        {data?.invites.map((invite) => {
          return (
            <div className="space-y-2" key={invite.id}>
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  {invite.author?.name ?? 'Someone'}
                </span>{' '}
                invited you to join{' '}
                <span className="font-medium text-foreground">
                  {invite.organization.name}
                </span>{' '}
                {dayjs(invite.createdAt).fromNow()}
              </p>

              <div className="flex gap-1">
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => handleAcceptInvite(invite.id)}
                >
                  <Check className="mr-1.5 size-3" />
                  Accept
                </Button>

                <Button
                  onClick={() => handleRefuseInvite(invite.id)}
                  size="xs"
                  variant="outline"
                  className="text-muted-foreground"
                >
                  <X className="mr-1.5 size-3" />
                  Refuse
                </Button>
              </div>
            </div>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
