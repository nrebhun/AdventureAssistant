
function processCharacterData(dataSetSize) {
    var categories = [];
    var values = [];

    categories.push(firstData, secondData);
    return categories;
}

// Enums
InventoryResult = {
    UpdatedExisting     : 0,
    AddedNew            : 1,
    Removed             : 2,
    NotPresent          : 3,
};

Race = {
    Dragonborn  : "Dragonborn",
    Dwarf       : "Dwarf",
    Elf         : "Elf",
    Gnome       : "Gnome",
    Halfling    : "Halfling",
    HalfElf     : "Half-Elf",
    HalfOrc     : "Half-Orc",
    Tiefling    : "Tiefling",
};

Class = {
    Barbarian   : "Barbarian",
    Bard        : "Bard",
    Cleric      : "Cleric",
    Druid       : "Druid",
    Fighter     : "Fighter",
    Monk        : "Monk",
    Paladin     : "Paladin",
    Ranger      : "Ranger",
    Rogue       : "Rogue",
    Sorcerer    : "Sorcerer",
    Warlock     : "Warlock",
    Wizard      : "Wizard",
};

// Begin Item Definition
class Item {
    constructor(name, weight, value, quantity) {
        this.name = name;
        this.weight = weight;
        this.value = value;
        this.quantity = quantity;
    }

    toString() {
        return  this.name + ", " +
            this.weight + "lbs, $" +
            this.value + " (" + 
            this.quantity + ")";
    }

    clone() {
        return new Item(this.name, this.weight, this.value, this.quantity);
    }
}

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

class Conversation {
    constructor(sender, receiver) {
        this.sender = sender;
        this.receiver = receiver;
        this.messages = [];
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

class Player {
    constructor(realName, characterName) {
        this.isCharacter = true;
        this.playerName = realName;
        this.characterName = characterName;
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

class Character extends Player {
    constructor(realName, characterName, level, characterClass, characterRace) {
        super(realName, characterName);

        this.characterLevel = level;
        this.characterClass = characterClass;
        this.characterRace = characterRace;
        this.inventory = {};
        this.money = { 
            "Copper"     : 0,
            "Silver"     : 0,
            "Gold"       : 0,
            "Platinum"   : 0,
            "Electrum"   : 0,
        };
    }

    addItem(newItem) {
        if (newItem.name in this.inventory) {
            this.inventory[newItem.name].quantity += newItem.quantity;
            return InventoryResult.UpdatedExisting;
        }

        this.inventory[newItem.name] = newItem.clone();
        return InventoryResult.AddedNew;
    }

    removeItem(targetItem) {
        if (targetItem.name in this.inventory) {
            this.inventory[targetItem.name].quantity -= targetItem.quantity;

            if (this.inventory[targetItem.name].quantity <= 0) {
                delete this.inventory[targetItem.name];
                return InventoryResult.Removed;
            } else {
                return InventoryResult.UpdatedExisting;
            }
        }

        return InventoryResult.NotPresent;
    }

    listInventory() {
        for (var itemKey in this.inventory) {
            console.log(itemKey);
            console.log(this.inventory[itemKey]);
        }
    }
}

class DungeonMaster extends Player {
    constructor(realName) {
        super(realName, "Dungeon Master");

        this.isCharacter = false;
    }
}

var zach = new DungeonMaster("Zach");
var molly = new Character("Molly", "Kalen", 3, Class.Rogue, Race.Elf);
var nick = new Character("Nick", "Delmirev", 3, Class.Paladin, Race.Dragonborn);
var game = new Game(zach, [molly, nick]);

game.establishAddressBooks();

nick.sendMessage(molly, "Hello, World!");