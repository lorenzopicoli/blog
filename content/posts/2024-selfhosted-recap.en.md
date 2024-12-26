+++
title = "A Snapshot of My Self-Hosted Journey in 2024"
date = "2024-12-21T18:24:52-05:00"
author = "Lorenzo Piccoli Módolo"
showTableOfContents = true
draft = false
+++

{{< table_of_contents >}}

# Self Hosting

My gateway self-hosted service was Pi-hole. In February of 2023, I got a server on Hetzner and installed Pi-hole on it. The self-hosted rabbit hole goes deep, and I went headfirst into it.
Almost one year later, around Christmas time in 2023, I wanted to write a recap of my year self-hosting, but things happened and I never got around to writing about that. Now, two years into self-hosting, I regret not being able to go back and see how much farther I have come.

This is why I'm setting myself up for 2025 by sharing my 2024 setup and the state of things.

Before we dive into it, it's important to know that my goals in the past years have been to:

1. **Own as much of my data as possible** by self-hosting whenever possible, [keeping track of my finances in plain text](https://plaintextaccounting.org/) and creating a single knowledge base for every aspect of my life
2. **Discover new services** that make my life easier
3. **Learn new things** in the process

# Equipment

Let's get the equipment out of the way!

- Mikrotik hEX RB750Gr3 router
- Thrifted switch
- Unifi AP LR
- HP Prodesk Mini G4
  - i5-8500T
  - 8GB SODIM DDR4
  - 500GB SSD
- Beelink Mini S12 Pro
  - N100
  - 16GB DDR4
  - 500GB M.2
- Raspberry Pi 4 4GB
- Synology 918+
  - 8GB RAM
  - 256GB Cache
  - 2x Western Digital 3TB WD Red Plus
  - 1x Seagate IronWolf ST4000VN006 4TB
  - SHR raid with tolerance to 1 drive fault
- CyberPower CP1500AVRLCD3 UPS, 1500VA/900W

I have what I consider a pretty minimal setup. I don't need more than one router and one switch. My NAS is used to store photos and documents and as backup storage.

The 3 servers (HP, Beelink and Pi) are definitely overkill for the amount of software that I run on them, but the Beeklink was a recent purchase with the goal of being able to expand my setup further.

# Operating System and VMs

For both of my main servers (Beelink and HP) I use Proxmox. I mostly use LXC containers with a single docker container in each of them. I've read about how it's not really recommended to do it that way, but that's how I found it to be the most convenient for me.

I only have a VM for a MongoDB service that I have to run which is in the public VLAN. I chose to turn it into a VM just to make sure that I have that extra layer of security.

The Raspberry Pi and all VMs/containers, run the latest version of Debian.

# Software

Every service that I run is through docker containers. Each service's host machine is configured through Ansible playbooks that are all available [as a Github repo](https://github.com/lorenzopicoli/selfhosted).

The services that I run in the HP machine are:

- [Vaultwarden](https://github.com/dani-garcia/vaultwarden): password manager
- [Syncthing](https://docs.linuxserver.io/images/docker-syncthing/): used to keep my obsidian files in sync across all of my devices
- A MongoDB instance: this is the one that is exposed to the internet and is used by the raspiberry pi services
- [Location Tracker](https://github.com/lorenzopicoli/location-tracker): an [Owntracks](https://owntracks.org/) backend which I built myself
- [Forgejo](https://codeberg.org/forgejo/forgejo): Like a private Github which I used to version control my finances and diary without having to give away my data to Github
- Lofinance: A dockerized version of [Fava](https://github.com/beancount/fava) that I created which also automatically syncs with my version-controlled plain text finances.
- [Hoarder](https://hoarder.app/): A bookmark manager
- [Dozzle](https://dozzle.dev/): A service that aggregates basic docker container's informations and logs. Useful to quickly debug what might be going on when a service is down

The services that live in the Beelink are:

- [Traefik](https://github.com/traefik/traefik): reverse proxy
- [Pi-Hole](https://github.com/pi-hole/pi-hole): a DNS server which also blocks tracking and ads
- [Nginx proxy manager](https://nginxproxymanager.com/): the reverse proxy used by all of my private services. I have a bit of a love/hate relationship with it and it might be gone in 2025
- [Unifi controller](https://github.com/linuxserver/docker-unifi-network-application)
- [Uptime Kuma](https://github.com/louislam/uptime-kuma): helps me keep track if any services goes down. It notifies me on telegram which helps me not lose any data because I didn't realize a service was down

The services that are exposed to the internet and run on the raspberry pi are:

- [Your Spotify](https://github.com/Yooooomi/your_spotify)

The NAS runs the following services:

- Active backup
- Hyper backup
- Synology Photos

# Network

I try to also keep my network setup simple and straight to the point. The only 3 things that matter in my network setup are: be secure, be convenient and be reliable.

I have currently 3 VLANs:

- Secure: allowed to access all other VLANs. Restricted to my secure wifi, and trusted servers
- Public: this is only really used by my raspberry pi and it's the only VLAN that accepts requests from the internet
- Wireguard: I don't quite remember why, but I had to setup a separate VLAN for wireguard, but it acts the same as the secure VLAN

When it comes to firewall there are only a few rules:

1. Only traffic on ports 80, 443 and the Wireguard port are allowed and they are routed to a specific IP address (traefik reverse proxy)
2. Any outbound requests to port 53 get redirected to the Pi-hole. This is needed because [some devices manufacturers (looking at you Google) choose to ignore the DHCP DNS server](https://www.reddit.com/r/googlehome/comments/8917ci/google_home_mini_using_its_own_dns_addresses_are/)

My ISP will change my IP address every once in a while or whenever my router gets disconnected. When that happens, I can't access Namecheap's API anymore until I manually whitelist my new IP address. For that reason, I use [Mikrotik's Cloud feature](https://wiki.mikrotik.com/Manual:IP/Cloud) to keep my services always available. I point my domains to their domain which is then configured to always point to my router. It's like dynamic DNS with extra steps.

# Backups

Just a few weeks ago, I was updating some services and re-working some of my Ansible configurations, and I wasn't too careful about what I was doing since I knew I could always rely on my backups. So I proceeded to change my docker-compose file and restart my Mongo database, which is used by the YourSpotify service that I share with my friends. When I ran the service, I realized that all the data was just gone... worse yet, I went to check my backup and it turned out that for almost a whole year, my backup task was backing up the wrong folder...

It took me a great deal of luck to find a copy of the database in a random folder (don't ask me how it got there). So I can say for sure that my lack of a good backup setup was felt during 2024.

With that being said, most of the things that I host aren't critical (ie. if I lose my DNS query history, it's not a big deal), and the things that are critical are stored in two different ways (ie. my photos are still in Google Photos for now).

For the most part I use Active Backup to automatically SSH into my docker instances and copy the docker volumes folder. Recovering isn't always straightforward, but it should work in most cases. This approach also has some weird permission problems.

# Lessons learned in 2024

I learned that I should aim for a lean setup. Not much was changed in 2024 and that was due to my setup being resilient and simple.
I learned to love Ansible even more than I did before. After many months of not touching my servers, getting back to them was as simple as remembering how to run a playbook.

# 2025 Wish List

For posteriority, this is what I would like to tackle at some point in 2025:

- Aim for a higher up time percentage (my spotify instance was down for a few months in 2024)
- Improve my backup system. I would like to buy a second NAS and leave it at a family/friend's house as an offsite backup. This would potentially allow me to ditch Google Photos finally
- Host Plex
- Host Immich
