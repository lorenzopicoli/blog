+++
title = "Twitter Score: detect bot and troll accounts on Twitter"
date = "2020-05-07T18:24:52-05:00"
author = "Lorenzo Piccoli Módolo"
draft = false
isMajor = true
+++

The goal of this project is to score a Twitter account based on its activity and provide quick insight into how the account behaves and if it acts like a normal account.

The description that I wrote at the time was:

> It's clear that Twitter has a big problem with bots. Every trending topic is filled with suspicious accounts that amplify some opinion and polarize the discussion. Humans are actually quite good at telling if an account is worth taking seriously or not, but it's simply impossible to go through each one of them and analyze it. The goal of this project is to provide a score so you can quickly know if it's worth engaging in discussion or not.

Now it's clear that with the birth of LLMs and their widespread adoption, the part about _"humans are quite good at telling if an account is real or not"_ hasn't aged very well, but at the time, the results were very good.

The biggest hurdle of this project was having to sort through extremely toxic content to find examples of bot/troll accounts to properly test my algorithm. On top of that, these accounts would get banned after a period of time.

You can find more information about how the detection algorithm works in the [documentation](https://github.com/lorenzopicoli/twitterscore?tab=readme-ov-file#6--score).

**Check this project on [Github](https://github.com/lorenzopicoli/twitterscore)**

---

Technologies: Node.js, CLI applications, Twitter API

{{< image_grid >}}
{
"images": [
{ "src": "twitter-score-1.png" },
{ "src": "twitter-score-2.png" }
]
}
{{< /image_grid >}}
