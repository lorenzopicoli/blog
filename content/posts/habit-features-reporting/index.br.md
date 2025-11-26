+++
title = "Relatórios sobre hábitos em constante mudança"
date = "2025-11-25T18:24:52-05:00"
author = "Lorenzo Piccoli Módolo"
draft = false
+++

Para a maioria dos aspectos da minha vida que quero rastrear e armazenar no [Lomnia](/projects/lomnia), consigo definir um conjunto de propriedades, salvar isso no banco e criar gráficos que respondem perguntas que eu tenho.

Hábitos são uma parte essencial para eu rastrear — com eles consigo responder coisas como:

- Em quais dias do ano eu comi granola no café da manhã?
- Qual porcentagem da minha alimentação foi saudável ou não saudável?
- Quantas sessões de café eu tive no ano?
- Como evoluiu meu número de pull ups sem assistência ao longo do ano?
- Como a quantidade de entradas de humor “positivas” mudou ao longo do tempo?

Nada disso seria capturado pela minha localização, pelo clima ou qualquer outro dado automático — só por um log manual de hábitos.

Além disso, **hábitos estão sempre mudando**. Talvez eu queira rastrear quantas vezes joguei um certo jogo, e depois simplesmente parar de jogar completamente.

# Habit Tracking

Enquanto construo o [Hares](/projects/hares) e o [Lomnia](/projects/lomnia), eu não quero esquecer que hábitos mudam o tempo todo — e, se quero ter dados de qualidade, preciso de um sistema que realmente suporte essa natureza mutável.

Quando penso no ato de registrar hábitos, existem algumas coisas que considero obrigatórias para um logging de qualidade:

- **Precisa ser rápido.** Eu preciso conseguir registrar algo no meio da rua, em dias que estou feliz demais pra me preocupar com isso, ou deprimido demais pra levantar da cama. Sem perguntas, sem formulários — só registrar.
- **Precisa ser flexível.** Se começo a fazer um exercício novo na academia, preciso conseguir criar um novo tracker rapidamente. Algumas coisas, como humor ou alimentação, não podem ser totalmente pré-definidas — têm nuances que eu quero capturar, mesmo que eu não tenha pensado nisso um mês atrás. “down” é diferente de “meh”, e eu quero poder registrar ambos.
- **Precisa abraçar mudanças.** Já mudei a forma como rastreio café/cafeína várias vezes, dependendo da fase da vida, da importância disso pra mim ou do quanto aprendi sobre self-tracking. Alterar meu sistema de hábitos precisa ser algo tranquilo — não assustador.

# Reporting

Relatórios, por outro lado, são praticamente o oposto de fazer o tracking.

Conforme trabalho no [Lomnia](/projects/lomnia), já testei várias formas de explorar os dados que acumulei sobre mim ao longo dos anos. No começo eu queria que tudo fosse customizável: definir na hora o tipo de gráfico, a fonte de dados, o agrupamento, filtros, função de agregação…

Mas aprendi que essa forma de pensar não funciona por dois motivos. Primeiro, **construir e manter esse tipo de sistema é DIFÍCIL**, e eu preciso conseguir trabalhar nisso no meu tempo livre — que é limitado. Testar um tipo de gráfico novo deveria ser um projeto de fim de semana, não um projeto de um mês tentando suportar todos os casos do mundo. Segundo, eu quero **correlacionar dados**. Quero ver um mapa dinâmico mostrando onde eu estava (location), o que eu estava fazendo (hábito + histórico de internet + diário) e qual era o clima. _Boa sorte_ criar uma UI onde o usuário consegue montar gráficos com esse nível de detalhe e correlação.

Então abandonei essa abordagem e decidi usar gráficos pré-definidos que respondem perguntas específicas que eu realmente tenho. Eu sou uma pessoa comum; as chances são de que outras pessoas também tenham essas mesmas perguntas. Isso também deixa o projeto um pouco mais compartilhável.
Isso não significa que não quero personalização ou exploração — mas passei a usar um conjunto de padrões opinativos, e tudo o que consigo construir em cima disso é bônus.

# A Ponte

O problema é que eu não consigo criar um gráfico pré-definido para **“quantas xícaras de café eu tomei hoje”**, porque, pelas minhas próprias regras, a forma como rastreio café muda ao longo do tempo.

Complicando ainda mais: o meio que usei para rastrear também mudou ao longo dos anos. Comecei usando Obsidian para registrar meus hábitos enquanto escrevia meu diário, depois criei o [Hares](/projects/hares). E não prometo que não vá mudar de novo.

Então como importar todos os meus hábitos registrados de uma forma que permita consultar coisas super específicas a partir de uma fonte super genérica?

