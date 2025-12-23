"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRightIcon, ScrollTextIcon, TableIcon } from "lucide-react"

import { TableControlledPagination } from "@/feat/table/example-2/client"
import { TableInfiniteScroll } from "@/feat/table/example-1/client"

const examples = [
  {
    id: "example-1",
    href: "/table/example-1",
    title: "Tabela com paginação em scroll",
    description:
      "Carregamento incremental ao chegar perto do fim da lista, com sticky header e status coloridos.",
    icon: ScrollTextIcon,
    component: TableInfiniteScroll,
  },
  {
    id: "example-2",
    href: "/table/example-2",
    title: "Tabela com paginação controlada",
    description:
      "Paginação manual com filtros e busca. Útil quando o usuário precisa navegar por páginas específicas.",
    icon: TableIcon,
    component: TableControlledPagination,
  },
]

export default function TablePage() {
  const [activeId, setActiveId] = React.useState(examples[0]?.id ?? "")
  const activeExample = examples.find((item) => item.id === activeId)
  const ActiveComponent = activeExample?.component

  return (
    <main className="bg-background text-foreground">
      <div className="mx-auto flex max-w-8xl flex-col gap-8 px-6 py-12 md:gap-10 md:px-10 lg:px-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              exemplos
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Tabelas no Next.js 16
            </h1>
            <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
              Layout estilo originui: sidebar à esquerda e o exemplo ativo no
              painel principal. Clique para alternar entre as variações.
            </p>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-primary hover:text-primary/80"
          >
            Voltar para a home
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_4.5fr]">
          <aside className="rounded-2xl border bg-card/60 p-4 shadow-sm sm:p-5">
            <div className="text-muted-foreground mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
              Componentes
            </div>
            <div className="flex flex-col">
              {examples.map((example) => {
                const active = activeId === example.id
                return (
                  <button
                    key={example.id}
                    onClick={() => setActiveId(example.id)}
                    className={`flex items-center gap-3 border-l px-3 py-2.5 text-left transition ${
                      active
                        ? "border-l-2 border-primary bg-primary/5 text-foreground"
                        : "border-l border-border text-muted-foreground hover:bg-muted/10"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        active ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                      }`}
                    >
                      <example.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${active ? "" : "text-foreground/90"}`}>
                        {example.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {example.description}
                      </p>
                    </div>
                    {active && (
                      <ArrowRightIcon className="text-primary h-4 w-4" />
                    )}
                  </button>
                )
              })}
            </div>
          </aside>

          <section className="min-h-[520px]">
            {ActiveComponent ? (
              <ActiveComponent />
            ) : (
              <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
                Selecione um exemplo na barra lateral.
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
