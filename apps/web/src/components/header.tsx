import { Slash } from 'lucide-react'
import Image from 'next/image'

import { ability } from '@/auth/auth'

import logoIcon from '../assets/icons/logo-icon.svg'
import { OrganizationSwitcher } from './organization-switcher'
import { PendingInvitesPopover } from './pending-invites/pending-invites-popover'
import { ProfileButton } from './profile-button'
import { ProjectSwitcher } from './project-switcher'
import { ThemeSwitcher } from './theme/theme-switcher'
import { Separator } from './ui/separator'

export async function Header() {
  const permissions = await ability()
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Image src={logoIcon} className="size-6" alt="Logo" />

        <Slash className="size-3 -rotate-[24deg] text-muted-foreground" />

        <OrganizationSwitcher />

        {permissions?.can('get', 'Project') && (
          <>
            <Slash className="size-3 -rotate-[24deg] text-muted-foreground" />
            <ProjectSwitcher />
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <PendingInvitesPopover />
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </div>
  )
}
