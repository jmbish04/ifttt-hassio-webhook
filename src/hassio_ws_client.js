export class HassWebSocketClient {
  constructor(uri, token, onEvent = () = {}) {
    this.uri = uri;
    this.token = token;
    this.onEvent = onEvent;
    this.socket = null;
    this.nextId = 1;
    this.pending = new Map();
    this.subscriptions = new Map();
    this.connected = false;
    this.retryCount = 0;
    this.maxRetries = 5;
  }

  async connect() {
    return new Promise((resolve, reject) = {
      this.socket = new WebSocket(this.uri);

      this.socket.onopen = () = {
        this.connected = true;
        this.retryCount = 0;
        console.log("WebSocket connected");
      };

      this.socket.onmessage = (event) = {
        const msg = JSON.parse(event.data);
        if (msg.type === "auth_required") {
          this.send({ type: "auth", access_token: this.token });
        } else if (msg.type === "auth_ok") {
          resolve(true);
        } else if (msg.type === "auth_invalid") {
          reject(new Error("Invalid authentication"));
        } else if (msg.