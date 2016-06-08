class Conversation {
    constructor(sender, receiver) {
        this.sender = sender;
        this.receiver = receiver;
        this.messages = [];
    }

    addMessageToConversation(message) {
        this.messages.push(message);
    }

    addMessageToRecipientConversation() {
        
    }

    listMessagesInConversation() {
        console.log(this.sender + " <-> " + this.receiver);
        for (var i = 0; i < this.messages.length; i++) {
            console.log(this.messages[i].getFormattedTimestamp());
            console.log(this.messages[i].content);
        }
    }
}