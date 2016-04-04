
function processCharacterData(dataSetSize) {
    var categories = [];
    var values = [];

    categories.push(firstData, secondData);
    return categories;
}

// Begin Item Definition
var Item = function(name, weight, value, quantity) {
    this.name = name;
    this.weight = weight;
    this.value = value;
    this.quantity = quantity;
}

// Begin Message Definition
var Message = function() {
    this.timeStamp = 0;
    this.sender = "Default";
}

// Begin Game Definition
var Game = function(dungeonMaster, characters) {
    this.dungeonMaster = dungeonMaster;
    this.characters = characters;
}

Game.prototype.listPlayers = function() {
    console.log("Your Dungeon Master is:\n" + this.dungeonMaster.playerName);
    console.log("Adventurers:");
    for (var player in this.characters) {
        console.log(this.characters[player].playerName + " (" + 
                    this.characters[player].characterName + ")");
    }
}

// Begin Player Definition
var Player = function() {
    this.isCharacter = true;
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

// Begin Character Definition
var Character = function(realName, gameName, level, gameClass, race) {
    Player.call(this); 
    this.playerName = realName;
    this.characterName = gameName;
    this.characterLevel = level;
    this.characterClass = gameClass;
    this.characterRace = race;
    this.inventory = [];
    this.money = { "Copper Pieces"      : 0,
                   "Silver Pieces"      : 0,
                   "Gold Pieces"        : 0,
                   "Platinum Pieces"    : 0,
                   "Electrum Pieces"    : 0};
};

Character.prototype = Object.create(Player.prototype);
Character.prototype.constructor = Character;

Character.prototype.addItem = function(newItem) {
    for (var item in this.inventory) {
        if (this.inventory[item].name === newItem.name) {
            this.inventory[item].quantity += newItem.quantity;
            return "Added new quantity to existing quantity.";
        }
    }

    this.inventory.push(newItem);
    return "Added new item to inventory";
}

Character.prototype.removeItem = function(targetItem) {
    for (var item in this.inventory) {
        if (this.inventory[item].name === targetItem.name) {
            this.inventory[item].quantity -= targetItem.quantity;
            if (this.inventory[item].quantity === 0) {
                this.inventory.splice(item, 1);
            }
            return "Removed quantity from existing quantity.";
        }
    }

    return "Item not found in inventory";
}

Character.prototype.listInventory = function() {
    for (var item in this.inventory) {
        console.log(this.inventory[item].name + ", " + 
                    this.inventory[item].weight + "lbs, $" + 
                    this.inventory[item].value + " (" + 
                    this.inventory[item].quantity + ")");
    }
}

// Begin Dungeon Master Definition
var DungeonMaster = function(realName) {
    Player.call(this);
    this.playerName = realName;
    this.isCharacter = false;
};

DungeonMaster.prototype = Object.create(Player.prototype);
DungeonMaster.prototype.constructor = DungeonMaster;

DungeonMaster.prototype.distributeExperience(amount) {
    for ()
}
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
var molly = new Character("Molly", "Kalen", 3, "Rogue", "Elf");
var nick = new Character("Nick", "Delmirev", 3, "Paladin", "Dragonborn");
var nate = new Observer("Nate");
var game = new Game(zach, [molly, nick]);

zach.greet();
molly.greet();
nick.greet();
nate.greet();