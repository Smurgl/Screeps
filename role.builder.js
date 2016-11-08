var roleShared = require('role.shared');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            
            if(targets.length) {
            
                var targetIndex = 0;
                
                for (var i = 0; i < targets.length; i++)
                {
                    if (targets[i].structureType == STRUCTURE_ROAD)
                    {
                        targetIndex = i;
                        break;   
                    }
                }
                
                if (targetIndex == 0)
                {
                    for (var i = 0; i < targets.length; i++)
                    {
                        if (targets[i].id == '582208c80d2d3e5e2bd5b22b')
                        {
                            targetIndex = i;
                            break;   
                        }
                    }
                }
                
                roleShared.goBuild(creep, targets[targetIndex]);
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            roleShared.goHarvest(creep, sources[0]);
        }
	    
	}
};

module.exports = roleBuilder;