export type InvoiceRow = {
  id: number
  customer: string
  email: string
  country: string
  invoice: string
  total: number
  status: "Pago" | "Aguardando" | "Atrasado"
  issuedAt: string
}

const customers = [
  "Acme Corp",
  "Brightline",
  "Cloud Harbor",
  "Dataloom",
  "Eclipse Labs",
  "Fjord Systems",
  "Glowbyte",
  "Horizon Works",
  "Irisware",
  "Juniper & Co.",
  "Kitewave",
  "Lumina",
  "MagmaSoft",
  "Northwind",
  "Orion Partners",
  "Pinecrest",
  "Quartzlane",
  "Rivet Collective",
  "Solstice",
  "Timberline",
  "Umbra",
  "Venturelake",
  "Willow AI",
  "Xenon",
  "Yardlight",
  "Zephyr Studio",
]

const countries = [
  "Brasil",
  "Estados Unidos",
  "Canadá",
  "Reino Unido",
  "Alemanha",
  "Portugal",
  "Chile",
  "México",
  "Argentina",
  "Espanha",
  "França",
  "Austrália",
]

const statuses: InvoiceRow["status"][] = [
  "Pago",
  "Aguardando",
  "Atrasado",
]

const monthDays = [
  "02 Jan",
  "06 Jan",
  "12 Jan",
  "18 Jan",
  "25 Jan",
  "31 Jan",
  "03 Fev",
  "11 Fev",
  "16 Fev",
  "22 Fev",
  "27 Fev",
  "04 Mar",
  "09 Mar",
  "15 Mar",
  "20 Mar",
  "27 Mar",
  "02 Abr",
  "07 Abr",
  "12 Abr",
  "19 Abr",
  "24 Abr",
  "29 Abr",
  "06 Mai",
  "12 Mai",
  "18 Mai",
  "25 Mai",
  "30 Mai",
]

const totalRows = 160
const invoices: InvoiceRow[] = Array.from({ length: totalRows }, (_, index) => {
  const company = customers[index % customers.length]
  const status = statuses[index % statuses.length]
  const country = countries[(index * 3) % countries.length]
  const total = 950 + (index % 11) * 87 + (index % 5) * 13
  const invoice = `INV-${2024 + Math.floor(index / 40)}-${(index + 1)
    .toString()
    .padStart(4, "0")}`
  const issuedAt = monthDays[index % monthDays.length]

  return {
    id: index + 1,
    customer: company,
    email: `${company.toLowerCase().replace(/\s+/g, "-")}@example.com`,
    country,
    invoice,
    total,
    status,
    issuedAt,
  }
})

export const PAGE_SIZE = 20

export function getInvoicesPage(
  page: number,
  pageSize: number = PAGE_SIZE
): { rows: InvoiceRow[]; hasMore: boolean } {
  const start = page * pageSize
  const end = start + pageSize
  const slice = invoices.slice(start, end)

  return {
    rows: slice,
    hasMore: end < invoices.length,
  }
}

export function getInvoicesFiltered(options: {
  query?: string
  status?: InvoiceRow["status"] | "Todos"
  country?: string
}) {
  const { query = "", status = "Todos", country } = options
  const lower = query.toLowerCase()

  return invoices.filter((row) => {
    const matchesQuery =
      !lower ||
      row.customer.toLowerCase().includes(lower) ||
      row.email.toLowerCase().includes(lower) ||
      row.invoice.toLowerCase().includes(lower)

    const matchesStatus = status === "Todos" ? true : row.status === status
    const matchesCountry = country ? row.country === country : true

    return matchesQuery && matchesStatus && matchesCountry
  })
}

export const totalInvoices = invoices.length
export const statusOptions = statuses
export const countryOptions = countries
