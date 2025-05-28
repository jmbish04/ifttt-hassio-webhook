export class HassWebSocketClient {
  constructor(uri, token) {
    this.uri = uri;
    this.token = token;
    this.socket = null;
    this.nextId = 1;
    this.pending = new Map();
    this.subscriptions = new Map();
  }

  connect() {
    return new Promise((resolve, reject) = {
      this.socket = new WebSocket(this.uri);

      this.socket.onmessage = (event) = {
        const msg = JSON.parse(event.data);
        if (msg.type === 'auth_required') {
          this.socket.send(JSON.stringify({ type: 'auth', access_token: this.token }));
        } else if (msg.type === 'auth_ok') {
          resolve(true);
        } else if (msg.type === 'auth_invalid') {
          reject(new Error('Authentication failed: ' + msg.message));
        } else if (msg.type === 'result' || msg.type === 'pong') {
          const resolver = this.pending.get(msg.id);
          if (resolver) {
            resolver(msg);
            this.pending.delete(msg.id);
          }
        } else if (msg.type === 'event