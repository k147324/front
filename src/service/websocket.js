import store from "../store";
const WebsocketService = {
  socket: null,
  listeners: {},
  connect(url, data) {
    this.socket = new WebSocket(url);
    this.socket.onopen = () => {
      console.log("Websocket connected");
      this.socket.send(
        JSON.stringify({ type: "identify", client: "web", data: data })
      );
    };
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received message", message);
      if (message.type === "studentData") {
        console.log(message.data);
        this.dispatchEvent("studentData", message.data);
      } else if (message.type === "record") {
        console.log("receive record");
        this.dispatchEvent("record", message.data);
      } else if (message.type === "notification") {
        console.log("receive notification");
        this.dispatchEvent("notification", message.data);
      }
    };
  },
  sendStudentRequest() {
    this.socket.send(
      JSON.stringify({
        type: "student_request",
      })
    );
  },
  sendMessage(data) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(data);
      console.log("Sent message:", data);
    } else {
      console.error("WebSocket is not open.");
    }
  },
  close() {
    if (this.socket) {
      this.socket.close();
    }
  },
  sendClearRequest(data) {
    this.socket.send(
      JSON.stringify({
        type: "Clear_request",
        data: data,
      })
    );
  },
  sendRecordRequest(data) {
    this.socket.send(
      JSON.stringify({
        type: "Record_request",
        data: data,
      })
    );
  },
  send_start_detection() {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, "0");
    const mins = String(now.getMinutes()).padStart(2, "0");
    const secs = String(now.getSeconds()).padStart(2, "0");
    const currentTime = `${hrs}:${mins}:${secs}`;
    this.socket.send(
      JSON.stringify({
        type: "start_detection",
        data: currentTime,
      })
    );
  },
  send_record(data) {
    this.socket.send(
      JSON.stringify({
        type: "record_request",
        data: data,
      })
    );
  },
  send_stop_detection() {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, "0");
    const mins = String(now.getMinutes()).padStart(2, "0");
    const secs = String(now.getSeconds()).padStart(2, "0");
    const currentTime = `${hrs}:${mins}:${secs}`;
    this.socket.send(
      JSON.stringify({
        type: "stop_detection",
        data: currentTime,
      })
    );
  },
  addEventListener(eventName, callback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
    console.log(`Listener added for event: ${eventName}`);
  },

  dispatchEvent(eventName, detail) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((callback) => callback(detail));
      console.log(`Event dispatched: ${eventName}`);
    }
  },
};
export default WebsocketService;
