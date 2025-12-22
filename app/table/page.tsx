import Link from "next/link"
import { ArrowRightIcon, ScrollTextIcon, TableIcon } from "lucide-react"

const examples = [
  {
    href: "/table/example-1",
    title: "Tabela com paginação em scroll",
    description:
      "Carregamento incremental ao chegar perto do fim da lista, com sticky header e status coloridos.",
    icon: ScrollTextIcon,
  },
  {
    href: "/table/example-2",
    title: "Tabela com paginação controlada",
    description:
      "Paginação manual com filtros e busca. Útil quando o usuário precisa navegar por páginas específicas.",
    icon: TableIcon,
  },
]

export default function TablePage() {
  return (
    <main className="bg-background text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:gap-12 md:px-10 lg:px-16">
        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            exemplos
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold sm:text-4xl">
                Tabelas no Next.js 16
              </h1>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
                Coleção de padrões para trabalhar com dados tabulares. Cada
                exemplo traz um client component específico para interação.
              </p>
            </div>
            <Link
              href="/"
              className="text-sm font-medium text-primary hover:text-primary/80"
            >
              Voltar para a home
            </Link>
          </div>
        </header>

        <section className="grid gap-6 sm:grid-cols-2">
          {examples.map((example) => (
            <Link
              key={example.href}
              href={example.href}
              className="group relative flex h-full flex-col rounded-xl border bg-card/70 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
                  <example.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{example.title}</h2>
                  <p className="text-muted-foreground text-sm">
                    {example.description}
                  </p>
                </div>
              </div>

              <div className="text-muted-foreground mt-6 flex items-center gap-2 text-sm font-medium">
                Abrir exemplo
                <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  )
}
