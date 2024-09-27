# Grupo de Prognóstico 

- Icons: [Lucide](https://lucide.dev/icons/)
- Branch conventions: [Gitflow](https://danielkummer.github.io/git-flow-cheatsheet/)
- Commit conventions: [Iuricode](https://danielkummer.github.io/git-flow-cheatsheet/) (Inglês)
- Trello: inexistente
- Organização: vozes da cabeça e manda no zap
- TansktackQuery: [TanstackQuery](https://tanstack.com/query/) 

## Requests

Eu vou preferir usar o tanstack query que tá instalado pelos states de isFetching, isLoading, isError, etc, mas acho que fica como opcional (?).

Tem um módulo de api próprio que usa o axios (api.get, api.post, api.put, api.del) e a utilização é tipo:

```javascript
import api from '@/services/api'

api.get{
  url: '/url', // Considere que a url base já está configurada.
  params: {
    param1: 'value1',
    param2: 'value2'
  }
  data: {
    data1: 'value1',
    data2: 'value2'
  }
  token: 'token'
}
```