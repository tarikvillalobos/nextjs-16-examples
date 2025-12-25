import { TableInfiniteScroll } from "@/feat/table/example-1/client"

export default function ExampleOnePage() {
  return (
    <main className="bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-16">
        <TableInfiniteScroll />
      </div>
    </main>
  )
}
