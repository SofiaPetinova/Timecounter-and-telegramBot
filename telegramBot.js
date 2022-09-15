const TelegramBot = require('node-telegram-bot-api');
const {timeDuration} = require('./index');

const token = '5532680312:AAFX9V-I7M6YhAA88yoMkv_z5Rs69D4f-QQ';

const bot = new TelegramBot(token, {polling: true});

const chats = [];

bot.setMyCommands( [
    {command: '/start', description: 'To begin count you work time press /start'},
    {command: '/rate', description: 'To get current rate press /rate'},
    {command: '/finish', description: 'To stop count your work time, press /finish'}
])

    bot.on('message', (msg) => {
        const chatId = msg.chat.id;

        if(msg.text === '/start') {
            chats.push({
                chatId, rate: null,
                intervals: []
            })
        }

        if(msg.text.startsWith('rate')){
            const rate = msg.text.split(' ')[1]
            // const rateNumber = +rate
            // if(isNan(rateNumber)) {
            //     bot.sendMessage(chatId, 'Please enter a number' )
            // }
            for(let i = 0; i < chats.length; i++) {
                if (chats[i].chatId === chatId){
                    chats[i].rate = rate;
                }
            }
            bot.sendMessage(chatId, `Your rate is ${rate}`);
        }

        if(msg.text.startsWith('interval')) {
            const interval = msg.text.substring(9).trim();
            for(let i = 0; i < chats.length; i++) {
                if(chats[i].chatId === chatId){
                    chats[i].intervals.push(interval)
                }
            }
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
                totalTime += timeDuration(intervals[i]);
            }


        }

    });




