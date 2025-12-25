import { TableControlledPagination } from "@/feat/table/example-2/client"

export default function ExampleTwoPage() {
  return (
    <main className="bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-16">
        <TableControlledPagination />
      </div>
    </main>
  )
}
