
## O projeto

Consiste em basicamente em uma listagem de países a partir de um determinado continente, sendo que essa listagem pode ser personalizada a partir de seus filtros.
Para a visualização, acesse: <a href="https://habitue-project.vercel.app/">Habitue - Vercel</a>

## Como dei inicio

Para começar o projeto, foi feito um pequeno protótipo, simples, para ter como base durante o desenvolvimento.
Foi feito um `Style Guide` para padronizar desde as cores usada, até os tamanhos (fontes e breakpoints)

### O protótipo

- Style Guide
  ![image](https://user-images.githubusercontent.com/79236683/170800837-5949a52c-07b0-465f-9fcc-2e5e7162dca8.png)

- Protótipo

![image](https://user-images.githubusercontent.com/79236683/170800921-5a66b0b6-7e93-4c7a-9e9f-6e27df9a46dd.png)

- Link para acesso: <a href="https://www.figma.com/file/FajJDvyPkzQUTbql9tYKya/Untitled?node-id=0%3A1">Figma Habitue</a>

## Tecnologias

Para a construção do projeto foi utilizado:

- JavaScript
- Vue 3
- Vue Router
- VueX
- Sass / Scss

## Considerações e próximos passos

Devido correria do dia a dia, acabei não tendo muito tempo para focar 100% no projeto, mas dei meu melhor e estarei em constante evolução.
Nunca usei `GraphQL` para consumo dos dados, apenas API's Rest.

### Melhorias (Pontos a se melhorar e/ou consertar)

Vejo como de extrema necessidade, sempre ter em mente possíveis melhorias, tanto a nível de código, quanto em layout, já tendo mapeado possíveis pontos que são podem gerar algum erro.

### Novas funcionalidades e melhorias

- Detalhes do pais
  Devido o uso do Vue Router, um ponto bacana e que será feito posteriormente é ter uma tela onde será exibida as informações do país selecionado.

- Debounce
  Na hora de buscar um pais, é interessante e tem um ganho computacional interessante, portante é algo a se colocar.

- Responsividade
  A responsividade não foi a das melhores, principamente o uso do `truncateText`, não sendo usado de acordo com o tamanho da tela.

- Notify's
  A filtrar ou limpar filtros, acho interessante mostrar para o usuário que foi realizado com sucesso a sua solicitação.

- Seleção de outros idiomas
  Ao selecionar outros idiomas, acho interessante limpar a listagem, pois caso na listagem tenha muitas linguagens, acaba ficando imperceptível que foi escolhida uma.

- Validação de paise no modal
  Por algum motivo, a validação do modal na caso clique pra avançar sem definir continente não está funcionando perfeitamente

---

Projeto realizado com carinho por <a href="https://github.com/felipejuzo02">Luis Felipe Juzo</a>
