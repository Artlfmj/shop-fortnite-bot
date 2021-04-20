//here the event starts
const Discord = require('discord.js')

module.exports =  async(client, guild )=> {
    console.log(guild)
    const embed1 = new Discord.MessageEmbed()
    .setTitle(`Merci à ${guild.name} pour l'ajout de notre bot sur leur serveur`)
    
    message.guild.channels.cache.get('828297901956399134').send(embed1)
}