+++
title = "Meu Setup Self-hosted em 2024"
date = "2024-12-21T18:24:52-05:00"
author = "Lorenzo Piccoli Módolo"
showTableOfContents = true
draft = false
+++

# Meu Setup Self-hosted em 2024

{{< table_of_contents >}}

Meu serviço self-hosted inicial foi o Pi-hole. Em fevereiro de 2023, consegui um servidor na Hetzner e instalei o Pi-hole nele.
Quase um ano depois, por volta do Natal de 2023, eu queria escrever um resumo do meu ano de selfhosting, mas a vida aconteceu e nunca consegui escrever sobre isso. Agora, dois anos após começar com self hosting, me arrependo de não poder voltar e ver o quanto progredi.
É por isso que estou me preparando para 2025 compartilhando minha configuração de 2024 e o estado atual das coisas.
Antes de mergulharmos nisso, é importante saber que meus objetivos nos últimos anos têm sido:

1. **Ter o máximo possível de controle sobre meus dados** através de self hosting sempre que possível, mantendo o controle das minhas finanças em texto puro e criando uma única base de conhecimento para cada aspecto da minha vida
2. **Descobrir novos serviços** que facilitem minha vida
3. **Aprender coisas** novas no processo

# Equipamento

Vamos começar com o equipamento!

- Roteador Mikrotik hEX RB750Gr3
- Switch comprado usado
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
  - RAID SHR com tolerância a falha de 1 disco
- No-break CyberPower CP1500AVRLCD3, 1500VA/900W

Tenho o que considero uma configuração bastante minimalista. Não preciso mais do que um roteador e um switch. Meu NAS é usado para armazenar fotos e documentos e como armazenamento de backup.

Os 3 servidores (HP, Beelink e Pi) são definitivamente exagerados para a quantidade de software que executo neles, mas o Beelink foi uma compra recente com o objetivo de poder expandir ainda mais minha configuração.

# Sistema Operacional e VMs

Para ambos os meus servidores principais, uso Proxmox. Uso principalmente containers LXC com um único container docker em cada um deles. Li sobre como isso não é realmente recomendado, mas foi assim que achei mais conveniente para mim.

Só tenho uma VM para um serviço MongoDB que preciso rodar e que está na VLAN pública. Escolhi transformá-lo em VM apenas para garantir que tenho essa camada extra de segurança.

# Software

