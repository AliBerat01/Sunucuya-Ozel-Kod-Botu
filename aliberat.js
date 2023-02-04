const Discord = require('discord.js');
const client = new Discord.Client({ disableMentions: 'everyone' });
const fs = require("fs");
const moment = require('moment');
require('moment-duration-format');
require("./util/eventLoader")(client)


const log = message => {console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`)};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {if(err) console.error(err);
log(`${files ? files.length : 1} Komut Yüklenecek!`);
files.forEach(f => {let props = require(`./commands/${f}`);
log(`[KOMUT] ${props.conf.name}.js`);
client.commands.set(props.conf.name, props);
props.conf.aliases.forEach(alias => {client.aliases.set(alias, props.conf.name)})})});

client.reload = command => {return new Promise((resolve, reject) => {try{delete require.cache[require.resolve(`./commands/${command}`)];
let cmd = require(`./commands/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {if (cmd === command) client.aliases.delete(alias)});
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {client.aliases.set(alias, cmd.conf.name)});
resolve()} catch (e) {reject(e)}})};

client.load = command => {return new Promise((resolve, reject) => {try{let cmd = require(`./commands/${command}`);
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {client.aliases.set(alias, cmd.conf.name)});
resolve()} catch (e) {reject(e)}})};

client.unload = command => {return new Promise((resolve, reject) => {try{delete require.cache[require.resolve(`./commands/${command}`)];
let cmd = require(`./commands/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {if(cmd === command) client.aliases.delete(alias)});
resolve()} catch (e) {reject(e)}})};


const ayarlar = require("./config.json")
client.login(ayarlar.token)

client.on('ready', () => {
 
var actvs = ["Bot Değişen Durum 1", "Bot Değişen Durum 2", "Bot Değişen Durum 3"];
      
client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'WATCHING' });
setInterval(() => {client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'WATCHING'})}, 2000);
      
  
const voiceChannel = "BOTUN SESLI KANALA GIRECEGI KANAL ID";
client.channels.cache.get(voiceChannel).join().catch(err => {throw err})

console.log('Bot Bağlandı!');
console.log(`Tokene Sahip Bot: ${client.user.tag}`)});

client.rol = {
    kpaylaşım: "KOD PAYLASIM ROL ID",
    yetkili: "YETKILI ROL ID",
    rolverme: "ROL VERME ROL ID",
    altyapı: "ALTYAPI ROL ID",
    js: "JS KOD ROL ID"
}
client.elevation = message => {if(!message.guild) {return}
let yetki = 0;
if(message.member.roles.cache.has(client.rol.yetkili)) yetki = 1
return yetki;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
