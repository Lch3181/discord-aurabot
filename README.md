# discord-aurabot
A bridge to control Warcraft III [aura-bot](https://github.com/sfarmani/aura-bot) through discord.  

## Installation
create account in [mongoDB](https://www.mongodb.com/)   
create empty database   
allow your ip to access it from network       

clone repo
```cmd
git clone 'https://github.com/Lch3181/discord-aurabot.git'
```

create .env file    
```env
TOKEN=your bot token    
TOKEN_DEV=your test bot token
MongoDB=your MongoDB database link   
BOTOWNER=['your discord id']
TESTSERVER=['your test server id']
```

install [nodejs lts](https://nodejs.org/)

```cmd
npm install
npm run start
```

if you want it auto start on reboot
install [pm2](https://pm2.keymetrics.io/)

```cmd
npm install pm2 -g
pm2 start 'npm run start' -name 'discord aura-bot'
pm2 startup
copy and paste instruction
pm2 save
```

## Commands
- add_admin(username)
- remove_admin(username) **botowner only**
- admin_list(username; optional)
- ban(username) **botowner only**
- unban(username) **botowner only**
- ban_list(username; optional)
- uploadmap(url, filename, config name) **botowner only**
- cmd(syntax) **botowner only**
