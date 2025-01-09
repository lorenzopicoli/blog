+++
title = "Todos os dados que coletei sobre a minha vida em 2024"
date = "2025-01-08T18:24:52-05:00"
author = "Lorenzo Piccoli Módolo"
draft = false
+++

{{< device_banner message="👋 Olá! Este post contém visualizações de dados que funcionam melhor no desktop. Fique à vontade para continuar lendo, ou volte mais tarde em uma tela maior para a experiência completa." >}}

{{< table_of_contents >}}

Em fevereiro de 2024, embarquei em uma jornada que eu vinha contemplando há anos. Sempre fui fascinado por coletar dados, visualizá-los e observar padrões na minha vida. Existe algo profundamente satisfatório em olhar para mim mesmo através dos dados.

Inspirado por alguns dos melhores em analytics pessoal - [Nicholas Felton e seus relatórios anuais](http://feltron.com/) e [Felix's how is felix today](https://howisfelix.today) - estabeleci uma meta ambiciosa: até 2025, eu teria um dashboard para visualizar meu ano inteiro. Embora eu ainda não tenha alcançado esse dashboard (ainda está em [desenvolvimento](/projects/lomnia)), consegui coletar uma quantidade impressionante de dados que estou empolgado para compartilhar.

# Os Dados & Lomnia

O que vamos analisar aqui vem de três fontes: dados que venho coletando há algum tempo, dados históricos que consegui recuperar e novos dados que comecei a rastrear em 2024.

Tenho trabalhado em um app/database que chamo de [Lomnia](/projects/lomnia), que agrega informações de self-tracking de várias fontes e facilita a consulta e análise. O [Lomnia](/projects/lomnia) ainda não é open-source porque atualmente é muito específico para meu próprio setup para ser útil para outros. Mas planejo fazer atualizações consistentes e disponibilizá-lo como open-source em algum momento este ano.

{{< stat_grid >}}
{{< stat title="Leituras de Batimentos Cardíacos" value="4.11k" description="Registrado por um Samsung Galaxy Fit3" icon="❤️" >}}
{{< stat title="Localizações Registradas" value="1.86M" description="Registrado pelo Owntracks" icon="🗺️" >}}
{{< stat title="Consultas DNS" value="44.1M" description="Registrado pelo Pihole" icon="☁️" >}}
{{< stat title="Hábitos Registrados" value="13.1k" description="Rastreados manualmente no Obsidian" icon="🧠" >}}
{{< stat title="Registros de Ronco" value="817" description="Registrado por um Samsung Galaxy Fit3" icon="💤" >}}
{{< stat title="Histórico do Clima" value="3.72M" description="Do OpenMeteo" icon="☀️" >}}
{{< stat title="Faixas do Spotify" value="106k" description="Registrado pelo YourSpotify" icon="🎵" >}}
{{< stat title="Transações Financeiras" value="7k" description="Inseridas manualmente em arquivos Beancount" icon="🪙" >}}
{{< /stat_grid >}}

# Localização

Dados de localização são o que mais me empolgam. Seus movimentos contam uma história - onde você esteve, como gasta seu tempo e como seus hábitos evoluem. As possibilidades de análise são infinitas e você pode conseguir algumas visualizações lindas a partir delas.

Desde fevereiro, tenho usado o [Owntracks](https://owntracks.org/) para enviar atualizações de localização a cada poucos segundos para meu [servidor em casa](/projects/selfhosted). Construí um backend personalizado para armazenar essas entradas, embora eu planeje migrar para o [recorder do Owntracks](https://github.com/owntracks/recorder) em algum momento este ano.

Em 2024, pisei em **5 países**, incluindo o Canadá onde moro.

{{< vega_embed id="days-traveling" spec="daysTraveling.json" >}}

{{< vega_embed id="country" spec="countriesVisited.json" >}}

Ter timestamps precisos de entrada e saída para cada país me permite calcular exatamente quanto tempo passei em cada lugar. Embora isso possa parecer redundante para viagens (eu poderia simplesmente verificar as datas dos voos), será útil mais tarde para saber quanto tempo passei em casa em Montreal.

| País           | Tempo Gasto       |
| -------------- | ----------------- |
| Canada         | 299 dias 03:49:14 |
| Brasil         | 40 dias 01:42:12  |
| Estados Unidos | 3 dias 09:24:29   |
| França         | 7 dias 06:46:03   |
| Portugal       | 5 dias 01:09:21   |

# Lugares Visitados

Cada localização rastreada é reverse geocoded usando [Nominatim](https://nominatim.org/). Embora isso ajude com dados em nível de país, ele não sabe como um determinado endereço se relaciona comigo pessoalmente. Para resolver isso, o [Lomnia](/projects/lomnia) usa um arquivo JSON mantido manualmente de "lugares de interesse" - essencialmente um sistema de [geofencing](https://en.wikipedia.org/wiki/Geofence). Isso me permite entender com que frequência visito lugares específicos e quanto tempo passo lá.

Removi algumas informações privadas aqui, mas os dados ainda contam uma história interessante sobre minhas rotinas e os lugares que mais visito.

{{< vega_embed id="visitedPoi" spec="visitedPoi.json" >}}

Calculando o tempo gasto dentro de cada lugar de interesse, posso ver como distribuí meu tempo entre diferentes atividades e locais:

| Lugar de interesse        | Tempo gasto       |
| ------------------------- | ----------------- |
| Casa                      | 244 dias 07:34:58 |
| Airbnb no Brasil          | 14 dias 22:57:09  |
| Escritório                | 9 dias 04:52:29   |
| Chácara                   | 7 dias 11:35:03   |
| Casa dos pais da namorada | 4 dias 06:27:02   |
| Academia de Boulder       | 0 dias 19:52:54   |
| Ginásio de Vôlei          | 0 dias 10:59:26   |

Algumas insights interessantes desses dados:

- "Visitei" minha casa **137 vezes**. Isso significa que saio de casa, em média, uma vez a cada **2 dias** enquanto estou no Canadá. Isso soma mais de **55 dias** de tempo ao ar livre - bastante tempo tocando grama!
- Apesar de gostar toda vez que vou fazer boulder, minha presença tem sido inconsistente. Estou estabelecendo uma meta de pelo menos 52 sessões para o próximo ano
- Minhas visitas ao escritório dão em média **uma a cada 10 dias**, o que corresponde ao que eu teria adivinhado
- Visito a família da minha namorada aproximadamente a cada **9 dias**, totalizando cerca de **11 dias** passados na casa ou na chácara deles

# Música

Uso exclusivamente o Spotify para ouvir música. Embora eu ainda não tenha integrado dados de música no [Lomnia](/projects/lomnia), o INCRÍVEL projeto [YourSpotify](https://github.com/Yooooomi/your_spotify) já fornece tudo que preciso. Recomendo muito dar uma olhada.

Ultimamente senti que não tenho ouvido muita música, embora ela continue sendo parte da minha rotina diária - me ajuda a sair do estado de sonolência matinal e me mantém acordado depois do almoço. Fiquei curioso para saber se os dados confirmariam essa sensação, então olhei em que horário do dia realmente ouço música, e de fato:

{{< vega_embed id="songsPerHoursOfDay" spec="songsPerHoursOfDay.json" >}}

Minhas estatísticas musicais de 2024:

- **30.155 minutos** de música (quase 21 dias de audição contínua)
- Artista mais tocado: **Vulfpeck** com 1.854 reproduções (cerca de 20% do meu tempo total de audição)
- Explorei **880 artistas diferentes**

Isso ainda não respondeu se minha sensação de ouvir menos música estava correta, então puxei meus números históricos:

{{< vega_embed id="songsPerMonth" spec="songsPerMonth.json" >}}

_A grande lacuna é de quando mudei temporariamente para o Youtube Music_

Achei muito interessante que meu padrão de audição é muito cíclico ao longo dos anos.

A segunda metade de 2024 mostra não apenas números consistentemente mais baixos, mas também menos variedade - menos músicas e menos exploração. Estou curioso para ver se isso é apenas uma fase temporária ou uma mudança de longo prazo.

Olhando especificamente para 2024, meu dia de pico foi **8 de junho com 127 músicas**. Este heatmap mostra claramente a tendência de declínio na segunda metade do ano:

{{< vega_embed id="songsHeatmap" spec="songsHeatmap.json" >}}

Meus top 3 artistas de 2024:

| Nome do artista | Músicas ouvidas | Tempo Total de Audição |
| --------------- | --------------- | ---------------------- |
| Vulfpeck        | 1854 (21.26%)   | 6264:43 (20.77%)       |
| Los Hermanos    | 871 (9.99%)     | 2745:27 (9.1%)         |
| Mac Miller      | 249 (2.85%)     | 1007:30 (3.34%)        |

# Clima

O que me atrai no rastreamento de dados climáticos é a capacidade de colocar experiências em perspectiva. Claro, hoje pode parecer particularmente chuvoso, mas como isso se compara ao que já experimentei no passado?

{{< vega_embed id="temperatureLine" spec="temperatureLine.json" >}}

Alguns destaques do clima em 2024:

- **Temperatura mais baixa: -26°C** na manhã de Natal na chácara
- **Temperatura mais alta: 38°C** em 1º de fevereiro na minha cidade natal no Brasil
- A viagem ao Brasil criou uma variação dramática de 50°C quando voltei para Montreal no final de abril
- Acumulou **97cm de neve** e **1348mm de chuva** ao longo do ano

Enquanto explorava dados de chuva, pensei que tinha encontrado um bug quando vi este gráfico:

{{< vega_embed id="rainPerDay" spec="rainPerDay.json" >}}

Quando vi o grande ponto em 9 de agosto, tinha certeza que havia cometido um erro. Na verdade, não era um bug - 9 de agosto foi [o dia mais chuvoso já registrado em Montreal, graças à Tempestade Tropical Debby](https://www.theweathernetwork.com/en/news/weather/forecasts/flooding-expected-as-tropical-rains-target-ontario-quebec).

A distribuição de neve é menos dramática, em parte porque eu estava no Brasil durante a alta temporada de neve. O dia mais nevado que experimentei foi [4 de abril](https://www.cbc.ca/news/canada/montreal/april-snowstorm-montreal-1.7164443):

{{< vega_embed id="snowPerDay" spec="snowPerDay.json" >}}

# Sono

O rastreamento do sono me fascina porque mudanças nos padrões de sono podem ser tanto causa quanto efeito de eventos da vida. Tenho rastreado o sono desde 2023, primeiro manualmente e depois via smartwatch a partir de 2024.

Para 2025, planejo correlacionar melhor os padrões de sono com hábitos. Por exemplo, meu período consistentemente mais curto de sono no final de julho provavelmente está relacionado a mudanças no trabalho, mas gostaria de ter melhores dados sobre como isso afetou meu humor e se houve outros aspectos da minha vida que foram afetados por isso.

{{< vega_embed id="sleepHours" spec="sleepHours.json" >}}

Desde 2023, tenho avaliado manualmente a qualidade do meu sono. Depois de conseguir meu relógio em junho, comecei a comparar minhas pontuações subjetivas com as medições do relógio. Os dados mostram uma desconexão interessante - meu relógio tende a ser mais otimista sobre a qualidade do meu sono do que eu:

{{< vega_embed id="sleepScoreDistribution" spec="sleepScoreDistribution.json" >}}

{{< vega_embed id="sleepScoreDistribution2023" spec="sleepScoreDistribution2023.json" >}}

Isso se alinha com minha suspeita de que o relógio é um pouco generoso com sua pontuação - frequentemente classificando noites como "boas" quando eu não me sentia particularmente bem descansado.

Alguns destaques do sono:

- **Sono mais longo: 11 horas** em 2 de fevereiro - curiosamente, meu diário registra que foi um dia excepcionalmente produtivo. Talvez haja uma lição aí para 2025!
- **Sono mais curto: 11 de julho** durante um atraso de 10 horas no voo de Lisboa para Montreal, pegando apenas cochilos rápidos nas cadeiras do aeroporto
- **Total de sono em 2024: 111d 11h 4m**
- **Média diária: 7h 25m 50s** (ligeiramente abaixo da minha média histórica de 7h 40m)

# Hábitos

Meu consumo de café se tornou mais consciente desde que percebi que a cafeína à tarde afeta notavelmente meu sono (**chocante**, eu sei!). Os dados mostram uma ingestão de cafeína mais consistente a partir de setembro:

{{< vega_embed id="coffeePerDay" spec="coffeePerDay.json" >}}

Também rastreio minhas idas diárias ao banheiro 💩:
{{< vega_embed id="poopPerDay" spec="poopPerDay.json" >}}

Não há muito para analisar aqui, exceto que: sim, fiquei doente durante minha viagem ao Brasil e isso me rendeu um recorde de **10 visitas em 14 de fevereiro** - um recorde que espero que continue inquebrável em 2025!

Quando peguei COVID em 2023, experimentei [Long Covid e Brain Fog](https://www.health.harvard.edu/blog/what-is-covid-19-brain-fog-and-how-can-you-clear-it-2021030822076). Quando olho para como tenho avaliado a quantidade de brain fog que experimento, sempre gosto de olhar os dados históricos, pois coloca em perspectiva o quanto progredi na recuperação:

{{< vega_embed id="brainFogAllTime" spec="brainFogAllTime.json" >}}

{{< vega_embed id="brainFogAllTimeDistribution" spec="brainFogAllTimeDistribution.json" >}}

Outros destaques do rastreamento de hábitos de 2024:

- Liguei para minha mãe **37 vezes** e avó **17 vezes** (embora possa ter esquecido de registrar algumas ligações)
- Passeei com o cachorro da família da minha namorada **47 vezes**

# Finanças

Desde abril de 2019, tenho registrado cada transação não-monetária em arquivos beancount - uma linguagem de contabilidade de entrada dupla por computador para registros financeiros. Construí importadores personalizados e uma [extensão do navegador](/projects/ws-exporter) para coletar dados dos meus bancos. Embora isso ainda não esteja integrado ao [Lomnia](/projects/lomnia), uso o [Fava](https://github.com/beancount/fava) para análise.

Embora eu mantenha a maioria dos detalhes financeiros privados, aqui está como meus gastos se dividiram por categoria. Trabalhar nisso me fez perceber que as viagens que fiz em 2024 realmente fizeram uma diferença, já que gastei quase tanto nisso quanto em aluguel:

{{< vega_embed id="financesCategories" spec="financesCategories.json" >}}

# Próximos Passos

Para 2025, tenho quatro objetivos principais:

1. Melhorar o rastreamento de hábitos com um app dedicado, mantendo o Obsidian puramente para anotações em texto
2. Melhorar o rastreamento da minha vida online (histórico do navegador, apps usados, tempo de tela, etc...)
3. Construir uma biblioteca [ECharts](https://echarts.apache.org/) no Lomnia para simplificar a criação desse tipo de post de análise - este levou um esforço considerável para preparar!
4. Aprimorar o reverse geocoding do [Lomnia](/projects/lomnia) e simplificar o processo de adicionar lugares de interesse
