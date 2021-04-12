//Here the command starts
const Discord = require('discord.js')

module.exports = {
    //definition
    name: "bot-info", //the name of the command 
    category: "info", //the category this will be listed at, for the help cmd
    aliases: ["botinfo"], //every parameter can be an alias
    cooldown: 2, //this will set it to a 2 second cooldown
    usage: "botinfo", //this is for the help command for EACH cmd
    description: "Gives you information on the Bot", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
        message.channel.startTyping()
        message.delete()
        const pong = new Discord.MessageEmbed()
        .setTitle("Chargement des statistiques...")
        .setColor("#2f3136")
        const msg = await message.channel.send(pong); 
        const { version } = require("discord.js")
        const ayy = client.emojis.cache.find(emoji => emoji.name === "Discord_js_logo");
        var serversembed = new Discord.MessageEmbed()
        .setTitle(`📝Informations sur ${client.user.username}`)
        .addField(`:robot: | Bot certifié :`,`Non.`)
        .addField(`:satellite: | Je suis actif sur :`,`${client.guilds.cache.size} serveurs.`, true)
        .addField(":ping_pong: | J'ai un ping de : ", Math.round(client.ws.ping) + "ms", true)
        .addField("📋 Nom :", `${client.user.username}`, true)
        .addField("🔗 Tag :", "#" + `${client.user.discriminator}`, true)
        .addField("📊 Utilisateurs :", `${client.users.cache.size}`, true)
        .addField("🔧 Version de discord.js :", `v${version}`, true)
        .addField("🔨 Version de node.js :", `${process.version}`, true)
        .addField("⚡ En ligne depuis :", (Math.round(client.uptime / (1000 * 60 * 60))) + ' heures ' + (Math.round(client.uptime / (1000 * 60)) % 60) + ' minutes ' + (Math.round(client.uptime / 1000) % 60) + ' secondes ', true)
        .addField("💾 __Mémoire__ :", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}` + " MB", true)
        .addField("<:Discord_js_logo:829410778645790771> Développeurs :", "**Artlfmj#0001**", true)
        .setFooter(`${client.user.tag}`, client.user.displayAvatarURL)

        .setColor("RANDOM")
        .setThumbnail(client.user.avatarURL)
        .setTimestamp()
        msg.edit(serversembed);
        message.channel.stopTyping()
        const log = new Discord.MessageEmbed()
        .setTitle(`Utilisation de la commande botinfo | ${client.user.username}`)
        .setTimestamp()
        .setDescription(`La commande botinfo a été utilisée`) 
        .addField("Salon d'utilisation", message.channel, true)
        .addField("Utilisateur", message.author.username, true)
        .addField("Serveur", message.guild.name, true)
        .addField("Date", new Date(), true)
        .setColor("BLUE")
        client.channels.cache.get("828915153432084510").send(log)
    }
    
}