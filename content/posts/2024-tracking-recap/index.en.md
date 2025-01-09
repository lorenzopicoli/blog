+++
title = "I tracked everything I could in 2024, here's the data"
date = "2025-01-03T18:24:52-05:00"
author = "Lorenzo Piccoli Módolo"
draft = false
+++

{{< table_of_contents >}}

In february 2024 I embarked on a journey that I've been contemplating for many years now. I've always been fascinated with collecting data, visualising it and looking back at it.

I decided that I wanted to start tracking every aspect of my life that I could. Inspired by some of the best: [Nicholas Felton and his yearly reports](http://feltron.com/) and by [Felix and howisfelixtoday](https://howisfelix.today) I set myself a goal that by 2025 I would have a dashboard to look and visualize my year. Well I didn't manage to get that dashboard up and running, it's still a [work in progress](https://lorenzomodolo.com/projects/lomnia), but I did accomplish to track a lot of data that I'm excited to share.

# The Data & Lomnia

The data that we'll be analyzing is a result data that I have been collecting for a while, historical data that I could recover and data that I started collecting in 2024.

I've been working on a app/database that I call [Lomnia](/projects/lomnia) which aggregates information from multiple sources and makes it easy to query or analyze it. [Lomnia](/projects/lomnia) isn't yet open-source because it is super specific to my own setup to the point where it's not useful to anyone else. But I plan on making consistent updates on it and open-source it at some point this year.

{{< stat_grid >}}
{{< stat title="Heart Rate Readings" value="4.11k" description="Recorded by a Samsung Galaxy Fit3" icon="❤️" >}}
{{< stat title="Locations Logged" value="1.86M" description="Recorded by Owntracks" icon="🗺️" >}}
{{< stat title="DNS Queries" value="44.1M" description="Recorded by Pihole" icon="☁️" >}}
{{< stat title="Habits Logged" value="13.1k" description="Manually tracked on Obsidian" icon="🧠" >}}
{{< stat title="Snoring Entries" value="817" description="Recorded by a Samsung Galaxy Fit3" icon="💤" >}}
{{< stat title="Historical Weather" value="3.72M" description="From OpenMeteo" icon="☀️" >}}
{{< stat title="Spotify Tracks" value="106k" description="Recorded by YourSpotify" icon="🎵" >}}
{{< stat title="Financial Transactions" value="7k" description="Manually entered in Beancount files" icon="🪙" >}}
{{< /stat_grid >}}

# Location

The kind of data that makes me the most excited to start recording is Location data. We can tell so much about a person by how much they've traveled, where they were at any given point and the kind of stats and charts you can get from it are super exciting.

Starting in February I have been tracking my location by sending updates every few seconds to my server at home with [Owntracks](https://owntracks.org/). I have a backend that I coded myself which stores the location entries in a database, but I plan on moving to [Owntrack's recorder](https://github.com/owntracks/recorder) at some point this year.

In 2024 I visited a total of **5 countries**, including the country where I live in (Canada).

{{< vega_embed id="days-traveling" spec="daysTraveling.json" >}}

{{< vega_embed id="country" spec="countriesVisited.json" >}}

Given that I have information about when I entered and left each country I have visited, I can calculate how much time I spent in each one of them. This is not as useful for trips since I can simply for plane tickets dates, but it's a way to enhance other metrics by knowing how much time I have spent at home (in Montreal).

| Country       | Time Spent        |
| ------------- | ----------------- |
| Canada        | 299 days 03:49:14 |
| Brazil        | 40 days 01:42:12  |
| United States | 3 days 09:24:29   |
| France        | 7 days 06:46:03   |
| Portugal      | 5 days 01:09:21   |

# Places Visited

Every location that I track gets reverse geocoded using [Nominatim](https://nominatim.org/). Which is super cool and helps me find out some of the country information I used in the previous section. The problem is that just Nominatim isn't super useful since it doesn't know that a certain address is my climbing gym for example. So to help with that, [Lomnia](/projects/lomnia) also takes into consideration a JSON file that I maintain with what I call **places of interest** which is simply [geofencing](https://en.wikipedia.org/wiki/Geofence). With that, I can get some insight into how much I have visited and how time I have spent in these places of interest.

In this section I have to remove some information that I prefer not to make public, but by adding information I can effectively tell how much time I've spent anywhere relevant to me.

{{< vega_embed id="visitedPoi" spec="visitedPoi.json" >}}

And by calculating how long I stood inside the geofencing radius, I can calculate how much time I spent doing activities or with whom I spent time with

| Place of interest           | Time Spent in there |
| --------------------------- | ------------------- |
| Home                        | 244 days 07:34:58   |
| Airbnb In Brazil            | 14 days 22:57:09    |
| Office                      | 9 days 04:52:29     |
| Cottage                     | 7 days 11:35:03     |
| Girlfriend's parents' house | 4 days 06:27:02     |
| Bouldering Gym              | 0 days 19:52:54     |
| Volleyball Gym              | 0 days 10:59:26     |

Some cool nuggets of information from the data above:

- I've "visited" my home **137 times**. With that we can deduct that I leave the house, on average, once every **2 days** for the time that I spent in Canada. That added up to over **55 days outside**, touching grass
- I really enjoy bouldering, but I've been terribly inconsistent at it. I want to go at least 52 times next year
- **One office visit every 10 days** is spot on with what I would've guessed since I rarely go twice a week, but also try to go once a week
- I have visited my girlfriend's family once every **9 days**. Which added up to a bit over **11 days of time spent at their house or cottage**.

# Music

I only use Spotify to listen to music. I haven't integrated data collection to [Lomnia](/projects/lomnia) yet, because the amazing [YourSpotify](https://github.com/Yooooomi/your_spotify) project already provides all the data that I would need and I highly recommend you to check it out.

Lately I felt like I haven't listened to much music, but I always put on something good when I need to wake up in the morning or when I need help not falling asleep after lunch. So I was curious at what time of the day I listened to music and sure enough:

{{< vega_embed id="songsPerHoursOfDay" spec="songsPerHoursOfDay.json" >}}

In 2024 I:

- **Listed to 30155** minutes of music. That is just shy is 21 days of music playing in my ears
- My most listened artist was **Vulfpeck** with a whopping 1854 songs listened. Around 20% of my time listening to music was spent listening to Vulfpeck
- I listened to **880 different artists**

Next I wanted to see if my feeling that I haven't been listening to too much music is backed up by data. For that I pulled up my all time listening numbers:

{{< vega_embed id="songsPerMonth" spec="songsPerMonth.json" >}}

It was very interesing to see that I listen to music is really cyclical, but in the later half of 2024 it has not only been consistently low, but also lacking variety. I have been listening to fewer songs and I haven't been exploring much.

I don't necessarily want to change that in 2025, but it'll be cool to see if it's just a longer cycle or something that will last longer.

---

We looked at hours of the day and monthly listening patterns. But what about 2024 specifically?

On the **8th of June I listened to a total 127 songs** which was my most musical day in 2024. Putting the data into a heatmap also clearly shows this trend of listening to less music towards the latter half of the year

{{< vega_embed id="songsHeatmap" spec="songsHeatmap.json" >}}

In case you're curious, for 2024, my top 3 artists are:

| Artist name  | Songs listened | Total Listened Time |
| ------------ | -------------- | ------------------- |
| Vulfpeck     | 1854 (21.26%)  | 6264:43 (20.77%)    |
| Los Hermanos | 871 (9.99%)    | 2745:27 (9.1%)      |
| Mac Miller   | 249 (2.85%)    | 1007:30 (3.34%)     |

# Weather

My goal with tracking weather information is to be able to put things into comparission. Sure, it rained a lot today, but have I seen worse? I can always go back and look at the data.

{{< vega_embed id="temperatureLine" spec="temperatureLine.json" >}}

- In 2024 the **lowest temperature I experienced was -26C** on Christmas morning at the cottage. The** highest temperature was 38C** on February 1st while visiting my home town in Brazil.
- The Brazil trip is what explains the sudden drop at the end of April when I experienced a difference of almost 50C when I came back to Montreal.
- Throughout the year I've experience a total of **97cm of snow fall** and **1348mm of rain fall**.

While exploring the amount of rain I've experienced daily, I thought I had found a bug with my data when I saw the following chart:

{{< vega_embed id="rainPerDay" spec="rainPerDay.json" >}}

I was sure that I had double logged August 9th or something of that nature. But as it turns out it wasn't a bug. August 9th was [Montreal's wettest day ever recorded as a consequence of the Tropical Storm Debby](https://www.theweathernetwork.com/en/news/weather/forecasts/flooding-expected-as-tropical-rains-target-ontario-quebec).

The snow version of the rain map is less exciting as I was in Brazil for a big chunk of the first few months of the year and there hasn't been any crazy snowstorms this year. The snowiest day I experencied was [April 4th](https://www.cbc.ca/news/canada/montreal/april-snowstorm-montreal-1.7164443)

{{< vega_embed id="snowPerDay" spec="snowPerDay.json" >}}

# Sleep

Tracking my sleep, similarly to location, is very exciting to me. Changes in this pattern can be the cause or the consequence of things going on in my life. I've been tracking this data since 2023, but until I bought a smart watch in 2024 I was recording it manually.
In 2025 I hope to improve my habit tracking and be able to better correlate changes in my sleeping patterns with habit choices. Like for example towards the end of July where I was consistently sleeping less than usual is probably related to some changes that were happening at work, but I can't remember now how that affected my mood.

{{< vega_embed id="sleepHours" spec="sleepHours.json" >}}

Since 2023 I've been giving a score of my previous night of sleep. In June, after I bought my watch I started tracking the sleep score that the watch would give to my previous night. According to the data the vast majority of my nights are great, but I don't know if I trust the score that my watch gives to my night because if I look at 2023, when I manually rated my perception of how my night of sleep went, I see a very different distribution:

{{< vega_embed id="sleepScoreDistribution" spec="sleepScoreDistribution.json" >}}

{{< vega_embed id="sleepScoreDistribution2023" spec="sleepScoreDistribution2023.json" >}}

Which aligns with my feeling that my watch gives out good scores to nights where I didn't wake up feeling too rested.

Some general sleeping stats:

- **The day that I slept the most was on February 2nd** when **I slept for 11 hours straight**. Checking on my diary I actually had written that I slept a lot, but I also remarked that it was a super productive day. So maybe I should do more of those in 2025 :)
- **The day that I slept the least was on July 11th** when the flight I was taking from Lisbon to Montreal was delayed by 10 hours and all I got was a couple hours of sleep at the airport chair
- I slept a total of **111d 11h 4m** in 2024!
- The average time spent sleeping in 2024 was **7h 25min 50seg per day**. Which is just bellow the 7h 40min average since I started recording

# Habits

I've been really good at keeping my coffee drinking to a minimum. I've noticed at some point this year that drinking coffee in the afternoon started noticeably affecting my sleep (**shocker**, I know!). I believe that explains how the caffeine intake was more consistently low starting in september

{{< vega_embed id="coffeePerDay" spec="coffeePerDay.json" >}}

I also track how many times I _answer nature’s call_ 💩 in a day:
{{< vega_embed id="poopPerDay" spec="poopPerDay.json" >}}

There's not much to dissect on the previous chart except to clarify that yes, I got sick in February and it granted me a record of **10 bathroom visits on February 14**! That's one record I hope to not break in 2025.

When I first caught covid in 2023, I was one of the lucky ones that got stuck with [Long Covid and Brain Fog](https://www.health.harvard.edu/blog/what-is-covid-19-brain-fog-and-how-can-you-clear-it-2021030822076). That's actually what prompted me to start recording my mood, how well I slept and most of the metrics that I have dating back to 2023. So when looking at how intense my brain fog has been, I like to always check the all time data as it really puts into perspective how far I have come recovering from it.

{{< vega_embed id="brainFogAllTime" spec="brainFogAllTime.json" >}}

{{< vega_embed id="brainFogAllTimeDistribution" spec="brainFogAllTimeDistribution.json" >}}

---

I track some other habits for which I haven't taken the time to visualize yet, but some small stats that I gathered are:

- In 2024, I called my mom a total of **37 times** and my grandmother's **17 times**. These numbers might be a bit off as it relies on my manual tracking and it's easy to forget
- We also take care of my girlfriend's family dog every once in a while, which totalled **47 dog walks** in 2024\*\*!

# Finances

Every single non-cash transaction that I have made since April 2019 has been recorded and saved in beancount files. Beancount is a double-entry bookkeeping computer language that lets you define financial transaction records in a text file. I have built my own importers and [browser extension](/projects/ws-exporter) to acrquire data and though I haven't ingested the data yet in [Lomnia](/projects/lomnia) I can use [Fava](https://github.com/beancount/fava) to explore it.

Unfortunately a lot of the stats would expose my financial information which I would rather keep private, but I can share how my I spent my money on each category. It really goes to show that all the trips that I've made in 2024 really made a dent as I spent almost as much as it as I did on rent

{{< vega_embed id="financesCategories" spec="financesCategories.json" >}}

# Next Steps

For 2025 I want to improve my habit tracking with some sort of app that makes it easier for me to track my habits more often throughout the day. I want Obsidian to simply be for text and not over complicate it.

I want to improve how [Lomnia's](/projects/lomnia) reverse geocoding works and also make it easier for me to add more and more places of interest as I can see that the data I get from them is very pleasant to analyze.

Last, but not least, I want to start building a library of [ECharts](https://echarts.apache.org/) in Lomnia to make it easier to do this type of post. This was a lot of work to get all the data and the charts ready.
