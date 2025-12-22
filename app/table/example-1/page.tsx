import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { TableInfiniteScroll } from "@/feat/table/example-1/client"
import { PAGE_SIZE } from "@/feat/table/data"

export default function ExampleOnePage() {
  return (
    <main className="bg-background text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10 lg:px-12">
        <div className="flex flex-col gap-2">
          <Link
            href="/table"
            className="text-muted-foreground group inline-flex w-fit items-center gap-2 text-sm hover:text-foreground"
          >
            <ArrowLeftIcon className="h-4 w-4 transition group-hover:-translate-x-0.5" />
            Voltar para lista de exemplos
          </Link>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Exemplo 1
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Tabela com paginação acionada pelo scroll
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl text-base">
              A lista mantém um cabeçalho fixo e busca novas páginas conforme o
              usuário se aproxima do final do container de rolagem.
            </p>
          </div>
        </div>

        <TableInfiniteScroll />

        <div className="text-muted-foreground grid gap-2 rounded-xl border bg-card/60 p-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-foreground font-semibold">
              Como funciona o carregamento
            </p>
            <p>
              Cada página traz {PAGE_SIZE} itens. O IntersectionObserver usa o
              sentinel no rodapé para decidir quando chamar a próxima página.
            </p>
          </div>
          <div>
            <p className="text-foreground font-semibold">Boas práticas</p>
            <ul className="list-disc space-y-1 pl-4">
              <li>Header sticky para manter o contexto da tabela.</li>
              <li>Badges de status com contraste para estados críticos.</li>
              <li>Indicador de progresso para clareza de volume carregado.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