A solução que encontrei é uma mistura de [EAV](https://en.wikipedia.org/wiki/Entity%E2%80%93attribute%E2%80%93value_model) com regras de transformação definidas pelo usuário. A ideia é que, ao invés de reportar diretamente os registros brutos, eu os processo e — com base em regras definidas pelo usuário — extraio “features” desses hábitos. Essas features são simples e fáceis de consultar.

As features funcionam assim:

1. **Cada feature é extraída por um conjunto de regras**
2. **Cada regra tem uma lista de condições** que precisam ser todas verdadeiras para um hábito ser considerado
3. **Cada regra tem uma instrução de extração** que define qual feature deve ser gerada a partir do hábito. Pode ser o valor, parte do valor ou algo derivado.

Isso permite flexibilidade total. Cada regra define um conjunto de condições em “E” (AND), permitindo filtros bem precisos (ex.: por chave e valor do hábito), e as regras entre si funcionam como “OU” (OR), permitindo extrair features vindas de origens diferentes.

Consultar fica fácil: os gráficos só precisam olhar a tabela `extracted_habit_features` e exibir.

Imagine que existe um gráfico pré-definido chamado “Contagem de refeições por dia”. Ele pode consultar a tabela de features procurando por uma feature chamada “meal”. Assim, ainda forneço uma forma rápida de visualizar os dados, ao mesmo tempo sugerindo que essa é uma feature útil para rastrear.
Mas nada impede o usuário de trocar a categoria para “minha refeição” ao configurar o gráfico — se ele rastreia de outra forma. O gráfico vira uma inspiração, uma opinião sobre o que faz sentido medir e como reportar.

**Neste ponto, cada entrada de hábito vira essencialmente matéria-prima do sistema.** O dado cru, não estruturado, inserido pelo usuário — cheio de nuances, ruídos e verdade. Esse dado é imutável de propósito. Em vez de editar o passado, eu passo tudo por uma camada de transformação, quase como o “T” de um pipeline ETL clássico.

Para cada hábito, o [Lomnia](/projects/lomnia) verifica todas as regras de todas as features. Sempre que uma regra bate, é criada uma linha nova em `extracted_habit_features`. Esse processo é determinístico, reproduzível e mantém camadas distintas: o “raw” separado do “structured”. O resultado é um conjunto limpo, uniforme e fácil de consultar — e que pode ser reprocessado a qualquer momento sem nunca perder a bagunça original.

# Uma última coisa

Às vezes, eu simplesmente esqueço de registrar uma refeição, um banho ou seja lá o que for. No passado eu tentava voltar no tempo e descobrir exatamente quando algo aconteceu — isso só gera ansiedade e dados errados. Então eu implementei a opção de registrar um período do dia, ao invés de um horário preciso. Posso dizer que tomei banho “de manhã”.

Além disso, alguns hábitos fazem mais sentido no nível diário — como o meu “sleep score”.

Isso significa que o dado bruto pode conter apenas uma estimativa aproximada de quando algo aconteceu. Alguns gráficos exibem os dados por dia, mas outros dependem de granularidade de tempo mais precisa — por exemplo, entender em que horário do dia costumo tomar café da manhã.
A solução que adotei foi transformar o dado em intervalos de tempo ao extrair as features. Isso me permite filtrar por `start_date` quando hora exata não importa, e usar `start_date = end_date` quando a precisão absoluta é necessária.

# Como fica na prática

Voltando às perguntas do início, veja como algumas delas ficam:

### Qual porcentagem da minha comida foi saudável ou não saudável?

Feature: “healthy_or_not”

- Condições:

  - Habit key = "Meal"

- Valor extraído = { brócolis: "healthy", hambúrguer: "unhealthy" }

### Quantas sessões de café tive no ano?

Aqui fica divertido: posso usar regras para extrair dados de fontes diferentes e normalizar tudo.

Feature: "coffee_sessions"
Regras:

**Regra 1** (quando o café é registrado como parte de um snack com componente “coffee”):

- Condições:

  - Value contém "Coffee"

- Valor extraído = 1

**Regra 2** (no Obsidian, eu escrevia no fim do dia quantas sessões de café tive):

- Condições:

  - Habit source = "obsidian"
  - Habit key = "Coffee"

- Valor extraído = "habit_value"

# Extrapolando essa ideia

Explorar e implementar essa abordagem reacendeu outra ideia que estava engavetada há muito tempo.

Hoje, ingestion e transformação no [Lomnia](/projects/lomnia) são lentos, frágeis e, honestamente, um pouco assustadores. Parece fácil demais quebrar algo ou corromper dados. Quando esse sistema de features estiver pronto, quero dar um passo atrás e estender a mesma lógica para todas as minhas fontes de dados. Separar tudo em _import → transform → consume_ deixaria o pipeline inteiro mais resiliente e muito menos intimidador de trabalhar. Mas isso é assunto pra outro dia.

---

Se quiser, posso revisar o texto para deixá-lo mais fluido, mais informal, mais formal ou mais adaptado ao seu blog.
