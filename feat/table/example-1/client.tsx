"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowDownIcon, LoaderCircle } from "lucide-react"

import {
  PAGE_SIZE,
  type InvoiceRow,
  getInvoicesFiltered,
  statusOptions,
  totalInvoices,
} from "@/feat/table/data"

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
})

const statusTone: Record<InvoiceRow["status"], string> = {
  Pago: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200 dark:border-emerald-500/40",
  Aguardando:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-200 dark:border-amber-500/40",
  Atrasado:
    "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-200 dark:border-rose-500/40",
}

export function TableInfiniteScroll() {
  const scrollRef = React.useRef<HTMLDivElement | null>(null)
  const sentinelRef = React.useRef<HTMLDivElement | null>(null)
  const nextPageRef = React.useRef(0)

  const [rows, setRows] = React.useState<InvoiceRow[]>([])
  const [hasMore, setHasMore] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [status, setStatus] = React.useState<InvoiceRow["status"] | "Todos">(
    "Todos"
  )

  const filteredRows = React.useMemo(
    () =>
      getInvoicesFiltered({
        query,
        status,
      }),
    [query, status]
  )

  const loadNextPage = React.useCallback(() => {
    if (isLoading || !hasMore) return
    setIsLoading(true)

    const start = nextPageRef.current * PAGE_SIZE
    const slice = filteredRows.slice(start, start + PAGE_SIZE)

    nextPageRef.current += 1
    setRows((prev) => [...prev, ...slice])
    setHasMore(start + slice.length < filteredRows.length)
    setIsLoading(false)
  }, [filteredRows, hasMore, isLoading])

  React.useEffect(() => {
    nextPageRef.current = 0
    setRows([])
    setHasMore(true)
    setIsLoading(false)
    if (filteredRows.length === 0) return
    loadNextPage()
  }, [filteredRows, loadNextPage])

  React.useEffect(() => {
    const sentinel = sentinelRef.current
    const scrollArea = scrollRef.current
    if (!sentinel || !scrollArea) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadNextPage()
        }
      },
      {
        root: scrollArea,
        rootMargin: "160px 0px 200px 0px",
        threshold: 0.1,
      }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [loadNextPage])

  const loadedPercentage = Math.min(
    100,
    filteredRows.length === 0
      ? 0
      : Math.round((rows.length / filteredRows.length) * 100)
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Tabela com paginação em scroll</h2>
          <p className="text-muted-foreground text-sm">
            Role para carregar mais páginas de resultados. A tabela dispara o
            carregamento automaticamente ao se aproximar do fim da lista.
          </p>
        </div>
        <div className="text-muted-foreground flex items-center gap-3 text-sm">
          <div className="rounded-lg border px-3 py-2">
            <div className="text-foreground font-semibold">{rows.length}</div>
            <div className="text-xs">
              de {filteredRows.length} filtrados ({totalInvoices} totais)
            </div>
          </div>
          <div className="bg-primary/10 text-primary rounded-lg px-3 py-2 font-semibold">
            {loadedPercentage}%
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-border/60 bg-card/30 p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
            }}
            placeholder="Buscar cliente, e-mail ou NF..."
            className="pl-3"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={status}
            onValueChange={(value) => {
              setStatus(value as InvoiceRow["status"] | "Todos")
            }}
          >
            <SelectTrigger size="sm" aria-label="Filtrar por status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos os status</SelectItem>
              {statusOptions.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="max-h-[560px] overflow-auto border-l border-t bg-card/40"
      >
        <table className="min-w-full table-fixed text-sm">
          <thead className="sticky top-0 z-10 bg-card/95 backdrop-blur">
            <tr className="border-b">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Cliente
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                País
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Nota fiscal
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Valor
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Status
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Emissão
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium leading-tight">
                    {row.customer}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {row.email}
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {row.country}
                </td>
                <td className="px-4 py-3">{row.invoice}</td>
                <td className="px-4 py-3 font-semibold">
                  {formatter.format(row.total)}
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant="outline"
                    className={statusTone[row.status]}
                  >
                    {row.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {row.issuedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Separator />

        <div
          ref={sentinelRef}
          className="text-muted-foreground flex items-center justify-between gap-3 px-4 py-3 text-sm"
        >
          <div className="flex items-center gap-2">
            <ArrowDownIcon className="h-4 w-4" />
            {hasMore
              ? "Role até o final para carregar a próxima página."
              : "Chegamos ao fim da lista."}
          </div>
          {isLoading ? (
            <span className="flex items-center gap-2 font-medium">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Carregando...
            </span>
          ) : (
            <span className="text-xs">
              {rows.length} carregados · {PAGE_SIZE} por página
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
