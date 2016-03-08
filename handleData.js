
function processCharacterData(dataSetSize) {
        var categories = [];
        var values = [];

    categories.push(firstData, secondData);

        return categories;
}

// Begin Message Definition
var Message = function() {
        this.timeStamp = 0;
        this.sender = "Default";
}

// Begin Game Definition
var Game = function() {
        this.dungeonMaster = "Default";
        this.characters = [];
}

Game.prototype.initialize = function(dungeonMaster, characters) {
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
var game = new Game();
var zach = new DungeonMaster("Zach");
var molly = new Character("Molly", "Kalen", 3, "Rogue", "Human?");
var nick = new Character("Nick", "Delmirev", 3, "Paladin", "Dragonborn");
var nate = new Observer("Nate");

zach.greet();
molly.greet();
nick.greet();
nate.greet();

game.initialize(zach, [molly, nick]);
game.listPlayers();
