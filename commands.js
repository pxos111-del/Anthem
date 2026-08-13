const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const cron = require('node-cron');

module.exports = (client) => {
    let voters = new Set();
    const CHANNEL_ID = '1499771185246896128';

    // الجدولة التلقائية كل يوم الساعة 12
    cron.schedule('0 0 * * *', async () => {
        const channel = await client.channels.fetch(CHANNEL_ID);
        if (channel) {
            voters.clear();
            const embed = new EmbedBuilder()
                .setTitle('👋 Welcome to LPC Clan!')
                .setDescription('Hello everyone! A new day has started. Please click the ✅ button below to confirm your presence.')
                .setColor(0x00FF00)
                .addFields({ name: 'Total Count:', value: '0', inline: true })
                .setFooter({ text: 'LPC Clan Attendance System' });

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('check_presence').setLabel('✅').setStyle(ButtonStyle.Success)
            );
            
            await channel.send({ content: '@everyone', embeds: [embed], components: [row] });
        }
    });

    // أمر الحضور (للأونر)
    client.on('messageCreate', async message => {
        if (message.author.bot) return;
        if (!message.guild) return;

        if (message.content === '!attendance') {
            if (message.author.id !== message.guild.ownerId) return;

            voters.clear();
            const embed = new EmbedBuilder()
                .setTitle('👋 Welcome to LPC Clan!')
                .setDescription('Hello everyone! Please click the ✅ button below to confirm your presence.')
                .setColor(0x00FF00)
                .addFields({ name: 'Total Count:', value: '0', inline: true })
                .setFooter({ text: 'LPC Clan Attendance System' });

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('check_presence').setLabel('✅').setStyle(ButtonStyle.Success)
            );
            
            await message.channel.send({ content: '@everyone', embeds: [embed], components: [row] });
        }
    });

    // تفاعل الزرار (المعدل لمنع خطأ المهلة)
    client.on('interactionCreate', async interaction => {
        if (!interaction.isButton()) return;
        
        if (interaction.customId === 'check_presence') {
            if (voters.has(interaction.user.id)) {
                return interaction.reply({ content: 'You have already registered your attendance today!', ephemeral: true });
            }

            // استجابة فورية لمنع خطأ الـ 3 ثواني
            await interaction.deferUpdate();

            voters.add(interaction.user.id);

            const updatedEmbed = new EmbedBuilder()
                .setTitle('👋 Welcome to LPC Clan!')
                .setDescription('Hello everyone! A new day has started. Please click the ✅ button below to confirm your presence.')
                .setColor(0x00FF00)
                .addFields({ name: 'Total Count:', value: `${voters.size}`, inline: true })
                .setFooter({ text: 'LPC Clan Attendance System' });

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('check_presence').setLabel('✅').setStyle(ButtonStyle.Success)
            );
            
            // استخدام editReply بدلاً من interaction.update بعد الـ defer
            await interaction.editReply({ embeds: [updatedEmbed], components: [row] });
        }
    });
};
