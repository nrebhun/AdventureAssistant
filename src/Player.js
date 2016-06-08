// Enums
const MessageResults = {
    newConversation     : 0,
    messageSent         : 1,
    recipentNotFound    : 2,
};

class Player {
    constructor(realName, characterName) {
        this.isCharacter = true;
        this.playerName = realName;
        this.characterName = characterName;
        this.addressBook = [];
        this.conversations = {};
    }

    greet() {
        if (this.isCharacter) {
            console.log("Welcome, " + this.characterName + 
                        ", the Level " + this.characterLevel + 
                        " " + this.characterClass + 
                        " " + this.characterRace + "!");
        } else {
            console.log("Welcome, Dungeon Master " + this.playerName + "!");
        }
    }

    printAddressBook() {
        for (var i = 0; i < this.addressBook.length; i++) {
            console.log(this.addressBook[i]);
        }
    }

    sendMessage(recipient, content) {
        var theMessage = new Message(content);

        if (recipient.playerName in this.conversations) {
            this.conversations[recipient.playerName].addMessageToConversation(theMessage);
            return MessageResults.messageSent;
        } else {
            this.conversations[recipient.playerName] = [theMessage];
            return MessageResults.newConversation;
        }
    }
}