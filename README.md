# VITTA Logística

Sistema de gestão logística desenvolvido para a VITTA Logística.

## Estrutura do Projeto

O projeto está organizado como um monorepo contendo:

- `frontend/`: Aplicação React com TypeScript
- `backend/`: API Node.js com Express e TypeScript

## Requisitos

- Node.js >= 18
- MongoDB >= 6.0
- npm >= 9.0

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/vitta-logistica.git
cd vitta-logistica
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

4. Edite os arquivos `.env` com suas configurações

## Desenvolvimento

Para iniciar o projeto em modo de desenvolvimento:

```bash
npm run dev
```

Isso iniciará tanto o frontend quanto o backend em modo de desenvolvimento.

## Scripts Disponíveis

- `npm run dev`: Inicia o ambiente de desenvolvimento
- `npm run build`: Compila o projeto para produção
- `npm run start`: Inicia o projeto em modo de produção
- `npm run lint`: Executa o linter em todo o projeto
- `npm run format`: Formata todo o código usando Prettier

## Estrutura de Diretórios

```
vitta-logistica/
├── frontend/           # Aplicação React
├── backend/           # API Node.js
├── .editorconfig     # Configurações do editor
├── .eslintrc.json    # Configurações do ESLint
├── .prettierrc       # Configurações do Prettier
├── package.json      # Configurações do projeto
└── README.md         # Este arquivo
```

## Padrões de Código

O projeto utiliza:

- ESLint para linting
- Prettier para formatação de código
- EditorConfig para configurações do editor

Para manter a consistência do código:

1. Configure seu editor para usar ESLint e Prettier
2. Habilite "Format on Save" no seu editor
3. Execute `npm run lint` antes de fazer commit
4. Execute `npm run format` para formatar todo o código

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

MIT 