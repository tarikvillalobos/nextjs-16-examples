# Exemplo 1 - Tabela com paginação em scroll

### O que foi implementado
- Cliente React com `IntersectionObserver` para carregar a próxima página quando o sentinel no rodapé entra na área visível do container.
- Cabeçalho fixo, badges de status e indicadores de progresso (registros carregados e percentual do total).
- Fonte de dados compartilhada em `feat/table/data.ts`, gerando 160 registros mockados e servindo páginas de `PAGE_SIZE` itens.

### Pontos de atenção
- O observer usa o próprio container de scroll como `root`, evitando escutar o viewport inteiro.
- `nextPageRef` garante que a contagem de páginas não dependa de renders anteriores, reduzindo calls duplicadas.
- Em produção, troque `getInvoicesPage` por uma chamada remota e adicione tratamento de erro/timeout.

### Rotas
- `/table` — índice dos exemplos de tabela.
- `/table/example-1` — tabela com paginação em scroll.
