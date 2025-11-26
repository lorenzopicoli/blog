+++
title = "Reporting on ever-changing tracked habits"
date = "2025-11-25T18:24:52-05:00"
author = "Lorenzo Piccoli Módolo"
draft = false
+++

For most of the facets of my life that I want to track and store in [Lomnia](/projects/lomnia), I can define a set of properties I want to track, save that in the database and create charts that answer questions that I have.

Habits are a key thing for me to track, with them I can answer things like:

- Which days of the year did I eat granola for breakfast?
- What percentage of my food was healthy or not healthy?
- How many coffee sessions have I had in the year?
- How has my unassisted pull up progressed over the year?
- How has the amount of "positive" mood entries changed over time?

All of the above wouldn't be captured by my location, the weather or any other data point except for manually habit logging.

On top of that, **habits are always changing**. I might want to track how many times I play a certain game and then I might stop playing it completely.

# Habit Tracking

As I build [Hares](/projects/hares) and [Lomnia](/projects/lomnia), I don't want to forget that habits are always changing and if I want to have quality data, I need a system that can properly support this ever-changing nature.

When it comes to logging habits, there are a few things that I've grown to believe to be "must haves" for quality habit logging:

- **It needs to be fast**. I need to be able to do it on the go, on days that I'm too happy to be bother to log things or too depressed to get out of bed. No questions or surveys, just logging
- **It needs to be flexible.** If I start doing a new exercise at the gym, I need to be able to create a new tracker fast. Some things like mood and food tracking can't be decided ahead of time, they contain nuances that I absolutely want to capture even if I didn't think of this a month ago when creating the tracker. "down" is different than "meh" and I need to be able to log both
- **It needs to be welcoming of change**. I've changed the way that I track my coffee/caffeine intake multiple times depending on the period of my life, how important it is to me or how much I've learned about self tracking. Changing my habits tracking needs to be an non-scary thing to do

# Reporting

Reporting on the other hand is quite the opposite of habit tracking.
As I work on [Lomnia](/projects/lomnia), I've iterated on many ways to explore the data that I collected on myself over the years.
Initially I wanted everything to be custom, I should be able to define, on the fly, what kind of chart I want, the data source, the grouping, filtering, aggregation function, etc...

I came to learn though that this way of thinking doesn't work for 2 reasons. First, **building and maintaining this kind of system is HARD** and I need to be able to do it in my free time which is very limited. Testing out a cool new chart type should be a weekend project and not a month long project where I have to support all the use cases of the world. Second, I want to **correlate data**, I want to see a dynamic map showing where I was (location data), what I was doing (habit + internet history + diary) and what was the weather. _Good luck_ creating a UI where the user can create charts with this level of detail and correlation.

So eventually I scrapped that approach and decided to go with predefined charts that answer very specific burning questions that I had. I'm an average person, chances are other people would have the same questions so this also makes the project a little bit more shareable. That doesn't mean that I don't want to have customization or the ability to explore my data, but I've since switched to a set of opinionated standards and whatever I can build on top of that for exploration is a plus.

# The Bridge

The problem is that I can't define pre-created charts for **how many cups of coffee have I had today** since, by my own rules, how I track my coffee intake changes over time.

To complicate things even further, the medium I use track things has also changed over the years. I started off by using Obsidian to track my daily habits while journaling, to then building [Hares](/projects/hares). And I can't promise it won't change again.

So how do I import all of my logged habits in a way that allows me to query very specific things on a very generic data source?

What I've landed on is a mix of [EAV](https://en.wikipedia.org/wiki/Entity%E2%80%93attribute%E2%80%93value_model) and user defined transformation rules. The idea is that instead of reporting on the raw habit entries, I intake them and then, based on user defined rules, I extract "features" from these habits, these features are queryable and dead simple.
Features are defined as follow:

1. **Each feature is extracted by a set of rules**
2. **Each rule has a list of conditions** that must all be true for a habit to match
3. **Each rule has a single extraction instruction** that tells what feature from the habit must be extracted. This can be the value, a part of the value or more

This allows for full flexibility when defining features. Each rule define a set of "AND" conditions which allows for pretty good filtering (ie. by habit key and value for example) and the rules themselves are all "ORs" allowing to find features from different sources.

Querying them becomes a matter of having charts that can read from the features table and properly display it in a chart.

Imagine for example that I have a predefined chart called "Count of meals per day". It can be a chart that queries the features table for a feature called "meal". This means that I'm still creating a fast way to visualize this data while "suggesting" the usage of a meal feature. And nothing stops the user from changing the category to "my meal" during the chart creation if they track it differently. The chart becomes simply an inspiration and opinion of things that could be tracked and how they should be reported on.

**At this point, each habit entry essentially becomes the raw material of the system**. The unstructured, user-entered, sometimes messy truth of what actually happened. This raw data is intentionally immutable. Instead of editing history, I run all habits through a transformation layer, almost like the T in a classic ETL pipeline.

For every habit, [Lomnia](/projects/lomnia) checks it against every feature’s rules. Whenever a rule matches, a new row is created in the `extracted_habit_features` table. This process is deterministic, reproducible, and keeps the “raw” layer separate from the “structured” layer. The result is a clean, uniform set of features that are incredibly easy to query and rebuild at any time — without ever losing the original nuance or clutter of the real habit logs.

# One last thing

Sometimes I forget to log a meal or a shower or whatever. In the past I felt pressed to try to backtrack and find when exactly I showered, but this creates anxiety and leads to wrong data. So I made it so I can select a period of the day if I want, instead of a precise time. So I can say I showered "in the morning".
Besides, some habits make sense to track in a daily basis, like my "sleep score" for example.

This means that the raw habit data might contain a rough estimate of when something happened instead of precise date information. Some charts are displaying data on a daily basis, but there are charts that I want to build that rely on precise time granularity, like if I want to analyze at what time of the day I have breakfast for example.
The solution I adopted is to transform into a time ranges when extracting the habit features. This gives the flexibility to filter by start_date if time granularity doesn't matter and filtering by start_date = end_date if I want features that are being reported on absolute time precision.

# How it looks like

Looking back at the sample questions I had at the start of this text, let's see how I can answer some them:

### What percentage of my food was healthy or not healthy?

Feature: "Healthy or not healthy"

- Conditions:
  - Habit key = "Meal"
- Extraction value = { broccoli: "healthy", burger: "unhealthy" }

### How many coffee sessions have I had in the year?

This is where it gets fun, I can use feature rules to extract different data from different sources and normalize them

Feature: "Coffee sessions"
Rules:

Rule 1 (tracking coffee has a snack with "coffee" component):

- Conditions:
  - Value contains "Coffee"
- Extraction value = 1

Rule 2 (_in obsidian I would write down at the end of the day the amount of coffee sessions I had_)

- Conditions:
  - Habit source = "obsidian"
  - Habit key = "Coffee"
- Extraction value = "habit_value"

# Extrapolating this idea

Exploring and implementing this idea also re-ignited something that had been sitting in the back of my mind for a long time.

At the time of writing, ingesting and transforming data in [Lomnia](/projects/lomnia) is slow, fragile, and honestly a little scary. It feels far too easy to break something or accidentally corrupt data. Once this feature system is fully in place, I want to take a step back and extend the same approach to all of my other data sources. Splitting everything into _import → transform → consume_ would make the entire pipeline more resilient and far less intimidating to work on. But that’s a topic for another day.
