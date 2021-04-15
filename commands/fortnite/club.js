//Here the command starts
const Discord = require('discord.js')
module.exports = {
    //definition
    name: "club", //the name of the command 
    category: "fortnite", //the category this will be listed at, for the help cmd
    aliases: [""], //every parameter can be an alias
    cooldown: 2, //this will set it to a 2 second cooldown
    usage: "", //this is for the help command for EACH cmd
    description: "", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
       const Club = new Discord.MessageEmbed()
       .setTitle("Informations sur le Club Fortnite")
       .addField("Passe combat Inclus","Vous êtes membre du club de fortnite ? Félicitations ! Cela vous donne accès au passe de combat de la saison entière et vous permet de recevoir les prochains passes de combat tant que vous êtes abonné. Grâce au passe de combat, Déverrouillez 100 récompenses incroyables rien qu'en jouant à Fortnite.")
        .addField("1000 v-bucks en bonus chaque mois", "Chaque mois, vous recevrez 1000 v-bucks à dépenser dans les derniers objets cosmétiques à la mode (tenues, emotes, etc.). Et, grâce au passe de combat inclus, vous pourrez déverrouiller encore plus de v-bucks !")
        .addField("Un nouveau pack du club chaque mois","Le pack du club est un ensemble exclusif comprenant une tenue que vous pouvez garder indéfiniment. Chaque mois, nous sélectionnons spécialement une nouvelle tenue ainsi qu'au moins un accessoire correspondant, comme par exemple un planeur, une pioche ou une emote.")
        .addField("Plus d'informations", "Pour voir plus d'informations sur le club, cliquez [**ICI**](https://www.epicgames.com/fortnite/fr/fortnite-crew-subscription)")
        .setImage("https://media.discordapp.net/attachments/829684737580597248/830862320431267880/Capture.JPG")
        .setTimestamp()
        .setColor("#2f3136")
        .setFooter("© Copyright Shop 2021")
       message.channel.send(Club)
    }
}