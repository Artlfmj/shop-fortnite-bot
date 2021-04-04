//Here the command starts
const Discord = require('discord.js')
module.exports = {
    //definition
    name: "member", //the name of the command 
    category: "", //the category this will be listed at, for the help cmd
    aliases: [""], //every parameter can be an alias
    cooldown: 2, //this will set it to a 2 second cooldown
    usage: "", //this is for the help command for EACH cmd
    description: "", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
        let member = message.author
        const embed1 = new Discord.MessageEmbed()
        .setTitle(`Bienvenue à ${member.username}`)
        .setImage(member.displayAvatarURL({
            dynamic: true,
            size: 512,
            format: "png",
        }))
        .setColor("BLUE")
        .setDescription(`Bienvenue ${member} dans TECHNCODE. Tu peux consulter les regles`)
        message.guild.channels.cache.get('828297901956399134').send(embed1)
    }
}