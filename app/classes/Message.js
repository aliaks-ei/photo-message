class Message {
  constructor() {
    this.messages = [];

    this.socket = io();

    // Handle connection error
    this.socket.once("connect_error", () => {
      window.dispatchEvent(new Event("messages_error"));
    });

    // Listen for new message from server
    this.socket.on("new_message", (message) => {
      this.messages.unshift(message);

      window.dispatchEvent(new CustomEvent("new_message", { detail: message }));
    });

    // Listen for existing messages from server
    this.socket.on("all_messages", (messages) => {
      this.messages = messages;

      window.dispatchEvent(new Event("messages_ready"));
    });
  }

  // Get all messages
  get all() {
    return this.messages;
  }

  // Add a new message
  add(photo, caption) {
    let message = { photo, caption };

    this.messages.unshift(message);
    this.socket.emit("new_message", message);

    return message;
  }
}
