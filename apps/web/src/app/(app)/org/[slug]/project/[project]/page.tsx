import { Header } from '@/components/header'

export default async function Project() {
  return (
    <div className="space-y-4 py-4">
      <Header />
      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <p className="text-sm text-muted-foreground">The project.</p>
      </main>
    </div>
  )
}
