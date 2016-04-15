
function processCharacterData(dataSetSize) {
    var categories = [];
    var values = [];

    categories.push(firstData, secondData);

    return categories;
}

// Begin Message Definition
class Message {
    constructor(content) {
        this.timeStamp = new Date();
        this.content = content;
    }

    getFormattedTimestamp() {
        return  "Message sent on: " + 
                this.timeStamp.getDate() + "/" +
                (this.timeStamp.getMonth() + 1) + "/" +
                this.timeStamp.getFullYear() + " @ " +
                this.timeStamp.getHours() + ":" +
                this.timeStamp.getMinutes() + ":" +
                this.timeStamp.getSeconds();
    }
}

// Begin MessageThread Definition
class MessageThread {
    constructor(sender, receiver) {
        this.sender = sender;
        this.receiver = receiver;
        this.messages = [];
    }

    addMessageToThread(message) {
        this.messages.push(message);
    }

    listMessagesInThread() {
        console.log(this.sender + " <-> " + this.receiver);
        for (var i = 0; i < this.messages.length; i++) {
            console.log(this.messages[i].getFormattedTimestamp());
            console.log(this.messages[i].content);
        }
    }
}

class Game {
    constructor(dungeonMaster, characters) {
        this.dungeonMaster = dungeonMaster;
        this.characters = characters;
    }

    listPlayers() {
        console.log("Your Dungeon Master is:\n" + this.dungeonMaster.playerName);
        console.log("Adventurers:");
        for (var i = 0; i < this.characters.length; i++) {
            console.log(this.characters[i].playerName);
        }
    }

    establishAddressBooks() {
        this.dungeonMaster.addressBook = this.dungeonMaster.addressBook.concat(this.characters);
        for (var i = 0; i < this.characters.length; i++) {
            this.characters[i].addressBook.push(this.dungeonMaster);
            this.characters[i].addressBook = this.characters[i].addressBook.concat(this.characters);
            this.characters[i].addressBook.splice(i+1, 1);
        }
    }
}

// Begin Player Definition
class Player {
    constructor() {
        this.isCharacter = true;
        this.addressBook = [];
        this.messageThreads = [];
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
        for (var i = 0; i < this.addressBook.length; i++) {
            if (this.addressBook[i].playerName === recipient || this.addressBook[i].characterName === recipient) {
                if (this.addressBook[i].messageThreads.length === 0) {
                    var newMessageThread = new MessageThread(this.characterName, this.addressBook[i].characterName);
                    this.addressBook[i].messageThreads.push(newMessageThread);
                    this.addressBook[i].messageThreads[0].addMessageToThread(new Message(content));
                } else {
                    for (var j = 0; j < this.addressBook[i].messageThreads.length; j++) {
                        if (this.addressBook[i].messageThreads[j].sender === this.characterName) {
                            this.addressBook[i].messageThreads[j].addMessageToThread(new Message(content));
                        } else if (j === (messageThreads.length - 1)) {
                            var newMessageThread = new MessageThread(this.characterName, recipient, content);
                            this.addressBook[i].messageThreads.push(newMessageThread);
                        }
                    }
                }
            }
        }
    }
}

// Begin Character Definition
class Character extends Player {
    constructor() {
        super();

        this.playerName = realName;
        this.characterName = gameName;
        this.characterLevel = level;
        this.characterClass = gameClass;
        this.characterRace = race;
    }
}

// Begin Dungeon Master Definition
class DungeonMaster {
    constructor() {
        super();

        this.playerName = realName;
        this.characterName = "Dungeon Master";
        this.isCharacter = false;
    }
}

// Making use of the stuff above
var zach = new DungeonMaster("Zach");
var molly = new Character("Molly", "Kalen", 3, "Rogue", "Human?");
var nick = new Character("Nick", "Delmirev", 3, "Paladin", "Dragonborn");
var game = new Game(zach, [molly, nick]);
game.establishAddressBooks();

nick.sendMessage("Molly", "Hello, World!");
molly.messageThreads[0].listMessagesInThread();