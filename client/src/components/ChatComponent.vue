<template>
    <div>
        <h1>WebSocket Chat</h1>
        <div v-for="message in messages" :key="message.id">
            {{ message.text }}
        </div>
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message" />
    </div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
    name: 'ChatComponent',
    data() {
        return {
            socket: null,
            messages: [],
            newMessage: '',
        };
    },
    created() {
        this.socket = io('http://localhost:3333'); // Altere para o seu servidor se necessário

        // Escute eventos do servidor
        this.socket.on('connect', () => {
            console.log(`Connected: ${this.socket.id}`);
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        this.socket.on('newMessage', (message) => {
            this.messages.push(message);
        });
    },
    methods: {
        sendMessage() {
            if (this.newMessage.trim() !== '') {
                const message = {
                    text: this.newMessage,
                    id: this.socket.id,
                };

                this.socket.emit('sendMessage', message);

                this.messages.push(message);

                this.newMessage = '';
            }
        },
    },
    beforeDestroy() {
        if (this.socket) {
            this.socket.disconnect();
        }
    },
};
</script>

<style scoped>
input {
    width: 100%;
    padding: 8px;
    margin-top: 10px;
}
</style>