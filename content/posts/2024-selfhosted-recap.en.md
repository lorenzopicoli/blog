+++
title = "A Snapshot of My Self-Hosted Journey in 2024"
date = "2024-12-21T18:24:52-05:00"
author = "Lorenzo Piccoli Módolo"
draft = false
+++

# A Snapshot of My Self-Hosted Journey in 2024

{{< table_of_contents >}}

What started as a simple experiment with Pi-hole in February 2023 spiraled into a full-blown obsession with self-hosting.
Almost one year later, around Christmas time in 2023, I wanted to write a recap of my year self-hosting, but things happened and I never got around to writing about that. Now, two years into self-hosting, I regret not being able to go back and see how much farther I have come.

This is why I'm setting myself up for 2025 by sharing my 2024 setup and the state of things.

Before we dive into it, it's important to know that my goals in the past years have been to:

1. **Own as much of my data as possible** by self-hosting whenever possible, [keeping track of my finances in plain text](https://plaintextaccounting.org/) and creating a single knowledge base for every aspect of my life
2. **Discover new services** that make my life easier
3. **Learn new things** in the process

# Equipment

Let's get the equipment out of the way!

For networking I chose to go with **Mikrotik hEX RB750Gr3** as my router. I love this device as it offers a lot of functionality like installing Wireguard on it directly, DDNS support and other neat features. All while having a lot of helpful articles for every use case. At the start of this all I had never played with anything related to networking and there's more than enough videos/articles/forums out there to go from newbie to expert with Mikrotik's ecosystem. For wifi I snagged a good deal on marketplace and got myself a **Unifi AP LR** which works well enough for my small apartment.

My first server is a **Raspberry Pi 4 4GB** which is currently used as a dedicated machine for exposed services. Any service that I want to share with my friends and family, or that I want to be accessible through the internet go on the Raspberry Pi. It's more than enough because I strongly prefer to keep my services private to avoid potential security problems.

For my two main servers I have a **HP Prodesk Mini G4 (i5-8500T, 8GB SODIM DDR4, 500GB SSD)** and a newly acquired **Beelink Mini S12 Pro (N100, 16GB DDR4, 500GB M.2)**. These are the two heavy lifters of my setup and where I run almost all of my containers and VMs.

For critical data like backups and photos, I found another marketplace deal: **Synology 918+ (8GB RAM, 256GB Cache)** with **2x Western Digital 3TB WD Red Plus** and **1x Seagate IronWolf ST4000VN006 4TB**. I run them on a SHR raid with tolerance to 1 drive fault. This was hands-down one of my best purchases. Not only does it "just work", but it opens up possibilities like buying another NAS for offsite backups. While I don’t mind experimenting with my servers, for my NAS, I prioritize ease of use and peace of mind - and Synology delivers that.

To keep everything running through the countless power outages that we get here in Montreal, I invested in a **CyberPower UPS (CP1500AVRLCD3), 1500VA/900W**. It’s connected to my NAS to ensure a proper shutdown during prolonged outages. The goal here is to prevent power-related issues with the hard drives storing my important files.

# Operating System

For my two main servers (Beelink and HP), I use Proxmox. I mostly run LXC containers, each with a single Docker container. While I’ve read that this setup isn’t exactly recommended, I’ve found it the most convenient for my needs.

I only have one VM—a MongoDB service running in the public VLAN. I opted for a VM here to add an extra layer of security.

The Raspberry Pi, along with all VMs and containers, runs the latest version of Debian.

# Services

I use Docker containers for all my services. If I come across a service that isn’t pre-containerized (e.g., Fava), I containerize it myself. This consistency makes spinning up services and backing up volumes much easier. All the services below, along with their host machines, are configured via Ansible playbooks, which you can find in my [selfhosted Github repo](https://github.com/lorenzopicoli/selfhosted).

## Services on the HP machine:

- [Vaultwarden](https://github.com/dani-garcia/vaultwarden): password manager
- [Syncthing](https://docs.linuxserver.io/images/docker-syncthing/): used to keep my obsidian files in sync across all of my devices
- A MongoDB instance: this is the one that is exposed to the internet and is used by the raspiberry pi services
- [Location Tracker](https://github.com/lorenzopicoli/location-tracker): an [Owntracks](https://owntracks.org/) backend which I built myself
- [Forgejo](https://codeberg.org/forgejo/forgejo): Like a private Github which I used to version control my finances and diary without having to give away my data to Github
- Lofinance: A dockerized version of [Fava](https://github.com/beancount/fava) that I created which also automatically syncs with my version-controlled plain text finances.
- [Hoarder](https://hoarder.app/): A bookmark manager
- [Dozzle](https://dozzle.dev/): A service that aggregates basic docker container's informations and logs. Useful to quickly debug what might be going on when a service is down

## Services on the Beelink:

- [Pi-Hole](https://github.com/pi-hole/pi-hole): a DNS server which also blocks tracking and ads
- [Nginx proxy manager](https://nginxproxymanager.com/): the reverse proxy used by all of my private services. I have a bit of a love/hate relationship with it and it might be gone in 2025
- [Unifi controller](https://github.com/linuxserver/docker-unifi-network-application)
- [Uptime Kuma](https://github.com/louislam/uptime-kuma): helps me keep track if any services goes down. It notifies me on telegram which helps me not lose any data because I didn't realize a service was down

## Services on the Raspberry Pi

- [Traefik](https://github.com/traefik/traefik): reverse proxy
- [Your Spotify](https://github.com/Yooooomi/your_spotify)

## Services on the NAS

- [Active backup](https://www.synology.com/en-global/dsm/feature/active-backup-business/pc): used to backup all the docker volumes
- [Hyper backup](https://www.synology.com/en-global/dsm/feature/hyper_backup): which I use to save my files to an external hard drive in case I need to recover the NAS
- [Synology Photos](https://www.synology.com/en-global/dsm/feature/photos)

# Networking

I try to also keep my network setup simple and straight to the point. The only 3 things that matter in my network setup are: be secure, be convenient and be reliable.

I have currently 3 VLANs:

- **Secure**: allowed to access all other VLANs. Restricted to my secure wifi, and trusted servers
- **Public**: this is only really used by my raspberry pi and it's the only VLAN that accepts requests from the internet
- **Wireguard**: I don't quite remember why, but I had to setup a separate VLAN for wireguard, but it acts the same as the secure VLAN

When it comes to firewall there are only a few rules:

1. Only traffic on ports 80, 443 and the Wireguard port are allowed and they are routed to a specific IP address (traefik reverse proxy)
2. Any outbound requests to port 53 get redirected to the Pi-hole. This is needed because [some devices manufacturers (looking at you Google) choose to ignore the DHCP DNS server](https://www.reddit.com/r/googlehome/comments/8917ci/google_home_mini_using_its_own_dns_addresses_are/)

My ISP will change my IP address every once in a while or whenever my router gets disconnected. When that happens, I can't access Namecheap's API anymore until I manually whitelist my new IP address. For that reason, I use [Mikrotik's Cloud feature](https://wiki.mikrotik.com/Manual:IP/Cloud) to keep my services always available. I point my domains to their domain which is then configured to always point to my router. It's like dynamic DNS with extra steps.

# Backups

Just a few weeks ago, I was updating some services and re-working some of my Ansible configurations, and I wasn't too careful about what I was doing since I knew I could always rely on my backups. So I proceeded to change my docker-compose file and restart my Mongo database, which is used by the YourSpotify service that I share with my friends. When I ran the service, I realized that all the data was just gone... worse yet, I went to check my backup and it turned out that for almost a whole year, my backup task was backing up the wrong folder...

It took me a great deal of luck to find a copy of the database in a random folder (don't ask me how it got there). So I can say for sure that my lack of a good backup setup was felt during 2024.

With that being said, most of the things that I host aren't critical (ie. if I lose my DNS query history, it's not a big deal), and the things that are critical are stored in two different ways (ie. my photos are still in Google Photos for now).

**For the most part I use Active Backup to automatically SSH into my docker instances and copy the docker volumes folder. Recovering isn't always straightforward, but it should work in most cases. This approach also has some weird permission problems.**

# Lessons learned in 2024

I learned that I should aim for a lean setup. Not much was changed in 2024 and that was due to my setup being resilient and simple.
I learned to love Ansible even more than I did before. After many months of not touching my servers, getting back to them was as simple as remembering how to run a playbook.

# 2025 Wish List

For posteriority, this is what I would like to tackle at some point in 2025:

- Improve uptime (e.g., my Spotify instance was down for months in 2024)
- Upgrade my backup system (e.g., buy a second NAS for offsite backups or find a cheap cloud provider)
- Ditch Google Photos by setting up a better photo backup system
- Host Plex.
- Host Immich.
