client.on("guildCreate", guild => {
    
    console.log(`${guild.name} vient de m'ajouter !`)
    const Add = new Discord.MessageEmbed()
    .setTitle(`Merci de l'ajout sur ${guild.name}!`)
    .setDescription(`Si tu souhaites m'ajouter tu peux faire la commande **s!invite**`)
    .setColor("BLUE")
    client.channels.cache.get('782173466375880724').send(Add);
})

client.on("guildDelete", guild => {
    
    console.log(`${guild.name} a retiré ce bot !`)
    const Add = new Discord.MessageEmbed()
    .setTitle(`Au revoir ${guild.name} !`)
    .setDescription(`Si tu souhaites m'ajouter tu peux faire la commande **s!invite**`)
    .setColor("BLUE")
    client.channels.cache.get('782173466375880724').send(Add);
})

client.on('message', message => {
    const args = message.content.trim().split(/ +/g)
	if (message.content.startsWith(`ping`)) {
        message.channel.send('Pong.');
        console.log('Repondu a ping');
        
    } else if (message.content.startsWith(`beep`)) {
        message.channel.send('Boop.');
        console.log('Repondu a beep');
    }
    else if (message.content === `${prefix}server`) {
        const Serveurinfo = new Discord.MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('Serveur Info')
	        .setAuthor('Shop Bot par Artlfmj#0310', 'https://imgur.com/a/NyPT4RO', 'https://www.youtube.com/channel/UCLee-XQyphWxB7mQ_beGIyg')
	        .setDescription(`Ce serveur s'appelle ${message.guild.name}. \nSur ce serveur nous sommes ${message.guild.memberCount}! \nIl a été créé le ${message.guild.createdAt}`)
	        .setTimestamp()
	        .setFooter('Copyright Intermarket 2020', 'https://cdn.discordapp.com/attachments/745266722692530259/768033163880300574/logo.png');

        message.channel.send(Serveurinfo);
        console.log('Envoyé infos serveur');
    }
    else if (message.content === `${prefix}user-info`) {
        message.channel.send(`Votre pseudo: ${message.author.username}\nVotre id: ${message.author.id}`);
        console.log('Envoyé infos utilisateur');
    }
    else if (message.content === `${prefix}avatar`) {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
            
        }
    
        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
        
        });
    
        // send the entire array of strings as a message
        // by default, discord.js will `.join()` the array with `\n`
        message.channel.send(avatarList);
        console.log('Envoyé avatar');
    }

    else if (message.content === `${prefix}help`) {
        message.react('👍');
        const exampleEmbed = new Discord.MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('Commandes et outils')
            .setDescription('**Bienvenue sur ce bot.** \n \nQuelques commandes deja créés: \nLa basique réponse beep boop ou ping pong\n**server** (Informations sur le serveur de ce message)\n**user-info** (Recupere ton tag ou identifiant Discord plus que rapidement)\n**avatar** (permet de recuperer un lien vers ton avatar)\n**shop** (Montre le shop fortnite du jour)\n**version** Version du bot\n**maintenance** Obtiens des informations sur les maintenances\n**patch-note** Dernier patch note du bot\n**invite** Soutiens nous!\nLe préfixe du bot est reglé sur du **s![commande]**  ')
	        .setTimestamp()
	        .setFooter('Copyright Intermarket 2020. Codé par Artlfmj#0310', 'https://cdn.discordapp.com/attachments/704776096389791876/769608979302973490/fortnite.jpg');

        message.channel.send(exampleEmbed);
        console.log('Envoyé page aide');
    }

    else if (message.content === `${prefix}shop`) {
        const Shop = new Discord.MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('Shop Fortnite')
	        .setAuthor('Shop Bot par Artlfmj#0310', 'https://imgur.com/a/NyPT4RO', 'https://www.youtube.com/channel/UCLee-XQyphWxB7mQ_beGIyg')
	        .setDescription(`Shop Fortnite du jour: https://api.nitestats.com/v1/shop/image`)
            .setImage(' https://api.nitestats.com/v1/shop/image')
            .setTimestamp()
	        .setFooter('Copyright Intermarket 2020', 'https://cdn.discordapp.com/attachments/745266722692530259/768033163880300574/logo.png');

        message.channel.send(Shop);
        const ShopImage = new Discord.MessageAttachment()
        message.channel.send("My Bot's message", {files: ["https://api.nitestats.com/v1/shop/image"]});

        message.channel.send(`Si probleme d'affichage: https://api.nitestats.com/v1/shop/image`)
        console.log('Envoyé shop');
    }
    else if (message.content === `${prefix}invite`) {
        const Invite = new Discord.MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('Comment nous soutenir?')
	        .setAuthor('Shop Bot par Artlfmj#0310', 'https://imgur.com/a/NyPT4RO', 'https://www.youtube.com/channel/UCLee-XQyphWxB7mQ_beGIyg')
	        .setDescription("Pour nous soutenir vous pouvez m'add : https://discord.com/oauth2/authorize?client_id=769571046759989268&scope=bot&permissions=1879056446 \nLe serv de support: https://discord.gg/N6K6VF5")
            .setTimestamp()
            .setURL("https://discord.gg/N6K6VF5")
	        .setFooter('Copyright Intermarket 2020', 'https://cdn.discordapp.com/attachments/745266722692530259/768033163880300574/logo.png');

        message.channel.send(Invite);
        console.log('Envoyé invite');
    }
    else if (message.content === `${prefix}maintenance`) {
        const Maintenance = new Discord.MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle("Maintenance?")
	        .setAuthor('Shop Bot par Artlfmj#0310', 'https://imgur.com/a/NyPT4RO', 'https://www.youtube.com/channel/UCLee-XQyphWxB7mQ_beGIyg')
	        .setDescription("Le bot est en maintenance? C'est possible! Vous pouvez le savoir en voyant le bot s'eteindre et s'allumer en permanence")
            .setTimestamp()
	        .setFooter('Copyright Intermarket 2020', 'https://cdn.discordapp.com/attachments/745266722692530259/768033163880300574/logo.png');

        message.channel.send(Maintenance);
        console.log('Envoyé invite');
    }
    else if (message.content === `${prefix}patch-note actuel`) {
        
        const PatchNote = new Discord.MessageEmbed()
        .setTitle("Patch note actuel:")
        .setDescription("Patch note du 25/11: \n - Ajout patch note choix\n - Ajout commandes : prefix,statut, et word reaction bug. **Pas encore ajoutés sur s!help**. \n\n\n**REPRISES DES MAINTENANCES BIENTOT**")
        message.channel.send(PatchNote)
        
    }
    else if (message.content === prefix + "patch-note"){
        const PatchNote = new Discord.MessageEmbed()
        .setTitle("Patch note actuel:")
        .setDescription("Patch note du 25/11: \n - Ajout patch note choix\n - Ajout commandes : prefix,statut, et word reaction bug. **Pas encore ajoutés sur s!help**. \n\n\n**REPRISES DES MAINTENANCES BIENTOT**")
        message.channel.send(PatchNote)
    }
    else if (message.content === prefix + "patch-note 18/11"){
        const PatchNote = new Discord.MessageEmbed()
        .setTitle("Patch note actuel:")
        .setDescription("Patch note du 18/11: \n - Amelioration de la commande invite et version\n -   Correction et finalisation de la commande version\n \n **Commandes prévues** \n -   Correction et amelioration commande shop\n -    Mise en embed de user-data et patch-note")
        message.channel.send(PatchNote)
    }
    else if (message.content === `${prefix}version`) {
        message.channel.send("Ce bot est en version: **1.15** En cas de probleme, rejoignez le serveur de support:")
        const Invite = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Comment nous soutenir?')
        .setAuthor('Shop Bot par Artlfmj#0310', 'https://imgur.com/a/NyPT4RO', 'https://www.youtube.com/channel/UCLee-XQyphWxB7mQ_beGIyg')
        .setDescription("Pour nous soutenir vous pouvez m'add : https://discord.com/oauth2/authorize?client_id=769571046759989268&scope=bot&permissions=1879056446 \nLe serv de support: https://discord.gg/N6K6VF5")
        .setTimestamp()
        .setURL("https://discord.gg/N6K6VF5")
        .setFooter('Copyright Intermarket 2020', 'https://cdn.discordapp.com/attachments/745266722692530259/768033163880300574/logo.png');

        message.channel.send(Invite);
        console.log('Envoyé version');
    }
    else if (message.content === 'bug'){
        message.channel.send("QUOI? Je suis en panne? Tu te trompes? Non peut etre ca arrive. Si c'est le cas envoie un message sur le discord de support **TOUT DE SUITE** Merci d'avance")
    }
    if(message.content === prefix + "statut"){
        if (message.author.bot) return;
        const Statut = new Discord.MessageEmbed()
        .setTitle("Statut des services")
        .setDescription(`Connexion à ${client.user.tag} réussie\nBien connecté sur ce serveur (${message.guild.name})\nTout les services chargés\n${message.author.username}, rejoignez le serveur de support!`)
        .setFooter(`Demandé par ${message.author.username} sur ${message.guild.name}`)
        message.channel.send(Statut)
    }
    if(message.content === prefix){
        message.channel.send(`Mon prefix est réglé sur ` + prefix)
    }
    
});