const TelegramBot = require('node-telegram-bot-api');
const { intervalDuration } = require('./index');

const token = '**************';

const bot = new TelegramBot(token, {polling: true});

const chats = [];

bot.setMyCommands( [
    {command: '/start', description: 'To begin count you work time press /start'},
    {command: '/rate', description: 'To get current rate press /rate'},
    {command: '/finish', description: 'To stop count your work time, press /finish'}
]);

    bot.on('message', (msg) => {
        const chatId = msg.chat.id;

        if(msg.text === '/start') {
            chats.push({
                chatId, rate: null,
                intervals: []
            });
        }
        console.log(chats)

        if(msg.text.startsWith('rate')){
            const rate = msg.text.split(' ')[1]
            const rateNumber = +rate;
            if(isNaN(rateNumber)) {
                bot.sendMessage(chatId, 'Please enter a number')
                return;
            }
            else if (rateNumber <= 0) {
                bot.sendMessage(chatId, 'Please enter a positive number');
                return;
            }

            for(let i = 0; i < chats.length; i++) {
                if (chats[i].chatId === chatId){
                    chats[i].rate = rate;
                }
            }
            console.log(chats)
            bot.sendMessage(chatId, `Your rate is ${rate}`);
        }

        if(msg.text.startsWith('interval')) {
            const interval = msg.text.substring(9).trim();
            for(let i = 0; i < chats.length; i++) {
                if(chats[i].chatId === chatId){
                    chats[i].intervals.push(interval)
                }
            }
            console.log(chats)
        }

        if(msg.text === '/finish') {
            let intervals = [];
            for(let i = 0; i < chats.length; i++) {
                if(chats[i].chatId === chatId) {
                    intervals = chats[i].intervals;
                }
            }

            let totalTime = 0;
            for(let i = 0; i < intervals.length; i++) {
                totalTime += intervalDuration(intervals[i]);
            }

            let rate = 0;
            for(let i = 0; i < chats.length; i++) {
                if(chats[i].chatId === chatId) {
                    rate = chats[i].rate;
                }
            }

            const totalAmount = +(totalTime / 60 * rate).toFixed(2);

            const hours = Math.floor(totalTime / 60);
            const minutes = totalTime % 60;

            bot.sendMessage(chatId, `You worked ${hours} hours and ${minutes} minutes and earned ${totalAmount} $`)
        }
    });




