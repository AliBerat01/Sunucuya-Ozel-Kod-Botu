const Discord = require('discord.js');

exports.conf = {
    name: "jskod",
    aliases: ["jkod", "javascriptkod", "jscode"]
}

exports.run = async(client, message, args) => {
if(!message.member.roles.cache.has(client.rol.kpaylaşım)) return message.channel.send(new Discord.MessageEmbed().setDescription("Bu komutu kullanabilmek için <@&"+client.rol.kpaylaşım+"> rolüne sahip olmalısın!"));
//if(message.author.id !== ["774591026940739585", "739411430171738142"]){return message.channel.send("**JavaScript** paylaşımı durdurulmuştur!")}
if(message.channel.id !== "KANAL ID") return message.channel.send(new Discord.MessageEmbed().setDescription("Bu komutu sadece <#KANAL ID> kanalında kullanabilirsin!"))  

  let kodIsım = args[0]
  if(!kodIsım) return message.channel.send("Bir kod ismi belirt!")

  let kodLink = args[1]
  if(!kodLink) return message.channel.send("Kodun olduğu bir link gir!\nBu siteden gönderebilirsin: https://www.toptal.com/developers/hastebin/")

  let kodVersion = args[2]
  if(!kodVersion) return message.channel.send("Kodun versionun girmelisin\nÖrnek: **12**/**v12**")
  if(kodVersion > 14) return message.channel.send("Version en fazla **v14** olabilir!")
  if(kodVersion < 11) return message.channel.send("Version en az **v11** olabilir!")
 let v = kodVersion;

  message.guild.channels.create(kodIsım, {
    type: "text",
    parent: "JAVASCRIPT KATEGORI ID"
  }).then(channel => {
    
    let embed = new Discord.MessageEmbed()
    .setAuthor("Kod Paylaşıldı")
    .addField("Yetkili Bilgileri", `Yetkili: \`${message.author.tag}\`\nYetkili ID: \`${message.author.id}\``)
    .addField("Kod Bilgileri", `Kod İsmi: \`${kodIsım}\`\nKategori: \`JavaScript\`\nVersion: \`${message.content.startsWith("v") ? v : `v${v}`}\``)
    .setColor("BLUE")
    
    message.channel.send(`\`${kodIsım}\` adlı kod paylaşıldı!`)
    
 message.guild.channels.cache.get("KOD LOG ID").send(embed)
    

    const kod = new Discord.MessageEmbed()
    .setDescription(`Kod İsmi: **${kodIsım}.js**\nKod: [TIKLA](${kodLink})\nPaylaşan: ${message.author} | \`${message.author.tag}\`\nVersion: \`${message.content.startsWith("v") ? v : `v${v}`}\``)
    channel.send(kod)})
   }
