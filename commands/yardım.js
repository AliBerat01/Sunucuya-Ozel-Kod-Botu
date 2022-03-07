const Discord = require('discord.js')
const ayarlar = require("../config.json")

exports.conf = {
  name: "yardım",
  aliases: ["h", "y"]
};

exports.run = async(client, message, args) => {
if(!message.member.roles.cache.has(client.rol.yetkili)){
return message.channel.send(new Discord.MessageEmbed().setDescription("Bu komutu kullanabilmek için <@&"+client.rol.yetkili+"> rolüne sahip olmalısın!"))
}
const p = ayarlar.prefix;
const komutMap = client.commands.filter((x) => x.conf.name).sort((a, b) => b.conf.name - a.conf.name).map((x) => `**${p}${x.conf.name}**`).join("\n");

const embed = new Discord.MessageEmbed()
.setDescription(komutMap || "Komut Bulunmamakta!")
return message.channel.send({ embed: embed });
};
