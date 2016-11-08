var roleShared = {
    setStatus: function(creep, creepStatus) {
        if (creep.memory.creepStatus != creepStatus) {
            creep.say(creepStatus);
            creep.memory.creepStatus = creepStatus;
        }
    },
    getName: function(role) {
       var searchForName = true;
       var counter = 0;
       
       while (searchForName) {
           var number = Math.floor(Math.random() * 1000) + 1;
           var creepName = role + number;
           if (Game.creeps[creepName] == undefined) {
                return creepName;       
           }
           counter++;
           
           if (counter > 10)
                return null;
       }
    },
	goBuild: function(creep, target) {
	    if(creep.build(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        };
	},
	goHarvest: function(creep, target) {
	    if (creep.harvest(target) == ERR_NOT_IN_RANGE)
            creep.moveTo(target);
	},
	goTransfer: function(creep) {
        var spawn = creep.room.find(FIND_MY_SPAWNS)[0];
        
        if (spawn != undefined) {
            var target = "";
    
            if (spawn.energy < spawn.energyCapacity) {
                target = spawn;
            }
            else {
                var extentions = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: { structureType: STRUCTURE_EXTENSION }
                });

                for (var ext in extentions) {
                    if (extentions[ext].energy < extentions[ext].energyCapacity)
                    {
                        target = extentions[ext];
                        break;
                    }
                }
            }

            if (target != undefined) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    roleShared.setStatus(creep, 'Moving to ' + target.structureType);
                    creep.moveTo(target);
                }
            }
        }
        else {
            console.log("Warning! Undefined spawn in goTransfer");
        }
	}
}
 
module.exports = roleShared;