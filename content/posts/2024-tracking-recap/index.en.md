+++
title = "I tracked everything I could in 2024, here's the data"
date = "2025-01-08T18:24:52-05:00"
author = "Lorenzo Piccoli Módolo"
draft = false
+++

{{< device_banner message="👋 Hi there! This post contains data visualizations that work best on desktop. Feel free to read on, or come back later on a larger screen for the full experience." >}}
{{< table_of_contents >}}

In February 2024, I embarked on a journey that I'd been contemplating for many years. I've always been fascinated with collecting data, visualising it, and looking back at patterns in my life. There's something deeply satisfying about looking at myself through data.

Inspired by some of the best in personal analytics - [Nicholas Felton and his yearly reports](http://feltron.com/) and [Felix's how is felix today](https://howisfelix.today) - I set myself an ambitious goal: by 2025, I would have a dashboard to visualize my entire year. While I haven't quite achieved that dashboard yet (it's still a [work in progress](/projects/lomnia)), I did manage to collect an impressive amount of data that I'm excited to share.

# The Data & Lomnia

What we'll be analyzing here comes from three sources: data I've been collecting for a while, historical data I managed to recover, and new data points I started tracking in 2024.

I've been working on an app/database that I call [Lomnia](/projects/lomnia) which aggregates self-tracking information from multiple sources and makes it easy to query and analyze. [Lomnia](/projects/lomnia) isn't open-source yet because it's currently too specific to my own setup to be useful to others. But I plan on making consistent updates and open-sourcing it at some point this year.

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

Location data is what excites me the most. Your location data says a lot about you - where you've been, how you spend your time, and how your habits evolve. The possibilities for analysis are endless and you can get some beautiful visualizations out of it

Since February, I've been using [Owntracks](https://owntracks.org/) to send location updates every few seconds to my [home server](/projects/selfhosted). I built a custom backend to store these entries, though I'm planning to migrate to [Owntrack's recorder](https://github.com/owntracks/recorder) sometime this year.

In 2024, I set foot on **5 countries**, including Canada where I live.

{{< vega_embed id="days-traveling" spec="daysTraveling.json" >}}

{{< vega_embed id="country" spec="countriesVisited.json" >}}

Having precise entry and exit timestamps for each country lets me calculate exactly how much time I spent in each place. While this might seem redundant for trips (I could just check flight dates), it'll come in handy later on to know how much time I've spent at home in Montreal.

| Country       | Time Spent        |
| ------------- | ----------------- |
| Canada        | 299 days 03:49:14 |
| Brazil        | 40 days 01:42:12  |
| United States | 3 days 09:24:29   |
| France        | 7 days 06:46:03   |
| Portugal      | 5 days 01:09:21   |

# Places Visited

Every tracked location gets reverse geocoded using [Nominatim](https://nominatim.org/). While this helps with country-level data, it doesn't know that how a certain address relates to me personally. To solve this, [Lomnia](/projects/lomnia) uses a manually maintained JSON file of "places of interest" - essentially a [geofencing](https://en.wikipedia.org/wiki/Geofence) system. This lets me understand how often I visit specific places and how much time I spend there.

I've removed some private information here, but the data still tells an interesting story about my routines and the places I visit the most.

{{< vega_embed id="visitedPoi" spec="visitedPoi.json" >}}

By calculating time spent within each place of interest, I can see how I've distributed my time across different activities and locations:

| Place of interest           | Time Spent in there |
| --------------------------- | ------------------- |
| Home                        | 244 days 07:34:58   |
| Airbnb In Brazil            | 14 days 22:57:09    |
| Office                      | 9 days 04:52:29     |
| Cottage                     | 7 days 11:35:03     |
| Girlfriend's parents' house | 4 days 06:27:02     |
| Bouldering Gym              | 0 days 19:52:54     |
| Volleyball Gym              | 0 days 10:59:26     |

Some interesting insights from this data:

- I've "visited" my home **137 times**. This means I leave the house, on average, once every **2 days** while in Canada. That adds up to over **55 days** of outdoor time - plenty of time touching grass!
- Despite enjoying every time I go bouldering, my attendance has been inconsistent. I'm setting a goal of at least 52 sessions for next year
- My office visits average to **one every 10 days**, which matches what I would've guessed
- I visit my girlfriend's family roughly every **9 days**, totalling about **11 days** spent at their house or cottage

# Music

I exclusively use Spotify to listen to music. While I haven't integrated music data into [Lomnia](/projects/lomnia) yet, the AWESOME [YourSpotify](https://github.com/Yooooomi/your_spotify) project already provides everything I need. I highly recommend checking it out.

Lately I felt like I haven't listened to much music, though it continued being part of my daily routine - it helps snap me out of morning grogginess and keeps me from dozing off after lunch. I was curious if the data would back up this feeling, so for that I looked at what time of day I actually listen to music, and sure enough:

{{< vega_embed id="songsPerHoursOfDay" spec="songsPerHoursOfDay.json" >}}

My 2024 music stats:

- **30,155 minutes** of music (nearly 21 days of continuous listening)
- Most played artist: **Vulfpeck** with 1,854 plays (about 20% of my total listening time)
- Explored **880 different artists**

That still didn't answer whether my feeling about listening to less music was accurate, so I pulled my all-time numbers:

{{< vega_embed id="songsPerMonth" spec="songsPerMonth.json" >}}

_The big gap is when I temporarily switched to Youtube Music_

---

I found it very interesting that my listening pattern is very cyclical throughout the years.

The latter half of 2024 shows not just consistently lower numbers but also less variety - fewer songs and less exploration. I'm curious to see if this is just a temporary phase or a longer-term shift.

Looking specifically at 2024, my peak listening day was **June 8th with 127 songs**. This heatmap clearly shows the declining trend in the year's second half:

{{< vega_embed id="songsHeatmap" spec="songsHeatmap.json" >}}

My top 3 artists for 2024:

| Artist name  | Songs listened | Total Listened Time |
| ------------ | -------------- | ------------------- |
| Vulfpeck     | 1854 (21.26%)  | 6264:43 (20.77%)    |
| Los Hermanos | 871 (9.99%)    | 2745:27 (9.1%)      |
| Mac Miller   | 249 (2.85%)    | 1007:30 (3.34%)     |

# Weather

What attracts me to tracking weather data is the ability to put experiences in perspective. Sure, today might feel particularly rainy, but how does it compare to what I've experienced in the past?

{{< vega_embed id="temperatureLine" spec="temperatureLine.json" >}}

Some weather highlights from 2024:

- **Lowest temperature: -26°C (-14.8°F)** on Christmas morning at the cottage
- **Highest temperature: 38°C (100.4°F)** on February 1st in my Brazilian hometown
- The Brazil trip created a dramatic 50°C (122°F) swing when I returned to Montreal in late April
- Accumulated **97cm (38in) of snow** and **1348mm (53in) of rain** throughout the year

While exploring rainfall data, I thought I'd found a bug when I saw this chart:

{{< vega_embed id="rainPerDay" spec="rainPerDay.json" >}}

When I saw the big dot on August 9th I was sure I had made a mistake. Turns out it wasn't a bug - August 9th was [Montreal's wettest day ever recorded, thanks to Tropical Storm Debby](https://www.theweathernetwork.com/en/news/weather/forecasts/flooding-expected-as-tropical-rains-target-ontario-quebec).

The snow distribution is less dramatic, partly because I was in Brazil during prime snow season. The snowiest day I experienced was [April 4th](https://www.cbc.ca/news/canada/montreal/april-snowstorm-montreal-1.7164443):

{{< vega_embed id="snowPerDay" spec="snowPerDay.json" >}}

# Sleep

Sleep tracking fascinates me because changes in sleep patterns can be both cause and effect of life events. I've tracked sleep since 2023, first manually and then via smartwatch from 2024.

For 2025, I plan to better correlate sleep patterns with habits. For instance, my consistently shorter sleep period in late July probably relates to work changes, but I wish I had better data about how it affected my mood and if there were other aspects of my life that were affected by that.

{{< vega_embed id="sleepHours" spec="sleepHours.json" >}}

Since 2023, I've manually scored my sleep quality. After getting my watch in June, I started comparing my subjective scores with the watch's measurements. The data shows an interesting disconnect - my watch tends to be more optimistic about my sleep quality than I am:

{{< vega_embed id="sleepScoreDistribution" spec="sleepScoreDistribution.json" >}}

{{< vega_embed id="sleepScoreDistribution2023" spec="sleepScoreDistribution2023.json" >}}

This aligns with my suspicion that the watch is a bit generous with its scoring - often rating nights as "good" when I didn't feel particularly well-rested.

Some sleep highlights:

- **Longest sleep: 11 hours** on February 2nd - interestingly, my diary notes this was an unusually productive day. Maybe there's a lesson there for 2025!
- **Shortest sleep: July 11th** during a 10-hour flight delay from Lisbon to Montreal, catching only brief naps in airport chairs
- **Total sleep in 2024: 111d 11h 4m**
- **Daily average: 7h 25m 50s** (slightly below my all-time average of 7h 40m)

# Habits

My coffee consumption has become more mindful since realizing afternoon caffeine noticeably affects my sleep (**shocking**, I know!). The data shows more consistent caffeine intake from September onwards:

{{< vega_embed id="coffeePerDay" spec="coffeePerDay.json" >}}

I also track my daily bathroom visits 💩:
{{< vega_embed id="poopPerDay" spec="poopPerDay.json" >}}

Not much to analyze here except that: yes, I did get sick during my trip to Brazil and that awarded me a record breaking **10 visits on February 14th** - one record I hope stays unbroken in 2025!

When I caught COVID in 2023, I experienced [Long Covid and Brain Fog](https://www.health.harvard.edu/blog/what-is-covid-19-brain-fog-and-how-can-you-clear-it-2021030822076). When looking at how I have rated the amount of brain fog I experience, I always like to look at the all-time data as it puts into perspective how far I have come recovering from it:

{{< vega_embed id="brainFogAllTime" spec="brainFogAllTime.json" >}}

{{< vega_embed id="brainFogAllTimeDistribution" spec="brainFogAllTimeDistribution.json" >}}

Other habit tracking highlights from 2024:

- Called my mom **37 times** and grandmother **17 times** (though I might have missed logging some calls)
- Walked my girlfriend's family dog **47 times**

# Finances

Since April 2019, I've recorded every non-cash transaction in beancount files - a double-entry bookkeeping computer language for financial records. I've built custom importers and a [browser extension](/projects/ws-exporter) to gather data from my banks. While this isn't integrated into [Lomnia](/projects/lomnia) yet, I use [Fava](https://github.com/beancount/fava) for analysis.

While I'll keep most financial details private, here's how my spending broke down by category. Working on this made me realize that the trips I've made in 2024 really made a dent as I spent almost as much on it as I did on rent:

{{< vega_embed id="financesCategories" spec="financesCategories.json" >}}

# Next Steps

For 2025, I have four main goals:

1. Improve habit tracking with a dedicated app, keeping Obsidian purely for text-based notes
2. Improve my online life tracking (browser history, apps used, screen time, etc...)
3. Build an [ECharts](https://echarts.apache.org/) library in Lomnia to simplify creating these kinds of analysis posts - this one took considerable effort to prepare!
4. Enhance [Lomnia's](/projects/lomnia) reverse geocoding and streamline the process of adding places of interest
