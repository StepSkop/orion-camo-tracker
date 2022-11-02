var maxChallenges = 298
var requiredChallenges = 270
var completedChallenges = chacked

var canBeChecked = maxChallenges
var chacked = 298

var percentageBar
var percentage = Math.round(((chacked / requiredChallenges) * 100) * 100) / 100

if (percentage < 100) {
    percentageBar = Math.round(percentage * 100) / 100
}
else {
    percentageBar = 100
}
console.log(percentage)
console.log(percentageBar);

var width = 0
var maxWidth = 300
width = (maxWidth / 100) * percentageBar

console.log(width);

const weapons = require('../weapons.json')
let count = 0
weapons.forEach(element => {
    if (true) {
        element.guns.forEach(element => {
            element.challenges.forEach(element => {
                element["completed"]=false
                count++
            });
        });
    }   
});


console.log(weapons[0].guns[0].challenges)
console.log(count);
var json = JSON.stringify(weapons);
var fs = require('fs');
fs.writeFile('../weapons.json', json, 'utf8', function err() {
    console.log("ok")
});