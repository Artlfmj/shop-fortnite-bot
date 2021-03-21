//Here the command starts
const Discord = require('discord.js')

module.exports = {
    //definition
    name: "invite", //the name of the command 
    category: "bot", //the category this will be listed at, for the help cmd
    aliases: ["invite-bot"], //every parameter can be an alias
    cooldown: 2, //this will set it to a 2 second cooldown
    usage: "invite", //this is for the help command for EACH cmd
    description: "Gives you invite link to bot", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
        let image = client.user.displayAvatarURL({
            dynamic: true,
            size: 512,
            format: "png",
          });
        const Invite = new Discord.MessageEmbed()
        .setTitle("Cliquez sur ce lien pour m'add!")
        .setURL("https://discord.com/oauth2/authorize?client_id=769571046759989268&scope=bot&permissions=1879056446")
        .setImage(image)
        .setColor("RANDOM")
        message.channel.send(Invite)

    }
}