# Exemplo 2 - Tabela com paginação controlada

### O que foi implementado
- Paginação manual com botões Anterior/Próxima e exibição de faixa (`from–to`) e total de páginas.
- Filtro de status e busca textual (cliente, e-mail ou NF) com `getInvoicesFiltered` compartilhado.
- Seleção do tamanho da página (10/15/25) e ressincronização da página ao trocar filtros.

### Quando usar
- Dashboards em que o volume é conhecido e o usuário precisa navegar com precisão por páginas específicas.
- Situações em que filtros client-side são suficientes e a UX pede um controle explícito em vez de “infinite scroll”.

### Rotas
- `/table` — índice dos exemplos de tabela.
- `/table/example-2` — tabela com paginação controlada + filtros.
