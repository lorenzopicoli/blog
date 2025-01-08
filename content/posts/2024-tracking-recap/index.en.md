+++
title = "I tracked everything I could in 2024, here's the data"
date = "2025-01-03T18:24:52-05:00"
author = "Lorenzo Piccoli Módolo"
draft = false
+++

{{< table_of_contents >}}

Bla bla bal

I decided that I wanted to start tracking every aspect of my life that I could. Inspired by some of the best: [Nicholas Felton and his yearly reports](http://feltron.com/) and by [Felix and howisfelixtoday](https://howisfelix.today) I set myself a goal that by 2025 I would have a dashboard to look and visualize my year. Well I didn't manage to get that dashboard up and running, it's still a [work in progress](https://lorenzomodolo.com/projects/lomnia), but I did accomplish to track a lot of data that I'm excited to share.

So sit back and relax, this will be a long one, but I'll leave a table of contents here if you want to skip any sections.

# Location

Starting in February I have been tracking my location by sending updates every few seconds to my server at home with [Owntracks](https://owntracks.org/).

In 2024 I visited a total of 5 countries! Here's them highlighted on the map. (Spain is highlighted, but I just flew over it)

{{< vega_embed id="country" spec="countriesVisited.json" >}}

It's also fun to visualize the trips in a chart like GitHub's contribution chart.

{{< vega_embed id="days-traveling" spec="daysTraveling.json" >}}

Given that I have information about when I entered and left each country I have visited, I can calculate how much time I spent in each one of them. This is not as useful for trips since I can simply for plane tickets dates, but it's a way to enhance other metrics by knowing how much time I have spent at home (in Montreal).

| Country       | Time Spent        |
| ------------- | ----------------- |
| Canada        | 299 days 03:49:14 |
| Brazil        | 40 days           |
| United States | 3 days 09:24:29   |
| France        | 7 days 06:46:03   |
| Portugal      | 5 days 01:09:21   |

## Places Visited

Every location that I track gets reverse geocoded using Nominatim. Which is super cool and helps me find out some of the country information I used in the previous section. The problem is that just Nominatim isn't super useful since it doesn't know that a certain address is my climbing gym for example. So to help with that, Lomnia also takes into consideration a JSON file that I maintain with what I call _places of interest_ which is simply geofencing. With that, I can get some insight into how much I have visited and how time I have spent in these places of interest.

Here's a simplified and smaller version of how that information looks like:

| Place of interest           | Time Spent in there |
| --------------------------- | ------------------- |
| Home                        | 244 days 07:34:58   |
| Airbnb In Brazil            | 14 days 22:57:09    |
| Office                      | 9 days 04:52:29     |
| Cottage                     | 7 days 11:35:03     |
| Girlfriend's parents' house | 4 days 06:27:02     |
| Bouldering Gym              | 0 days 19:52:54     |
| Volleyball Gym              | 0 days 10:59:26     |

{{< vega_embed id="visitedPoi" spec="visitedPoi.json" >}}

Some cool nuggets of information from the data above:

- I've "visited" my home 137 times. With that we can deduct that I leave the house, on average, once every 2 days for the time that I spent in Canada.
- Out of the 300 days in Canada, I spent the equivalent of 55 days outside touching grass.
- I've gone bouldering 21 times which added up to 19 hours of struggling to do V3s
- I've gone to the office 30 times out of the 300 days that I've been in Canada. Which means that I go, on average, once every 10 days
- I have visited my girlfriend's family once every 9 days. Which added up to a bit over 11 days of time spent at their house or cottage.

# Music

I only use Spotify to listen to music. I haven't integrated data collection to [[Lomnia]] yet, because the amazing YouSpotify project already provides all the data that I would need and I highly recommend you to check it out.

My daily listening distribution highlights how I use music to get me in the zone to work or to snap out of the morning sleepiness:

{{< vega_embed id="songsPerHoursOfDay" spec="songsPerHoursOfDay.json" >}}

In 2024 I:

- Listed to 30155 minutes of music. That is just shy is 21 days of music playing in my years
- My most listened artist was Vulfpeck with a whopping 1854 songs listened. Around 20% of my time listening to music was spent listening to Vulfpeck
- I listened to 880 different artists

I don't usually listen to music when I'm traveling and that is reflected in the next chart. You can clearly tell that I was traveling in February and in July.

I was surprised to see, that after the trip to Europe in July I haven't been listening to as much music as I did before. The ratio of unique songs to the total songs has also changed after the trip, hinting that I have been listening to fewer songs and repeating them less often.

{{< vega_embed id="songsPerMonth" spec="songsPerMonth.json" >}}

On the 8th of June I listened to a total 127 which was my most musical day in 2024. Putting the data into a heatmap also clearly shows this trend of listening to less music towards the latter half of the year

{{< vega_embed id="songsHeatmap" spec="songsHeatmap.json" >}}

My top artists are

| Artist name                | Songs listened | Total Listened Time |
| -------------------------- | -------------- | ------------------- |
| Vulfpeck                   | 1854 (21.26%)  | 6264:43 (20.77%)    |
| Los Hermanos               | 871 (9.99%)    | 2745:27 (9.1%)      |
| Mac Miller                 | 249 (2.85%)    | 1007:30 (3.34%)     |
| Seu Pereira e Coletivo 401 | 234 (2.68%)    | 889:28 (2.94%)      |
| Kanye West                 | 179 (2.05%)    | 707:38 (2.34%)      |
| Pomplamoose                | 177 (2.03%)    | 516:05 (1.71%)      |
| Bruno Mars                 | 142 (1.62%)    | 484:39 (1.6%)       |
| Daft Punk                  | 140 (1.6%)     | 713:20 (2.36%)      |
| Djonga                     | 118 (1.35%)    | 428:12 (1.42%)      |

# Weather

In 2024 the lowest temperature I experienced was -26C on Christmas morning in a cottage at the Laurentides (close to Montreal, Canada).
The highest temperature was 38C on February 1st while visiting my home town in Brazil.

The Brazil trip is what explains the sudden drop at the end of April when I experienced a difference of almost 50C when I came back to Montreal.

{{< vega_embed id="temperatureLine" spec="temperatureLine.json" >}}

Throughout the year I've experience a total of 97cm of snow fall and 1348mm of rain fall.

While exploring the amount of rain I've experienced daily, I thought I had found a bug with my data when I saw the following chart:

{{< vega_embed id="rainPerDay" spec="rainPerDay.json" >}}

But as it turns out it wasn't a bug. August 9th was [Montreal's wettest day ever recorded as a consequence of the Tropical Storm Debby](https://www.theweathernetwork.com/en/news/weather/forecasts/flooding-expected-as-tropical-rains-target-ontario-quebec)

The snow version of the rain map is less exciting as I was in Brazil for a big chunk of the first few months of the year

{{< vega_embed id="snowPerDay" spec="snowPerDay.json" >}}

The snowiest day I experencied was [April 4th](https://www.cbc.ca/news/canada/montreal/april-snowstorm-montreal-1.7164443)

# Sleep

{{< vega_embed id="sleepHours" spec="sleepHours.json" >}}

Since 2023 I've been giving a score of my previous night of sleep. In June, after I bought my watch I started tracking the sleep score that the watch would give to my previous night. According to the data the vast majority of my nights are great:

{{< vega_embed id="sleepScoreDistribution" spec="sleepScoreDistribution.json" >}}

But I don't know if I love the chart above for two reasons. First if I look at 2023, when I scored my perception of how my night of sleep went, I see a very different distribution:

{{< vega_embed id="sleepScoreDistribution2023" spec="sleepScoreDistribution2023.json" >}}

Which aligns with my feeling that my watch gives out good scores to nights where I didn't wake up feeling too rested.

- The day that I slept the most was on February 2nd when I slept for 11 hours straight. Checking on my diary I actually had written that I slept a lot, but I also remarked that it was a super productive day. So maybe I should do more of those in 2025 :)
- The day that I slept the least was on July 11th when the flight I was taking from Lisbon to Montreal was delayed by 10 hours and all I got was a couple hours of sleep at the airport chair
- I'm not a big napper, but since I got my smart watch in June, it has recorded only 4 naps which sounds reasonable though I'm not sure of the accuracy. It amounted to a total of 3h 38m
- I slept a total of 111d 11h 4m in 2024!
- The average time spent sleeping in 2024 was 7h 25min 50seg per day. Which is just bellow the 7h 40min average since I started recording

# Habits

I've been really good at keeping my coffee drinking to a minimum. I've noticed at some point this year that drinking coffee in the afternoon started noticeably affecting my sleep (shocker, I know!). I believe that explains how the caffeine intake was more consistently low starting in september

{{< vega_embed id="coffeePerDay" spec="coffeePerDay.json" >}}

I also track how many times I _answer nature’s call_ 💩 in a day:
{{< vega_embed id="poopPerDay" spec="poopPerDay.json" >}}

Yes, I got sick in February and it granted me a record of 10 bathroom visits on February 14!

All timne brain fog:

{{< vega_embed id="brainFogAllTime" spec="brainFogAllTime.json" >}}

Which leaves my all-time brain fog distribution looking like this:

{{< vega_embed id="brainFogAllTimeDistribution" spec="brainFogAllTimeDistribution.json" >}}

I called my mom a total of 37 times in 2024 and my grandmother's 17 times.

We also take care of my girlfriend's family dog every once in a while, which totalled 47 dog walks in 2024!

# Meta

| Metric                                 | Total |
| -------------------------------------- | ----- |
| Heart rate readings cumulative total   | 4.11k |
| Locations logged cumulative total      | 1.86M |
| DNS queries cumulative total           | 44.1M |
| Habits logged cumulative total         | 13.1k |
| Snoring entries cumulative total       | 817   |
| Obsidian File Entries Cumulative Total | 1.22k |
| Spotify recorded listened tracks       | 106k  |
| Financial Transactions Recorded        | 7k    |

{{< vega_embed id="financesCategories" spec="financesCategories.json" >}}
