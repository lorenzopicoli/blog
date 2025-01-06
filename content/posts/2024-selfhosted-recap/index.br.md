+++
title = "Um Retrato da Minha Jornada de Self-Hosting em 2024"
date = "2024-12-21T18:24:52-05:00"
author = "Lorenzo Piccoli Módolo"
draft = false
+++

{{< table_of_contents >}}

O que começou como um simples experimento com o Pi-hole em fevereiro de 2023 se transformou em uma obsessão completa por self-hosting.
Quase um ano depois, por volta do Natal de 2023, eu queria escrever um resumo do meu ano com self-hosting, mas a vida aconteceu e nunca consegui fazer isso. Agora, dois anos depois, me arrependo de não ter registrado como as coisas evoluíram.

Por isso, estou me preparando para 2025 compartilhando meu setup de 2024 e o estado atual das coisas.

Antes de mergulhar nos detalhes, é importante saber que meus objetivos nos últimos anos têm sido:

1. **Controlar ao máximo meus dados**, self-hosting sempre que possível, [organizando minhas finanças em texto puro](https://plaintextaccounting.org/) e criando uma base de conhecimento única para todos os aspectos da minha vida.
2. **Descobrir novos serviços** que facilitem minha vida.
3. **Aprender coisas novas** no processo.

# Equipamentos

Vamos começar pelos equipamentos!

Escolhi o **Mikrotik hEX RB750Gr3** como meu roteador. Eu adoro esse dispositivo porque ele oferece várias funcionalidades como instalar Wireguard diretamente, suporte a DDNS e outros recursos legais. Tudo isso com uma abundância de artigos úteis para qualquer caso de uso. No início, eu nunca tinha mexido com nada relacionado a redes, mas há conteúdo suficiente (vídeos, artigos, fóruns) para ir de iniciante a expert no ecossistema Mikrotik. Para o Wi-Fi, consegui um bom negócio no marketplace e comprei um **Unifi AP LR**, que funciona bem para meu apartamento pequeno.

Meu primeiro servidor é um **Raspberry Pi 4 4GB**, usado como máquina dedicada para serviços expostos. Qualquer serviço que quero compartilhar com amigos, família ou que precisa ser acessível pela internet fica no Raspberry Pi. Ele é mais do que suficiente porque eu prefiro manter os serviços privados para evitar problemas de segurança.

Meus dois servidores principais são um **HP Prodesk Mini G4 (i5-8500T, 8GB SODIM DDR4, 500GB SSD)** e um recém-adquirido **Beelink Mini S12 Pro (N100, 16GB DDR4, 500GB M.2)**. Esses são os "pesos-pesados" do meu setup e onde eu rodo quase todos os containers e VMs.

Para dados críticos como backups e fotos, achei outro bom negócio no marketplace: um **Synology 918+ (8GB RAM, 256GB Cache)** com **2x Western Digital 3TB WD Red Plus** e **1x Seagate IronWolf ST4000VN006 4TB**. Uso RAID SHR com tolerância para falha de 1 disco. Foi uma das melhores compras que fiz. Além de "simplesmente funcionar", isso abre possibilidades como comprar outro NAS para backups fora de casa. Enquanto eu não me importo de experimentar com os servidores, no caso do NAS, priorizo facilidade de uso e paz de espírito – e a Synology entrega isso.

Para manter tudo funcionando durante as incontáveis quedas de energia que enfrentamos aqui em Montreal, investi em um **CyberPower UPS (CP1500AVRLCD3), 1500VA/900W**. Ele está conectado ao meu NAS para garantir um desligamento adequado durante apagões prolongados. O objetivo é prevenir problemas relacionados a energia nos discos rígidos que armazenam meus arquivos importantes.

# Sistema Operacional

Nos dois servidores principais (Beelink e HP), eu uso Proxmox. Eu rodo principalmente containers LXC, cada um com um único container Docker. Apesar de ler que essa configuração não é muito recomendada, é a mais conveniente para mim.

Tenho apenas uma VM: um serviço MongoDB rodando na VLAN pública. Optei por usar uma VM para adicionar uma camada extra de segurança.

O Raspberry Pi, junto com todas as VMs e containers, roda a última versão do Debian.

# Serviços

Uso containers Docker para todos os meus serviços. Se encontro um serviço que não está pré-containerizado (ex.: Fava), eu mesmo crio o container. Essa consistência facilita rodar novos serviços e fazer backup dos volumes. Todos os serviços abaixo, junto com os hosts, são configurados via playbooks do Ansible, que você pode encontrar no meu [repositório selfhosted no Github](https://github.com/lorenzopicoli/selfhosted).

## Serviços no HP:

- [Vaultwarden](https://github.com/dani-garcia/vaultwarden): gerenciador de senhas
- [Syncthing](https://docs.linuxserver.io/images/docker-syncthing/): mantém meus arquivos do Obsidian sincronizados em todos os dispositivos
- Uma instância do MongoDB: exposta à internet e usada pelos serviços do Raspberry Pi
- [Location Tracker](https://github.com/lorenzopicoli/location-tracker): backend para o [Owntracks](https://owntracks.org/) que eu mesmo desenvolvi
- [Forgejo](https://codeberg.org/forgejo/forgejo): como um Github privado, onde versiono minhas finanças e diário sem precisar dar meus dados ao Github
- Lofinance: Versão dockerizada do [Fava](https://github.com/beancount/fava) que criei, sincronizada automaticamente com minhas finanças em texto puro
- [Hoarder](https://hoarder.app/): gerenciador de favoritos
- [Dozzle](https://dozzle.dev/): agrega logs e informações básicas de containers Docker para depuração rápida

## Serviços no Beelink:

- [Pi-Hole](https://github.com/pi-hole/pi-hole): servidor DNS que bloqueia rastreamento e anúncios
- [Nginx Proxy Manager](https://nginxproxymanager.com/): proxy reverso usado pelos serviços privados
- [Unifi Controller](https://github.com/linuxserver/docker-unifi-network-application)
- [Uptime Kuma](https://github.com/louislam/uptime-kuma): monitora a disponibilidade dos serviços e me notifica no Telegram quando algo cai

## Serviços no Raspberry Pi:

- [Traefik](https://github.com/traefik/traefik): proxy reverso
- [Your Spotify](https://github.com/Yooooomi/your_spotify)

## Serviços no NAS:

- [Active Backup](https://www.synology.com/en-global/dsm/feature/active-backup-business/pc): backup automático dos volumes Docker
- [Hyper Backup](https://www.synology.com/en-global/dsm/feature/hyper_backup): backup dos arquivos para um HD externo
- [Synology Photos](https://www.synology.com/en-global/dsm/feature/photos)

# Rede

Minha configuração de rede é simples e direta: segurança, conveniência e confiabilidade.

Atualmente, tenho 3 VLANs:

- **Secure**: acessa todas as outras VLANs, restrita ao Wi-Fi seguro e servidores confiáveis
- **Public**: usada apenas pelo Raspberry Pi, a única que aceita requisições da internet
- **Wireguard**: uma VLAN separada para Wireguard, mas funciona como a VLAN segura

Regras do firewall:

1. Apenas tráfego nas portas 80, 443 e a porta do Wireguard são permitidos, roteados para um IP específico (proxy reverso Traefik)
2. Requisições na porta 53 são redirecionadas para o Pi-Hole, necessário porque [alguns fabricantes ignoram o servidor DNS do DHCP](https://www.reddit.com/r/googlehome/comments/8917ci/google_home_mini_using_its_own_dns_addresses_are/)

# Backups

Recentemente perdi quase um ano de dados porque meu backup estava apontando para a pasta errada. Isso me fez perceber a importância de um bom sistema de backup. Atualmente, uso o Active Backup para fazer backup dos volumes Docker via SSH, mas ainda há problemas de permissões.

# O que Aprendi em 2024

- Um setup enxuto é essencial: menos mudanças, mais estabilidade
- Ansible continua sendo meu maior aliado: reiniciar servidores é tão simples quanto rodar um playbook

# Desejos para 2025

- Melhorar uptime (meu YourSpotify ficou meses fora do ar em 2024)
- Melhorar o sistema de backup (ex.: comprar um segundo NAS ou usar um serviço na nuvem)
- Abandonar o Google Photos
- Hospedar Plex e Immich
