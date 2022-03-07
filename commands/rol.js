const Discord = require('discord.js')

exports.conf = {
    name: "rol",
    aliases: ["role"]
}

exports.run = async(client, message, args) => {
const embed = new Discord.MessageEmbed()
if(!message.member.roles.cache.has(client.rol.rolverme)) return message.channel.send(embed.setDescription("Bu komutu kullanabilmek için <@&"+ client.rol.rolverme +"> rolüne sahip olmalısın!").setColor(ff0000));
const uye = message.mentions.members.first()

if(!["ver", "al"].includes(args[0])) return message.channel.send(embed.setDescription("Rol verecekseniz `ver`, Rol alacaksanız `al` yaz!").setColor(ff0000));
if(args[0] === "ver"){
if(!["js", "altyapı"].includes(args[1])) return message.channel.send(embed.setDescription("JavaScript rolü verecekseniz `js`, Altyapı rolü verecekseniz `altyapı`").setColor(ff0000));
if(args[1] === "js"){
if(!uye) return message.channel.send(embed.setDescription("Rol vereceğiniz üye'yi etiketle!").setColor(ff0000));
if(uye.roles.cache.has(client.rol.js)) return message.channel.send(embed.setDescription("Bu üye'nin `"+message.guild.roles.cache.get(client.rol.js).name+"` rolü var!").setColor(ff0000));
message.channel.send(embed.setDescription("Başarıyla kullanıcıya `"+message.guild.roles.cache.get(client.rol.js).name+"` rolü verildi!").setColor("00ff00"))
uye.roles.add(client.rol.js)}
if(args[1] === "altyapı"){
if(!uye) return message.channel.send(embed.setDescription("Rol vereceğiniz üye'yi etiketle!").setColor(ff0000));
if(uye.roles.cache.has(client.rol.altyapı)) return message.channel.send(embed.setDescription("Bu üye'nin `"+message.guild.roles.cache.get(client.rol.altyapı).name+"` rolü var!").setColor(ff0000));
message.channel.send(embed.setDescription("Başarıyla kullanıcıya `"+message.guild.roles.cache.get(client.rol.altyapı).name+"` rolü verildi!").setColor("00ff00"))
uye.roles.add(client.rol.altyapı)}}

if(args[0] === "al"){
if(!["js", "altyapı"].includes(args[1])) return message.channel.send(embed.setDescription("JavaScript rolü alacaksanız `js`, Altyapı rolü alacaksanız `altyapı`").setColor(ff0000));
if(args[1] === "js"){
if(!uye) return message.channel.send(embed.setDescription("Rol alacağınız üye'yi etiketle!").setColor(ff0000));
if(!uye.roles.cache.has(client.rol.js)) return message.channel.send(embed.setDescription("Bu üye'nin `"+message.guild.roles.cache.get(client.rol.js).name+"` rolü yok!").setColor(ff0000));
message.channel.send(embed.setDescription("Başarıyla kullanıcı'nın `"+message.guild.roles.cache.get(client.rol.js).name+"` rolü alındı!").setColor("00ff00"))
uye.roles.remove(client.rol.js)}
if(args[1] === "altyapı"){
if(!uye) return message.channel.send(embed.setDescription("Rol alacağınız üye'yi etiketle!"));
if(!uye.roles.cache.has(client.rol.altyapı)) return message.channel.send(embed.setDescription("Bu üye'nin `"+message.guild.roles.cache.get(client.rol.altyapı).name+"` rolü yok!").setColor(ff0000));
message.channel.send(embed.setDescription("Başarıyla kullanıcı'nın `"+message.guild.roles.cache.get(client.rol.altyapı).name+"` rolü alındı!").setColor("00ff00"))
uye.roles.remove(client.rol.altyapı)}}}
