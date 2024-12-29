+++
title = "Twitter Score: detector de bots e trolls no twitter"
date = "2020-05-07T18:24:52-05:00"
author = "Lorenzo Piccoli Módolo"
draft = false
+++

O objetivo deste projeto é pontuar uma conta do Twitter com base em sua atividade e fornecer uma rápida análise sobre como a conta se comporta e se age como uma conta normal.

A descrição que escrevi na época foi:

> É claro que o Twitter tem um grande problema com bots. Todo trending topic está cheio de contas suspeitas que amplificam alguma opinião e polarizam a discussão. Os humanos são surpreendentemente bons em identificar se uma conta deve ser levada a sério ou não, mas é simplesmente impossível analisar cada uma delas. O objetivo deste projeto é fornecer uma pontuação para que você possa saber rapidamente se vale a pena se envolver em uma discussão ou não.

Agora está claro que com o surgimento dos LLMs e sua ampla adoção, a parte sobre _"humanos são muito bons em identificar se uma conta é real ou não"_ não envelheceu muito bem, mas na época, os resultados eram muito bons.

O maior desafio deste projeto foi ter que filtrar conteúdo extremamente tóxico para encontrar exemplos de contas de bot/troll para testar adequadamente meu algoritmo. Além disso, essas contas eram banidas após um período de tempo.

Você pode encontrar mais informações sobre como o algoritmo de detecção funciona na [documentação](https://github.com/lorenzopicoli/twitterscore?tab=readme-ov-file#6--score).

**Confira esse projeto no [Github](https://github.com/lorenzopicoli/twitterscore)**

---

Tecnologias: Node.js, CLI applications

{{< image_grid >}}
{
"images": [
{ "src": "twitter-score-1.png" },
{ "src": "twitter-score-2.png" }
]
}
{{< /image_grid >}}
