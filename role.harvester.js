var roleShared = require('role.shared');

var roleHarvester = {
    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);

        if (creep.carry.energy < creep.carryCapacity)
        {
            if (creep.memory.target != undefined && Game.getObjectById(creep.memory.target) != undefined)
            {
                var specificMine = Game.getObjectById(creep.memory.target);
                if (creep.harvest(specificMine) == ERR_NOT_IN_RANGE)
                    creep.moveTo(specificMine);
            }
            else
            {
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
                    creep.moveTo(sources[0]);
            }
        }
        else {
            roleShared.goTransfer(creep);
            
            /*if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(Game.spawns['Spawn1']);*/
        }
    }
};

module.exports = roleHarvester;