# discord-aurabot
A bridge to control Warcraft III [aura-bot](https://github.com/sfarmani/aura-bot) through discord.  

## Installation
create account in [mongoDB](https://www.mongodb.com/)   
create empty database   
allow your ip to access it from network 

setup a [discord bot](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
select below options when generating invitation link
```
check MESSAGE CONTENT INTENT
bot
application.commands
```
```
Send Messages
Send Messages in Threads
Manage Message
Read Message History
Use External Emojis
Use Slash Commands
```

clone repo
```cmd
git clone 'https://github.com/Lch3181/discord-aurabot.git'
```

create .env file    
```cmd
cd discord-aurabot
nano .env
copy the template below
```

```env
TOKEN=your bot token
MONGO_URI=your MongoDB database link
AURABOT_ADDRESS=you aura bot folder location. ex: /home/ubuntu/aura-bot

# permission, can have more than 1 owner, just add like array.
BOTOWNER=["your discord id", "your discord2 id"]

# only for debugging, can leave empty
TOKEN_DEV=your test bot token

# only for debugging, can have more than 1 test server, just add like array.
TESTSERVER=["your test server id"]
```

install sqlite3 v3.35+
```
wget 'https://www.sqlite.org/2022/sqlite-autoconf-3370200.tar.gz'
tar xvfz sqlite-autoconf-3370200.tar.gz
cd sqlite-autoconf-3370200
./configure
make
sudo make install
sqlite3 --version
```

install [nodejs lts v16.9+](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)
```cmd
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.bashrc
nvm install v16.9.0
node -v
```

install node packages
```cmd
npm install
```

start server
```cmd
npm run start
npm run start:private
```

debug
```cmd
npm run dev
npm run dev:private
```

if you want it auto start on reboot
install [pm2](https://pm2.keymetrics.io/)

```cmd
npm install pm2 -g
pm2 start 'npm run start' --name 'discord aura-bot'
pm2 startup
copy and paste instruction
pm2 save
```

## Slash Commands (takes 1hour+- to apply to server)
- /add_admin(username)
- /remove_admin(username) **botowner/private only**
- /admin_list(optional; username)
- /ban(username) **botowner/private only**
- /unban(username) **botowner/private only**
- /ban_list(optional; username)
- /uploadmap(url, filename, config name) **botowner/private only**
- /auto_upload_map(channel, config name) **botowner/private only**
- /cmd(syntax) **botowner only**
