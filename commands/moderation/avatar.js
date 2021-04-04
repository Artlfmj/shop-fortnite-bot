//Here the command starts
const Discord = require('discord.js')
module.exports = {
    //definition
    name: "avatar", //the name of the command 
    category: "moderation", //the category this will be listed at, for the help cmd
    aliases: ["showavatar"], //every parameter can be an alias
    cooldown: 2, //this will set it to a 2 second cooldown
    usage: "avatar", //this is for the help command for EACH cmd
    description: "Gives you information on how fast the Bot can respond to you", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
        message.delete();
                if (!message.guild.member(client.user).hasPermission("EMBED_LINKS"))return message.channel.send("ERREUR : il me manque la permission ``Intégrer des liens`` pour utiliser l'ensemble de mes commandes (sinon elles ne savent pas d'afficher)"
        );
        if (!message.guild.member(client.user).hasPermission("ATTACH_FILES"))
        return message.channel.send("ERREUR : il me manque la permission ``Attacher des Fihiers``"
        );

        let embed = new Discord.MessageEmbed().setFooter("SHOP");

        let mention = message.mentions.users.first();

        if (!args[0]) {
            var user = message.author;
            let image = user.displayAvatarURL({
                dynamic: true,
                size: 512,
                format: "png",
        });
        embed.setAuthor(`${user.username}#${user.discriminator}`);
        embed.setImage(image);
        embed.setColor("RANDOM")
        return message.channel.send(embed);
        }

        if (mention) {
            var user = message.mentions.users.first();
            let image = user.displayAvatarURL({
                dynamic: true,
                size: 512,
                format: "png",
        });
        embed.setAuthor(`${user.username}#${user.discriminator}`);
        embed.setImage(image);
        embed.setColor("RANDOM")
        return message.channel.send(embed);
        }
        if (args[0]) {
            let user = client.users.cache.get(args[0]);
            if (user == undefined)
            return message.channel.send("ERREUR : L'identifiant n'existe pas dans la base de données"
        );
        embed.setAuthor(`${user.username}#${user.discriminator}`);
        embed.setImage(user.avatarURL({ dynamic: true, size: 512, format: "png" }));
        embed.setColor("RANDOM")
        message.channel.send(embed);
        return;
        } else {
            return message.channel.send("ID invalide");
        }
    }
}