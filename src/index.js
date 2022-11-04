import weapons from "../weapons.json" assert {type: 'json'};
var maxChallenges = 367
var requiredChallenges = 339
var completedChallenges = 0


var checked = 0

let AR = []
let BR = []
let SMG = []
let LMG = []
let S = []
let MR = []
let SR = []
let RL = []
let M = []
let P = []

function countTrue(weapons) {
    let foundCompleted = 0
    weapons.forEach(cat => {
        cat.guns.forEach(gun =>{
            gun.challenges.forEach(challenge =>{
                if (challenge.completed == true) {
                    foundCompleted++
                }
            })
        })
    });
    return foundCompleted
}
function countPercentage(requiredChallenges, completedChallenges) {
    let percentage = 0
    percentage = Math.round(((completedChallenges / requiredChallenges) * 100) * 100) / 100
    return percentage
}
function countBar(percentage) {
    let percentageBar = 0

    if (percentage < 100) {
        percentageBar = Math.round(percentage * 100) / 100
    }
    else {
        percentageBar = 100
    }
    return percentageBar
}

completedChallenges = countTrue(weapons)
console.log(completedChallenges)
var percentage = countPercentage(requiredChallenges, completedChallenges)
var percentageBar = countBar(percentage)
//const weapons = require('../weapons.json')
var platinumCompleted = 0
var polyatomicCompleted = 0
weapons.forEach(cat => {
    let fullName
    if (true) {
        switch (cat.category) {
            case "AR":
                fullName = "Assault Rifles"
                cat.guns.forEach(element => {
                    AR.push(element.name);
                });
                break;
            case "BR":
                fullName = "Battle Rifles"
                cat.guns.forEach(element => {
                    BR.push(element.name);
                });
                break;
            case "SMG":
                fullName = "Sub machine guns"
                cat.guns.forEach(element => {
                    SMG.push(element.name);
                });
                break;
            case "LMG":
                fullName = "Light machine guns"
                cat.guns.forEach(element => {
                    LMG.push(element.name);
                });
                break;
            case "S":
                fullName = "Shotguns"
                cat.guns.forEach(element => {
                    S.push(element.name);
                });
                break;
            case "MR":
                fullName = "Marksman Rifles"
                cat.guns.forEach(element => {
                    MR.push(element.name);
                });
                break;
             case "SR":
                fullName = "Sniper Rifles"
                cat.guns.forEach(element => {
                    SR.push(element.name);
                });
                break;
            case "RL":
                fullName = "Rocket Launchers"
                cat.guns.forEach(element => {
                    RL.push(element.name);
                });
                break;
            case "M":
                fullName = "Melees"
                cat.guns.forEach(element => {
                   M.push(element.name);
                });
                break;
            case "P":
                fullName = "Pistols"
                cat.guns.forEach(element => {
                    P.push(element.name);
                });
                break;
        }

        
        var gunCat = document.createElement('div')
        gunCat.classList.add(cat.category.toLowerCase() +'-section')

        var sectionName = document.createElement('p')
        sectionName.innerHTML = fullName
        sectionName.classList.add("title")
        //x.innerHTML = cat.category
        
        var goldsCompleted = 0
        cat.guns.forEach(gun => {
            
            var gunCompleted = 0
            var singleGunContainer = document.createElement('div')
            singleGunContainer.classList.add('singleGunContainer')

            var gunBanner = document.createElement('div')
            gunBanner.classList.add(gun.name.replace(" ",'-').toLowerCase())
            gunBanner.innerHTML = gun.name

            var gunChecksContainer = document.createElement('section')
            gunChecksContainer.classList.add('checkContainer')

            singleGunContainer.appendChild(gunBanner)
            singleGunContainer.appendChild(gunChecksContainer)

            gunCat.appendChild(singleGunContainer)

            

            singleGunContainer.firstChild.addEventListener('click', function () {
                var allTrue = 0
                gun.challenges.forEach(challenge => {
                    var checker = document.querySelector('.'+challenge.name.toLowerCase() + '-camo')
                    if (challenge.completed == false) {
                        singleGunContainer.lastChild.childNodes.forEach(element => {
                            element.style.backgroundColor = 'rgb(53, 212, 63)'
                        });
                        
                        console.log(checker)
                        challenge['completed'] = true
                        gunCompleted++
                    }
                    else if (challenge.completed == true) {
                        allTrue ++
                        if (allTrue == gun.challenges.length) {
                            gun.challenges.forEach(challenge => {
                                challenge['completed'] = false
                            })
                            gunCompleted = 0
                            singleGunContainer.lastChild.childNodes.forEach(element => {
                                switch (element.className) {
                                    case "polyatomic-camo":
                                        element.style.backgroundColor = 'purple'
                                        break;
                                    case "gold-camo":

                                        element.style.backgroundColor = 'rgba(255, 217, 0, 0.6)'
                                        break;
                                    case "platinum-camo":

                                        element.style.backgroundColor = 'rgba(192, 192, 192, 0.6)'
                                        break;
                                    case 'common-camo':
                                        element.style.backgroundColor = '#484848'
                                        break;
                                }

                                
                            });
                            singleGunContainer.firstChild.style.backgroundColor = '#484848'
                        }
                    }



                    if (gunCompleted == gun.challenges.length) {

                        singleGunContainer.firstChild.style.backgroundColor = 'rgb(53, 212, 63)'
                    }
                    else {
                        
                        singleGunContainer.firstChild.style.backgroundColor = '#484848'
                    }

                    completedChallenges = countTrue(weapons)
                    percentage = countPercentage(requiredChallenges, completedChallenges)
                    percentageBar = countBar(percentage)

                    document.getElementById('percentage').innerHTML = percentage + '%'
                    document.getElementById('progressBarInner').style.width = (percentageBar+'%').toString()
                });
            })


            
            gun.challenges.forEach(challenge => {
                
                var checker = document.createElement('div')
                checker.classList.add(challenge.name.toLowerCase() + '-camo')                
    
                checker.addEventListener('click', function() {
                    var commonCompleted = 0
                    switch (challenge.completed) {
                        case true:
                            challenge['completed'] = false
                            checker.style.backgroundColor = '#484848'
                            switch (checker.className) {
                                case "polyatomic-camo":
                                    checker.style.backgroundColor = 'purple'
                                    break;
                                case "gold-camo":
                                    checker.style.backgroundColor = 'rgba(255, 217, 0, 0.6)'
                                    break;
                                case "platinum-camo":
                                    checker.style.backgroundColor = 'rgba(192, 192, 192, 0.6)'
                                    break;
                                case 'common-camo':
                                    checker.style.backgroundColor = '#484848'
                                    break;
                            }
                            gunCompleted--
                            break;
                    
                        case false:
                            challenge['completed'] = true
                            checker.style.backgroundColor = 'rgb(53, 212, 63)'
                            gunCompleted++
                            break;
                    }

                    
                    gun.challenges.forEach(challenge => {
                        if (challenge.name == 'Common' && challenge.completed == true) {
                            commonCompleted++
                        }
                    });

                    console.log(commonCompleted);
                    //gold camo
                    if (challenge.name == 'Gold' && challenge.completed == true) {
                        goldsCompleted++
                    } else if (challenge.name == 'Gold' && challenge.completed == false) {
                        goldsCompleted--
                        gunCompleted--
                    }
                    
                    var goldCamo = document.querySelector('.'+gun.name.replace(" ",'-').toLowerCase() + ' + section :nth-last-child(3)')
                    if (commonCompleted >= gun.challenges.length - 3) {
                        

                        goldCamo.style.backgroundColor = 'gold'
                        goldCamo.style.pointerEvents = 'all'
                    }
                    else {
                        goldCamo.style.backgroundColor = 'rgba(255, 217, 0, 0.6)'
                        goldCamo.style.pointerEvents = 'none'
                        
                    }
                    
                    if (commonCompleted != 4) {
                        gun.challenges.forEach(challenge => {
                            if (challenge.name == 'Gold' && challenge.completed == true) {
                                challenge['completed'] = false
                                goldsCompleted--
                                gunCompleted--
                            }
                        });
                    }

                    console.log(goldsCompleted);
                    //platinum camo
                    if (challenge.name == 'Platinum' && challenge.completed == true) {
                        platinumCompleted++
                    } else if (challenge.name == 'Platinum' && challenge.completed == false) {
                        platinumCompleted--
                        gunCompleted--
                    }

                    if (goldsCompleted >= cat.platReq) {
                        document.querySelectorAll('.'+cat.category.toLowerCase()+'-section .platinum-camo').forEach(element => {


                            element.style.backgroundColor = 'silver'
                            element.style.pointerEvents = 'all'
                        });
                    }
                    else {
                        document.querySelectorAll('.'+cat.category.toLowerCase()+'-section .platinum-camo').forEach(element => {
                            element.style.backgroundColor = 'rgba(192, 192, 192, 0.6)'
                            element.style.pointerEvents = 'none'
                        })
                    }
                    console.log(platinumCompleted);

                    // gun.challenges.forEach(challenge => {
                    //     if (challenge.name == 'Platinum' && challenge.completed == true) {
                    //         cat.guns.forEach(platGun => {
                    //             platGun.challenges.forEach(platGunChallenge => {
                    //                 if(platGunChallenge.name == 'Gold' && platGunChallenge.completed == false){
                    //                     challenge['completed'] = false
                    //                     platinumCompleted--
                    //                 }
                    //             });
                    //         });
                    //     }
                    // });

                    if (goldsCompleted != cat.platReq) {
                        cat.guns.forEach(gun => {
                            gun.challenges.forEach(challenge => {
                                if (challenge.name == 'Platinum' && challenge.completed == true) {
                                    challenge['completed'] = false
                                    platinumCompleted--
                                    gunCompleted--
                                }
                            });
                        })
                        
                    }




                    //polyatomic camo
                    // if (challenge.name == 'Polyatomic' && challenge.completed == true) {
                    //     polyatomicCompleted++
                    // }
                    // var platinumCamo = document.querySelector('.'+gun.name.replace(" ",'-').toLowerCase() + ' + section :nth-last-child(1)')
                    // if (gunCompleted >= gun.challenges.length - 1) {
                        
                    //         platinumCamo.style.backgroundColor = 'red'
                    // }
                    // else {
                    //     platinumCamo.style.backgroundColor = 'purple'
                    // }
                    
                    

                    if (gunCompleted == gun.challenges.length) {
                        checker.parentElement.previousSibling.style.backgroundColor = 'rgb(53, 212, 63)'
                    }
                    else {
                        checker.parentElement.previousSibling.style.backgroundColor = '#484848'
                    }
                    completedChallenges = countTrue(weapons)
                    percentage = countPercentage(requiredChallenges, completedChallenges)
                    percentageBar = countBar(percentage)

                    document.getElementById('percentage').innerHTML = percentage + '%'
                    document.getElementById('progressBarInner').style.width = (percentageBar+'%').toString()

                })

                gunChecksContainer.append(checker)

                
            });
        });
        


        document.getElementById('gunsContainer').appendChild(sectionName)
        document.getElementById('gunsContainer').appendChild(gunCat)
        
    }   
});

document.getElementById('percentage').innerHTML = percentage + '%'
document.getElementById('progressBarInner').style.width = (percentageBar+'%').toString()
//console.log(AR, BR, SMG, LMG, S, MR, SR, RL, M, P)

// console.log(weapons[0].guns[0].challenges)
// console.log(count);
// var json = JSON.stringify(weapons);
// var fs = require('fs');
// fs.writeFile('../weapons.json', json, 'utf8', function err() {
//     console.log("ok")
// });