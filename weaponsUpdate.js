const fs = require('fs')
const weapons = require('./updatedWeapons.json')

weapons.forEach(cat => {
    cat.guns.forEach(gun => {
        // if (gun.name == 'X13 Auto') {
        //     gun.challenges[0]['requirements'] += 'Get 50 kills'
        //     gun.challenges[1]['requirements'] += 'Get 10 hip fire kills'
        //     gun.challenges[2]['requirements'] += 'Get 10 double kills'
        //     gun.challenges[3]['requirements'] += 'Get 40 kills with Akimbo attachment'
        // }
        gun.challenges.forEach(challenge => {
            if (challenge.name == 'Polyatomic' && cat.category == 'P') {
                challenge['requirements'] += 'Get 20 headshot kills'
            }
        });
    });
});

fs.writeFile('updatedWeapons.json', JSON.stringify(weapons), err => {
    console.log('ok');
})