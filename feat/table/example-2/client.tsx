"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FilterIcon,
  SearchIcon,
} from "lucide-react"

import {
  PAGE_SIZE,
  getInvoicesFiltered,
  totalInvoices,
  type InvoiceRow,
} from "@/feat/table/data"

const statusTone: Record<InvoiceRow["status"], string> = {
  Pago: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200 dark:border-emerald-500/40",
  Aguardando:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-200 dark:border-amber-500/40",
  Atrasado:
    "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-200 dark:border-rose-500/40",
}

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
})

const pageSizeOptions = [10, 15, 20, 25]

export function TableControlledPagination() {
  const [query, setQuery] = React.useState("")
  const [status, setStatus] = React.useState<InvoiceRow["status"] | "Todos">(
    "Todos"
  )
  const [pageSize, setPageSize] = React.useState<number>(PAGE_SIZE)
  const [page, setPage] = React.useState(0)

  const filtered = React.useMemo(
    () =>
      getInvoicesFiltered({
        query,
        status,
      }),
    [query, status]
  )

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))

  React.useEffect(() => {
    if (page > pageCount - 1) {
      setPage(pageCount - 1)
    }
  }, [page, pageCount])

  const pageRows = React.useMemo(() => {
    const start = page * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page, pageSize])

  const hasRows = filtered.length > 0
  const from = hasRows ? page * pageSize + 1 : 0
  const to = hasRows
    ? Math.min(filtered.length, (page + 1) * pageSize)
    : 0

  return (
    <Card className="border-primary/10 bg-card/80 shadow-sm backdrop-blur">
      <CardHeader className="gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <CardTitle>Tabela com paginação controlada</CardTitle>
          <CardDescription>
            Busca, filtro por status e controle de página/limite feitos pelo
            usuário. Ideal para dashboards com volume conhecido.
          </CardDescription>
        </div>
        <div className="text-muted-foreground flex items-center gap-3 text-sm">
          <div className="rounded-lg border px-3 py-2">
            <div className="text-foreground font-semibold">{filtered.length}</div>
            <div className="text-xs">após filtros</div>
          </div>
          <div className="bg-primary/10 text-primary rounded-lg px-3 py-2 font-semibold">
            {totalInvoices} totais
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3 rounded-xl border bg-card/70 p-4 shadow-inner md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative w-full max-w-sm">
              <SearchIcon className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setPage(0)
                }}
                placeholder="Buscar cliente, e-mail ou NF..."
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={status}
                onValueChange={(value) => {
                  setStatus(value as InvoiceRow["status"] | "Todos")
                  setPage(0)
                }}
              >
                <SelectTrigger size="sm" aria-label="Filtrar por status">
                  <FilterIcon className="h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos os status</SelectItem>
                  <SelectItem value="Pago">Pago</SelectItem>
                  <SelectItem value="Aguardando">Aguardando</SelectItem>
                  <SelectItem value="Atrasado">Atrasado</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={String(pageSize)}
                onValueChange={(value) => {
                  setPageSize(Number(value))
                  setPage(0)
                }}
              >
                <SelectTrigger size="sm" aria-label="Itens por página">
                  <SelectValue placeholder="Itens" />
                </SelectTrigger>
                <SelectContent>
                  {pageSizeOptions.map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size} / página
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card/60">
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
              {pageRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-muted-foreground px-4 py-6 text-center text-sm"
                  >
                    Nenhum resultado encontrado para os filtros atuais.
                  </td>
                </tr>
              ) : (
                pageRows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
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
                ))
              )}
            </tbody>
          </table>

          <div className="border-t px-4 py-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-muted-foreground text-sm">
                Mostrando {from}-{to} de {filtered.length} (total {totalInvoices})
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                  disabled={page === 0}
                >
                  <ArrowLeftIcon className="mr-1 h-4 w-4" />
                  Anterior
                </Button>
                <span className="text-sm font-semibold">
                  Página {page + 1} / {pageCount}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPage((prev) => Math.min(pageCount - 1, prev + 1))
                  }
                  disabled={page >= pageCount - 1}
                >
                  Próxima
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
