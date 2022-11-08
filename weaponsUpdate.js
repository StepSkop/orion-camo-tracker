const fs = require('fs')
const weapons = require('./updatedWeapons.json')

weapons.forEach(cat => {
    cat.guns.forEach(gun => {
        // if (gun.name == 'X13 Auto') {
        //     gun.challenges[0]['reqirements'] = 'Void and Light - Get 40 kills'
        //     gun.challenges[1]['reqirements'] = 'Asphalt Digital - '
        //     gun.challenges[2]['reqirements'] = 'Dark Echo - '
        //     gun.challenges[3]['reqirements'] = 'Party Time - '
        // }
        gun.challenges.forEach(challenge => {
            if (challenge.name == 'Gold' && challenge.reqirements == 'TBA') {
                challenge['reqirements'] = 'Gold - '
            }
        });
    });
});

fs.writeFile('updatedWeapons.json', JSON.stringify(weapons), err => {
    console.log('ok');
})