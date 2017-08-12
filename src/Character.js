'use strict';

// Enums
const InventoryResult = {
    UpdatedExisting     : 0,
    AddedNew            : 1,
    Removed             : 2,
    NotPresent          : 3,
};

const Race = {
    Dragonborn  : "Dragonborn",
    Dwarf       : "Dwarf",
    Elf         : "Elf",
    Gnome       : "Gnome",
    Halfling    : "Halfling",
    HalfElf     : "Half-Elf",
    HalfOrc     : "Half-Orc",
    Tiefling    : "Tiefling",
};

const Class = {
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

// Constants
const generalExpRequirements = [0, 300, 900, 2700,
                                6500, 14000, 23000, 34000,
                                48000, 64000, 85000, 100000,
                                120000, 140000, 165000, 195000,
                                225000, 265000, 305000, 355000,];

class Character extends Player {
    constructor(realName, characterName, level, initialExperience, characterClass, characterRace) {
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
        this.currentExperience = initialExperience;
        this.experienceRequirements = generalExpRequirements;
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

    addExperience(amount) {
        this.currentExperience += amount;
        if (this.currentExperience >= this.experienceRequirements[this.characterLevel]) {
            this.increaseLevel();
        }
        this.displayExperience();
    }

    increaseLevel() {   // This will become more involved later, when stats are tracked
        this.characterLevel++;
        console.log(this.characterName + " has reached level " + this.characterLevel);
    }

    displayExperience() {
        console.log(this.characterName + ": " +
                    this.currentExperience + " / " +
                    this.experienceRequirements[this.characterLevel]);
    }
}