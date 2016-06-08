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