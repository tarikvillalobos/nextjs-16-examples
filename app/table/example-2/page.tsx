import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { TableControlledPagination } from "@/feat/table/example-2/client"

export default function ExampleTwoPage() {
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
              Exemplo 2
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Tabela com paginação controlada + filtros
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl text-base">
              Use busca, filtro de status e escolha de tamanho da página. A
              navegação é explícita (anterior/próxima) e mostra a faixa
              exibida.
            </p>
          </div>
        </div>

        <TableControlledPagination />

        <div className="text-muted-foreground grid gap-2 rounded-xl border bg-card/60 p-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-foreground font-semibold">
              Quando preferir controle manual
            </p>
            <p>
              Ideal quando o volume de dados é conhecido e o usuário precisa
              navegar para páginas específicas sem depender do scroll
              infinito.
            </p>
          </div>
          <div>
            <p className="text-foreground font-semibold">Dicas de UX</p>
            <ul className="list-disc space-y-1 pl-4">
              <li>Mostre a faixa exibida (ex.: 21–30 de 120).</li>
              <li>Reinicie a página ao trocar filtros para evitar páginas vazias.</li>
              <li>Use limites de página coerentes com a densidade visual.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