Todos os serviços que executo são através de containers docker. Cada máquina host de serviço é configurada através de playbooks Ansible que estão todos disponíveis [como um repositório Github](https://github.com/lorenzopicoli/selfhosted).

Os serviços que executo na máquina HP são:

- [Vaultwarden](https://github.com/dani-garcia/vaultwarden): gerenciador de senhas
- [Syncthing](https://docs.linuxserver.io/images/docker-syncthing/): usado para manter meus arquivos do Obsidian sincronizados em todos os meus dispositivos
- Uma instância MongoDB: esta é a que está exposta à internet e é usada pelos serviços do Raspberry Pi
- [Rastreador de Localização](https://github.com/lorenzopicoli/location-tracker): um backend [Owntracks](https://owntracks.org/) que eu mesmo construí
- [Forgejo](https://codeberg.org/forgejo/forgejo): Como um Github privado que uso para controle de versão das minhas finanças e diário sem ter que compartilhar meus dados com o Github
- Lofinance: Uma versão dockerizada do [Fava](https://github.com/beancount/fava) que eu criei e que também sincroniza automaticamente com minhas finanças em texto puro versionadas
- [Hoarder](https://hoarder.app/): Um gerenciador de favoritos
- [Dozzle](https://dozzle.dev/): Um serviço que agrega informações básicas e logs dos containers docker. Útil para debugar rapidamente o que pode estar acontecendo quando um serviço está fora do ar

Os serviços que rodam no Beelink são:

- [Traefik](https://github.com/traefik/traefik): proxy reverso
- [Pi-Hole](https://github.com/pi-hole/pi-hole): um servidor DNS que também bloqueia rastreamento e anúncios
- [Nginx proxy manager](https://nginxproxymanager.com/): o proxy reverso usado por todos os meus serviços privados. Tenho uma relação de amor e ódio com ele e ele pode não estar mais aqui em 2025
- [Unifi controller](https://github.com/linuxserver/docker-unifi-network-application)
- [Uptime Kuma](https://github.com/louislam/uptime-kuma): me ajuda a acompanhar se algum serviço cai. Ele me notifica no Telegram, o que me ajuda a não perder dados por não perceber que um serviço estava fora do ar

Os serviços que estão expostos à internet e rodam no Raspberry Pi são:

- [Your Spotify](https://github.com/Yooooomi/your_spotify)

O NAS roda os seguintes serviços:

- Active backup
- Hyper backup
- Synology Photos

# Rede

Tento manter minha configuração de rede simples e direta ao ponto. As únicas 3 coisas que importam na minha configuração de rede são: ser segura, ser conveniente e ser confiável.

Atualmente tenho 3 VLANs:

- Segura: permitido acesso a todas as outras VLANs. Restrito ao meu wifi seguro e servidores confiáveis
- Pública: isso só é realmente usado pelo meu Raspberry Pi e é a única VLAN que aceita requisições da internet
- Wireguard: não me lembro exatamente por quê, mas tive que configurar uma VLAN separada para o Wireguard, mas ela funciona igual à VLAN segura

Quanto ao firewall, existem apenas algumas regras:

1. Apenas tráfego nas portas 80, 443 e a porta do Wireguard são permitidos e são roteados para um endereço IP específico (proxy reverso Traefik)
2. Quaisquer requisições de saída para a porta 53 são redirecionadas para o Pi-hole. Isso é necessário porque [alguns fabricantes de dispositivos (olhando para você, Google) escolhem ignorar o servidor DNS do DHCP](https://www.reddit.com/r/googlehome/comments/8917ci/google_home_mini_using_its_own_dns_addresses_are/)

Meu provedor de internet muda meu endereço IP de vez em quando ou sempre que meu roteador é desconectado. Quando isso acontece, não posso mais acessar a API da Namecheap até manualmente liberar meu novo IP. Por isso, uso o [recurso Cloud da Mikrotik](https://wiki.mikrotik.com/Manual:IP/Cloud) para manter meus serviços sempre disponíveis. Aponto meus domínios para o domínio deles, que é configurado para sempre apontar para meu roteador. É como DNS dinâmico com passos extras.

# Backups

Há algumas semanas, eu estava atualizando alguns serviços e reajustando algumas das minhas configurações do Ansible, e não fui muito cuidadoso com o que estava fazendo, já que sabia que sempre poderia contar com meus backups. Então continuei alterando meu arquivo docker-compose e reiniciei meu banco de dados Mongo, que é usado pelo serviço YourSpotify que compartilho com meus amigos. Quando executei o serviço, percebi que todos os dados tinham simplesmente sumido... pior ainda, fui verificar meu backup e descobri que por quase um ano inteiro, minha tarefa de backup estava fazendo backup da pasta errada...

Foi preciso muita sorte para encontrar uma cópia do banco de dados em uma pasta aleatória (não me pergunte como foi parar lá). Então posso dizer com certeza que minha falta de uma boa configuração de backup foi sentida durante 2024.

Dito isso, a maioria das coisas que hospedo não são críticas (ou seja, se eu perder meu histórico de consultas DNS, não é um grande problema), e as coisas que são críticas são armazenadas de duas maneiras diferentes (ou seja, minhas fotos ainda estão no Google Photos por enquanto).

Na maior parte, uso o Active Backup para automaticamente fazer SSH nos meus containers docker e copiar a pasta de volumes docker. A recuperação nem sempre é direta, mas deve funcionar na maioria dos casos. Essa abordagem também tem alguns problemas estranhos de permissão.

# Lições aprendidas em 2024

Aprendi que devo buscar uma configuração enxuta. Não mudei muita coisa em 2024 e isso foi devido à minha configuração ser resiliente e simples.
Aprendi a amar o Ansible ainda mais do que antes. Depois de muitos meses sem mexer nos meus servidores, voltar a eles foi tão simples quanto lembrar como rodar um playbook.

# Lista de Desejos para 2025

Para posteridade, isto é o que eu gostaria de resolver em algum momento em 2025:

- Buscar uma porcentagem maior de tempo de atividade (minha instância do Spotify ficou fora do ar por alguns meses em 2024)
- Melhorar meu sistema de backup. Gostaria de comprar um segundo NAS e deixá-lo na casa de um familiar/amigo como backup off-site. Isso potencialmente me permitiria abandonar o Google Photos finalmente
- Hospedar Plex
- Hospedar Immich
