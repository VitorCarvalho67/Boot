import { io } from "socket.io-client";
import { reactive } from 'vue';

export const server_url = "http://195.200.2.181:3334";
// export const server_url = "https://f02f7c405f4e1e6fce00528eb2719719.serveo.net/";

export const socket = io(server_url);

export const state = reactive({
  connected: false,
});

socket.on("connect", () => {
  state.connected = true;
  console.log('Connected to Socket.IO server');
});

socket.on("disconnect", () => {
  state.connected = false;
  console.log('Disconnected from Socket.IO server');
});
