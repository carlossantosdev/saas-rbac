import { z } from 'zod'

export const bossSubject = z.tuple([z.literal('manage'), z.literal('all')])

export type BossSubject = z.infer<typeof bossSubject>
