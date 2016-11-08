var roleShared = require('role.shared');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            roleShared.setStatus(creep, 'Upgrader now Harvesting');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            roleShared.setStatus(creep, 'Upgrader now Upgrading!');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
                roleShared.setStatus(creep, "Moving to Controller");
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
                roleShared.setStatus(creep, "Moving to Energy Source");
            }
        }
    }
};

module.exports = roleUpgrader;