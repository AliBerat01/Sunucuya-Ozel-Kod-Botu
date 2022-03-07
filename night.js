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
 
var actvs = ["Night Code", "AliBerat", "Lavinia", "Lilla", "RestVevo", "Oğuz", "Ayaz"];
      
client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'WATCHING' });
setInterval(() => {client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'WATCHING'})}, 2000);
      
  
const voiceChannel = "939163699950796860";
client.channels.cache.get(voiceChannel).join().catch(err => {throw err})

console.log('Bot Bağlandı!');
console.log(`Tokene Sahip Bot: ${client.user.tag}`)});

client.elevation = message => {if(!message.guild) {return}
let yetki = 0;
if(message.member.roles.cache.has("938102074925785120")) yetki = 1; // Yetkili Rol ID
return yetki;
};

client.rol = {
    kpaylaşım: "938102024518635531",
    yetkili: "938102074925785120",
    rolverme: "939160232343515157",
    altyapı: "938826113201868851",
    js: "938825983698550875"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////