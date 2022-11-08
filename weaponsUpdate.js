const fs = require('fs')
const weapons = require('./updatedWeapons.json')

weapons.forEach(cat => {
    cat.guns.forEach(gun => {
        if (gun.name == 'X13 Auto') {
            // gun.challenges[0]['requirements'] = 'Void and Light - Get 40 kills'
            // gun.challenges[1]['requirements'] = 'Asphalt Digital - '
            // gun.challenges[2]['requirements'] = 'Dark Echo - '
            // gun.challenges[3]['requirements'] = 'Party Time - '
        }
        gun.challenges.forEach(challenge => {
            // if (challenge.name == 'Gold' && challenge.requirements == 'TBA') {
            //     challenge['requirements'] = 'Gold - '
            // }
        });
    });
});

fs.writeFile('updatedWeapons.json', JSON.stringify(weapons), err => {
    console.log('ok');
})