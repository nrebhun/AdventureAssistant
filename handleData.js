
function processCharacterData(dataSetSize) {
	var categories = [];
	var values = [];

    categories.push(firstData, secondData);
	
	return categories;
}

// Danger zone

var Player = function() {
	this.isCharacter = true;
};

Player.prototype.greet = function() {
	if (this.isCharacter) {
		console.log("Welcome, " + this.characterName + ", the Level " + this.characterLevel + " " + this.characterClass + " " + this.characterRace);
	} else {
		console.log("Welcome, Dungeon Master " + this.playerName);
	}
};

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

var DungeonMaster = function(realName) {
	this.playerName = realName;
	this.isCharacter = false;
};

DungeonMaster.prototype = Object.create(Player.prototype);
DungeonMaster.prototype.constructor = DungeonMaster;

var Observer = function(realName) {
	this.playerName = realName;
};

Observer.prototype = Object.create(Player.prototype);
Observer.prototype.constructor = Observer;

Observer.prototype.greet = function() {
	console.log("I, " + this.playerName + " am neither a Character nor a Dungeon Master, and therefore my greeting does not derive from Player.");
};

var zach = new DungeonMaster("Zach");
var molly = new Character("Molly", "Kalen", 3, "Rogue", "Human?");
var nick = new Character("Nick", "Delmirev", 3, "Paladin", "Dragonborn");
var nate = new Observer("Nate");

zach.greet();
molly.greet();
nick.greet();
nate.greet();