class DungeonMaster extends Player {
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