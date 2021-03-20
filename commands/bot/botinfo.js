//Here the command starts
const Discord = require('discord.js')

module.exports = {
    //definition
    name: "bot-info", //the name of the command 
    category: "bot", //the category this will be listed at, for the help cmd
    aliases: ["botinfo"], //every parameter can be an alias
    cooldown: 2, //this will set it to a 2 second cooldown
    usage: "botinfo", //this is for the help command for EACH cmd
    description: "Gives you information on the Bot", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
        const { version } = require("discord.js")
        var serversembed = new Discord.MessageEmbed()
        .setTitle(`📝Informations sur ${client.user.username}`)
        .addField(`<:bot:734458969216778340> | Bot certifié :`,`Non.`)
        .addField(`:satellite: | Je suis actif sur :`,`${client.guilds.cache.size} serveurs.`, true)
        .addField(":ping_pong: | J'ai un ping de : ", Math.round(client.ws.ping) + "ms", true)
        .addField("📋 Nom :", `${client.user.username}`, true)
        .addField("🔗 Tag :", "#" + `${client.user.discriminator}`, true)
        .addField("📊 Utilisateurs :", `${client.users.cache.size}`, true)
        .addField("🔧 Version de discord.js :", `v${version}`, true)
        .addField("🔨 Version de node.js :", `${process.version}`, true)
        .addField("<:online:734458973016817714> En ligne depuis :", (Math.round(client.uptime / (1000 * 60 * 60))) + ' heures ' + (Math.round(client.uptime / (1000 * 60)) % 60) + ' minutes ' + (Math.round(client.uptime / 1000) % 60) + ' secondes ', true)
        .addField("💾 __Mémoire__ :", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}` + " MB", true)
        .addField("<:devcertifier:734458970168754297>  Développeurs :", "**Artlfmj#0001**", true)
        .setFooter(`${client.user.tag}`, client.user.displayAvatarURL)

        .setColor("RANDOM")
        .setThumbnail(client.user.avatarURL)
        .setTimestamp()
        message.channel.send(serversembed);
    }
    
}