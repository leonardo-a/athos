import dayjs from "dayjs";

import { iMessageObj } from "../@types/message";

import { Chat } from "../models/Chat";
import { generateCompletion } from "../controllers/openAi";

export class ChatRepository {
    currentChats: Chat[]
    minutesForTimeout: number;

    constructor() {
        this.currentChats = [];
        this.minutesForTimeout = 30;
    }

    async chatTimeoutDisconnection() {
        setInterval(() => {
            if(this.currentChats.length > 0) {
                this.currentChats.map( chat => {
                    if( dayjs() >= dayjs(chat.timestamp).add(this.minutesForTimeout, 'minutes') ) {
                        this.closeChat(chat.number);
                    }
                } )
            }
        }, 3000);
    }

    async messageProcess( message: iMessageObj ) {
        const { from, type, body } = message;

        const getChat = this.getChatByNumber(from);

        const chat = getChat ? getChat : this.newChat(from);

        if(type != "chat" || body == "") {
           return false;
        }

        chat.messages.push(`Human: ${message.body}`);

        return await this.aiReply(chat);
    }

    getChatByNumber(number: string) {
        const chat = this.currentChats.find( chat => chat.number === number );

        return chat ? chat : false;

    }

    newChat(user: string): Chat {
        const chat = new Chat(user);

        // chat.messages.push(`Human\n\n`);

        this.currentChats.push(chat);

        return chat;
    }

    closeChat(number: string) {
        const chat = this.getChatByNumber(number);
    
        if(!chat) {
            return {error: `process not found`};
        }

        const {} = chat;
    
        const chatIndex = this.currentChats.indexOf(chat);
    
        if( chatIndex === -1 ) {
            return {error: `process index not found`};
        }
    
        this.currentChats.splice(chatIndex,1);
    } 

    async aiReply(chat: Chat) {
        const reply = await generateCompletion(chat.messages.join(''));

        if(!reply) {
            return false;
        }

        chat.messages.push(reply);
        
        return this.formatMessage(reply);
    }

    formatMessage(msg: string) {
        msg = msg.replace(/(?:\r\n|\r|\n)/g, '');

        if(msg.includes("AI: ")) {
            msg = msg.split("AI: ")[1]
        }

        return msg;
    }
}