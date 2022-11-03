var maxChallenges = 298
var requiredChallenges = 270
var completedChallenges = 0

var canBeChecked = maxChallenges
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

//const weapons = require('../weapons.json')
import weapons from "../weapons.json" assert {type: 'json'};
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

        
        var x = document.createElement('div')
        var sectionName = document.createElement('p')
        sectionName.innerHTML = fullName
        x.classList.add(cat.category)
        sectionName.classList.add("title")
        //x.innerHTML = cat.category
        
        
        cat.guns.forEach(gun => {
            var y = document.createElement('div')
            y.classList.add(gun.name.replace(" ",'-').toLowerCase())
            y.innerHTML = gun.name
            x.appendChild(y)

            gun.challenges.forEach(challenge => {
                if (challenge.completed == true) {
                    completedChallenges++
                }
                maxChallenges++
            });
        });


        document.getElementById('gunsContainer').appendChild(sectionName)
        document.getElementById('gunsContainer').appendChild(x)
        
    }   
});
//console.log(AR, BR, SMG, LMG, S, MR, SR, RL, M, P)


var percentageBar
var percentage = Math.round(((completedChallenges / requiredChallenges) * 100) * 100) / 100

if (percentage < 100) {
    percentageBar = Math.round(percentage * 100) / 100
}
else {
    percentageBar = 100
}


var width = 0
var maxWidth = 300
width = Math.round(((maxWidth / 100) * percentageBar) * 100) / 100
console.log(percentage)
console.log(percentageBar);
console.log(width);
// console.log(weapons[0].guns[0].challenges)
// console.log(count);
// var json = JSON.stringify(weapons);
// var fs = require('fs');
// fs.writeFile('../weapons.json', json, 'utf8', function err() {
//     console.log("ok")
// });