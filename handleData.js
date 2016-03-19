
function processCharacterData(dataSetSize) {
    var categories = [];
    var values = [];

    categories.push(firstData, secondData);

    return categories;
}

// Begin MessageThread Definition
var MessageThread = function(sender, receiver) {
    this.sender = sender;
    this.receiver = receiver;
    this.messages = [];
}

MessageThread.prototype.addMessageToThread = function (message) {
    this.content.push(message);
}

MessageThread.prototype.listMessagesInThread = function () {
    for (var i = 0; i < this.messages.length; i++) {
        console.log(this.sender + " -> " + this.receiver);
        console.log(this.messages[i].getFormattedTimestamp());
        console.log(this.messages[i].content);
    }
}

// Begin Message Definition
var Message = function(content) {
    this.timeStamp = new Date();
    this.content = content;
}

Message.prototype.getFormattedTimestamp = function () {
    return  "Message sent on: " + 
            this.timeStamp.getDate() + "/" +
            (this.timeStamp.getMonth() + 1) + "/" +
            this.timeStamp.getFullYear() + " @ " +
            this.timeStamp.getHours() + ":" +
            this.timeStamp.getMinutes() + ":" +
            this.timeStamp.getSeconds();
}



// Begin Game Definition
var Game = function(dungeonMaster, characters) {
    this.dungeonMaster = dungeonMaster;
    this.characters = characters;
}

Game.prototype.listPlayers = function() {
    console.log("Your Dungeon Master is:\n" + this.dungeonMaster.playerName);
    console.log("Adventurers:");
    for (var i = 0; i < this.characters.length; i++) {
        console.log(this.characters[i].playerName);
    }
}

// Begin Player Definition
var Player = function() {
    this.isCharacter = true;
    this.addressBook = [];          // Left off here, need each player have knowledge of
    this.messageThreads = [];       // other players, to send messages.
};

Player.prototype.greet = function() {
    if (this.isCharacter) {
        console.log("Welcome, " + this.characterName + 
                    ", the Level " + this.characterLevel + 
                    " " + this.characterClass + 
                    " " + this.characterRace + "!");
    } else {
        console.log("Welcome, Dungeon Master " + this.playerName + "!");
    }
};

Player.prototype.sendMessage = function(recipient, content) {       // Will change all invalid references to "characters" 
    for (var i = 0; i < characters.length; i++) {                   // into valid references to "this.addressBook"
        if (characters[i].realName === recipient || characters[i].characterName === recipient) {
            if (characters[i].messageThreads.length === 0) {
                var newMessageThread = new MessageThread(this.characterName, recipient);
                characters[i].messageThreads.push(newMessageThread);
                characters[i].messageThreads[0].addMessageToThread(new Message(content));
            } else {
                for (var j = 0; j < messageThreads.length; j++) {
                    if (character[i].messageThreads[j].sender === this.characterName) {
                        character[i].messageThreads[j].addMessageToThread(new Message(content));
                    } else if (j === (messageThreads.length - 1)) {
                        var newMessageThread = new MessageThread(this.characterName, recipient, content);
                        characters[i].messageThreads.push(newMessageThread);
                    }
                }
            }
        } else {
            console.log("Character/Player not found.");
        }
    }
}

// Begin Character Definition
var Character = function(realName, gameName, level, gameClass, race) {
    Player.call(this); 
    this.playerName = realName;
    this.characterName = gameName;
    this.characterLevel = level;
    this.characterClass = gameClass;
    this.characterRace = race;
};

Character.prototype = Object.create(Player.prototype);
Character.prototype.constructor = Character;

// Begin Dungeon Master Definition
var DungeonMaster = function(realName) {
    this.playerName = realName;
    this.isCharacter = false;
};

DungeonMaster.prototype = Object.create(Player.prototype);
DungeonMaster.prototype.constructor = DungeonMaster;

// Begin Observer Definition
var Observer = function(realName) {
    this.playerName = realName;
};

Observer.prototype = Object.create(Player.prototype);
Observer.prototype.constructor = Observer;

Observer.prototype.greet = function() {
    console.log("I, " + this.playerName + " am neither a Character nor " +
                "a Dungeon Master, and therefore my greeting should be " +
                "different from a Player.");
};

// Making use of the stuff above
var zach = new DungeonMaster("Zach");
var molly = new Character("Molly", "Kalen", 3, "Rogue", "Human?");
var nick = new Character("Nick", "Delmirev", 3, "Paladin", "Dragonborn");
var nate = new Observer("Nate");
var game = new Game(zach, [molly, nick]);

game.listPlayers();

zach.greet();
molly.greet();
nick.greet();
nate.greet();

nick.sendMessage("Molly", "Hello, World!");
