var roleBuilder = require('role.builder');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleShared = require('role.shared');


var config = {
    roles: {
        'harvester': 1,
        'builder': 2,
        'upgrader': 1
    }
};

function createRoles() {
    for (var configRole in config.roles)
    {
        var roleCreeps = Game.spawns.Spawn1.room.find(FIND_CREEPS, {filter: function(object) {return object.memory.role == configRole}});
        
        var count = roleCreeps.length;

        if (count < config.roles[configRole])
        {
            var result = Game.spawns['Spawn1'].createCreep(getRoleSetup(configRole), roleShared.getName(configRole), { role: configRole });

            if (result != ERR_NOT_ENOUGH_ENERGY && result != ERR_BUSY)
            {
                console.log("Creating creep: " + configRole);
            }
        }
        else if (count > config.roles[configRole])
        {
            for (var creep in roleCreeps)
            {
                console.log("Destroying creep: " + configRole + " (" + roleCreeps[creep].name + ")");
                count--;
                
                roleCreeps[creep].suicide();
                
                if (count == config.role[configRole])
                    break;
            }
        }
    }
}

function getRoleSetup(role) {
    switch (role) {
        case 'harvester':
            return [WORK, WORK, CARRY, MOVE, MOVE];
        case 'builder':
            return [WORK, WORK, CARRY, MOVE, MOVE];
        case 'upgrader':
            return [WORK, CARRY, CARRY, MOVE, MOVE];
    }
}

function cleanMemory() {
    
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            console.log("Clearing memory of " + Memory.creeps[i]);
            delete Memory.creeps[i];
        }
    }
};


module.exports.loop = function() {

    cleanMemory();
    createRoles();
    
    for (var creepName in Game.creeps) {
        var creep = Game.creeps[creepName];
        
        switch (creep.memory.role)
        {
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
        }
    }
}