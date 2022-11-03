import weapons from "../weapons.json" assert {type: 'json'};
var maxChallenges = 311
var requiredChallenges = 367
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
                
                gun.challenges.forEach(challenge => {
                    var checker = document.querySelector('.'+challenge.name + '-camo')
                    if (challenge.completed == false) {
                        console.log("hi");
                        singleGunContainer.lastChild.childNodes.forEach(element => {
                            element.style.backgroundColor = 'rgb(53, 212, 63)'
                        });
                        
                        console.log(checker)
                        challenge['completed'] = true
                        gunCompleted++
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
                    console.log(completedChallenges)

                    document.getElementById('percentage').innerHTML = percentage + '%'
                    document.getElementById('progressBarInner').style.width = (percentageBar+'%').toString()
                });
            })

            gun.challenges.forEach(challenge => {
                var checker = document.createElement('div')
                checker.classList.add(challenge.name + '-camo')                
    
                checker.addEventListener('click', function() {
                    switch (challenge.completed) {
                        case true:
                            challenge['completed'] = false
                            checker.style.backgroundColor = '#484848'
                            gunCompleted--
                            break;
                    
                        case false:
                            challenge['completed'] = true
                            checker.style.backgroundColor = 'rgb(53, 212, 63)'
                            gunCompleted++
                            break;
                    }
                    if (gunCompleted == gun.challenges.length) {
                        checker.parentElement.previousSibling.style.backgroundColor = 'rgb(53, 212, 63)'
                    }
                    else {
                        checker.parentElement.previousSibling.style.backgroundColor = '#484848'
                    }
                    

                    
                    completedChallenges = countTrue(weapons)
                    percentage = countPercentage(requiredChallenges, completedChallenges)
                    percentageBar = countBar(percentage)
                    console.log(completedChallenges)
                    console.log(percentage);
                    console.log(percentageBar)

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
console.log(checked);
//console.log(AR, BR, SMG, LMG, S, MR, SR, RL, M, P)

// console.log(weapons[0].guns[0].challenges)
// console.log(count);
// var json = JSON.stringify(weapons);
// var fs = require('fs');
// fs.writeFile('../weapons.json', json, 'utf8', function err() {
//     console.log("ok")
// });