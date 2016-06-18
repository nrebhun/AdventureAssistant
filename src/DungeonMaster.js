var baseClass = require('Player.js');

class DungeonMaster extends baseClass.Player {
    constructor(realName) {
        super(realName, "Dungeon Master");

        this.isCharacter = false;
    }

    distributeExperience(total) {
        var amount = total / this.addressBook.length;
        for (var i = 0; i < this.addressBook.length; i++) {
            this.addressBook[i].addExperience(amount);
        }
    }
}