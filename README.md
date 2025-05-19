# VITTA Logística - Monorepo

Sistema de gestão logística desenvolvido para a VITTA Logística, utilizando uma arquitetura monorepo.

## 📁 Estrutura do Projeto

```
vitta-logistica/
├── frontend/           # Aplicação React
│   ├── src/           # Código fonte do frontend
│   ├── public/        # Arquivos públicos
│   └── package.json   # Dependências do frontend
├── backend/           # API Node.js
│   ├── src/          # Código fonte do backend
│   └── package.json  # Dependências do backend
├── package.json      # Dependências compartilhadas
└── README.md         # Este arquivo
```

## 🚀 Começando

### Pré-requisitos

- Node.js >= 18
- npm >= 9.0
- MongoDB >= 6.0
- Git

### Clonando o Repositório

```bash
git clone https://github.com/seu-usuario/vitta-logistica.git
cd vitta-logistica
```

### Instalação

1. Instale as dependências do projeto:
```bash
# Instala dependências do projeto raiz
npm install

# Instala dependências do frontend
cd frontend && npm install

# Instala dependências do backend
cd ../backend && npm install
```

2. Configure as variáveis de ambiente:
```bash
# Na raiz do projeto
cp .env.example .env

# No frontend
cd frontend
cp .env.example .env

# No backend
cd ../backend
cp .env.example .env
```

## 🔧 Desenvolvimento

### Comandos Disponíveis

Na raiz do projeto:
```bash
# Inicia tanto o frontend quanto o backend em modo de desenvolvimento
npm run dev

# Executa os testes em todos os pacotes
npm run test

# Faz o build de todos os pacotes
npm run build

# Executa o linter em todos os pacotes
npm run lint

# Formata o código usando Prettier
npm run format
```

No diretório `frontend/`:
```bash
# Inicia o servidor de desenvolvimento do frontend
npm run start

# Executa os testes do frontend
npm run test

# Faz o build do frontend
npm run build
```

No diretório `backend/`:
```bash
# Inicia o servidor de desenvolvimento do backend
npm run dev

# Executa os testes do backend
npm run test

# Faz o build do backend
npm run build
```

## 📝 Boas Práticas Git

### Branches

- `main`: Branch principal, contém o código em produção
- `develop`: Branch de desenvolvimento, base para novas features
- `feature/*`: Branches para novas funcionalidades
- `hotfix/*`: Branches para correções urgentes
- `release/*`: Branches para preparação de releases

### Commits

Utilize commits semânticos:
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Atualização de documentação
- `style`: Formatação de código
- `refactor`: Refatoração de código
- `test`: Adição/modificação de testes
- `chore`: Atualização de tarefas de build, configs, etc

Exemplo:
```bash
git commit -m "feat(frontend): adiciona componente de dashboard"
```

### Pull Requests

1. Crie uma branch a partir de `develop`
2. Faça suas alterações
3. Abra um PR para `develop`
4. Aguarde review e aprovação
5. Faça merge após aprovação

## 🔍 Convenções de Código

- Use TypeScript para todo código novo
- Siga o estilo definido no `.editorconfig`
- Mantenha os testes atualizados
- Documente APIs e componentes
- Siga os padrões do ESLint/Prettier

## 📦 Deployment

### Produção
```bash
# Build de todos os pacotes
npm run build

# Inicia em modo produção
npm run start
```

### Staging
```bash
# Build e deploy para staging
npm run deploy:staging
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das alterações (`git commit -m 'feat: adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📮 Suporte

Para suporte ou dúvidas, entre em contato com a equipe de desenvolvimento. 