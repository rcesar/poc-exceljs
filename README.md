## Instalação

Para instalar as dependências do projeto, utilize um dos gerenciadores de pacotes:

- **npm:** `npm install`
- **pnpm:** `pnpm install`
- **yarn:** `yarn install`

## Execução

Após instalar as dependências, inicie o servidor da API utilizando o comando:

```bash
npm run dev
```

Este comando irá iniciar a API Rest, que estara apta para receber requisições na URL:

`http://localhost:3000/export`

Parâmetros:

- columns: referência as colunas que vão ser exibidas no relatório.
- groupBy: usando algum elemento para agrupar as tarefas.
- separateSheets: `boolean` que define se vai separar as planilhas por PDV ou não.
