class Conversation {
    constructor(participants, initialMessage) {
        this.participants = participants;
        this.messages = [];
        this.message.push(initialMessage);
    }

    addMessageToConversation(message) {
        this.messages.push(message);
    }

    listMessagesInConversation() {
        console.log(this.sender + " <-> " + this.receiver);
        for (var i = 0; i < this.messages.length; i++) {
            console.log(this.messages[i].getFormattedTimestamp());
            console.log(this.messages[i].content);
        }
    }
}