import { io } from "socket.io-client";
export const socket = io("http://localhost:3333");

export const state = reactive({
    connected: false
  });

socket.on("connect", () => {
  state.connected = true;
});