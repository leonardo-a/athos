import dayjs from 'dayjs'

export class Chat {

    number: string;
    messages: string[];
    timestamp: Date;

    constructor(number: string) {
        this.number = number;
        this.messages = [
            "Human: Olá, quem é você?", 
            "AI: Eu sou uma IA chamada Athos. Como posso ajudar hoje?"
        ];
        
        this.timestamp = dayjs().toDate();
    }

}