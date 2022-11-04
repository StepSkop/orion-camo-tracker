import weapons from "../weapons.json" assert {type: 'json'};
var maxChallenges = 367
var requiredChallenges = 339
var completedChallenges = 0

var weaponsList

weaponsList = JSON.parse(localStorage.getItem("userWeapons"))
if (localStorage.length == 0) {
    weaponsList = weapons
}

document.querySelector('#lsRemover').addEventListener('click', function() {
    localStorage.setItem("userWeapons",JSON.stringify(weapons))
    location.reload()
})

function loadCheckRaw(weaponsList) {
    weaponsList.forEach(cat => {
        cat.guns.forEach(gun => {
            for (let index = 0; index < gun.challenges.length; index++) {
                var challenge = gun.challenges[index];
                if (challenge.completed == true) {
                    document.querySelector('.W'+gun.name.replace(" ",'-').replace(".","-").toLowerCase() + ' + section :nth-child('+(index +1)+')').style.backgroundColor = 'rgb(53, 212, 63)'
                }
            }
        });
    });
} 

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

completedChallenges = countTrue(weaponsList)
var percentage = countPercentage(requiredChallenges, completedChallenges)
var percentageBar = countBar(percentage)

var platinumCompleted = {
    "platAR": 0,
    "platBR":0,
    "platSMG":0,
    "platLMG":0,
    "platMR":0,
    "platSR":0,
    "platP":0,
    "platS":0,
    "platM":0,
    "platRL":0,
}
var platinumCompletedCount
var polyatomicCompleted = 0
weaponsList.forEach(cat => {
    let fullName
    if (true) {
        switch (cat.category) {
            case "AR":
                fullName = "Assault Rifles"
                break;
            case "BR":
                fullName = "Battle Rifles"
                break;
            case "SMG":
                fullName = "Sub machine guns"
                break;
            case "LMG":
                fullName = "Light machine guns"
                break;
            case "S":
                fullName = "Shotguns"
                break;
            case "MR":
                fullName = "Marksman Rifles"
                break;
             case "SR":
                fullName = "Sniper Rifles"
                break;
            case "RL":
                fullName = "Rocket Launchers"
                break;
            case "M":
                fullName = "Melees"
                break;
            case "P":
                fullName = "Pistols"
                break;
        }

        var gunCat = document.createElement('div')
        gunCat.classList.add(cat.category.toLowerCase() +'-section')

        var sectionName = document.createElement('p')
        sectionName.innerHTML = fullName
        sectionName.classList.add("title")
        
        var goldsCompleted = 0
        cat.guns.forEach(gun => {
            
            var gunCompleted = 0
            var singleGunContainer = document.createElement('div')
            singleGunContainer.classList.add('singleGunContainer')

            var gunBanner = document.createElement('div')
            gunBanner.classList.add('W'+gun.name.replace(" ",'-').replace(".","-").toLowerCase())
            gunBanner.innerHTML = gun.name

            var gunChecksContainer = document.createElement('section')
            gunChecksContainer.classList.add('checkContainer')

            singleGunContainer.appendChild(gunBanner)
            singleGunContainer.appendChild(gunChecksContainer)

            gunCat.appendChild(singleGunContainer)
            
            gun.challenges.forEach(challenge => {
                var checker = document.createElement('div')
                checker.classList.add(challenge.name.toLowerCase() + '-camo')   
                
                checker.style.backgroundColor = '#484848'
                switch (checker.className) {
                    case "polyatomic-camo":
                        checker.style.backgroundColor = 'rgba(131, 2, 131, 0.6)'
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
                            break;
                    
                        case false:
                            challenge['completed'] = true
                            checker.style.backgroundColor = 'rgb(53, 212, 63)'
                            break;
                    }

                    
                    gun.challenges.forEach(challenge => {
                        if (challenge.name == 'Common' && challenge.completed == true) {
                            commonCompleted++
                        }
                    });

                    //gold camo
                    var goldCamo = document.querySelector('.W'+gun.name.replace(" ",'-').replace(".","-").toLowerCase() + ' + section :nth-last-child(3)')
                    if (challenge.name == 'Gold' && challenge.completed == true) {
                        goldsCompleted++
                    } else if (challenge.name == 'Gold' && challenge.completed == false) {
                        goldsCompleted--
                    }
                    if (commonCompleted >= gun.challenges.length - 3) {
                        
                        if (goldCamo.style.backgroundColor == 'rgba(255, 217, 0, 0.6)') {
                            
                            goldCamo.style.backgroundColor = 'gold'
                        }
                        goldCamo.style.pointerEvents = 'all'
                    }
                    else {
                        goldCamo.style.backgroundColor = 'rgba(255, 217, 0, 0.6)'
                        goldCamo.style.pointerEvents = 'none'
                        
                    }
                    
                    if (commonCompleted != gun.challenges.length - 3) {
                        gun.challenges.forEach(challenge => {
                            if (challenge.name == 'Gold' && challenge.completed == true) {
                                challenge['completed'] = false
                                goldsCompleted--
                            }
                        });
                    }

                    //platinum camo
                    if (challenge.name == 'Platinum' && challenge.completed == true) {
                        platinumCompleted['plat'+cat.category]++

                    } else if (challenge.name == 'Platinum' && challenge.completed == false) {
                        if (platinumCompleted['plat'+cat.category] != 0) {
                            platinumCompleted['plat'+cat.category]--
                        }
                    }

                    if (goldsCompleted >= cat.platReq) {
                        
                         

                        document.querySelectorAll('.'+cat.category.toLowerCase()+'-section .platinum-camo').forEach(element => {

                            element.style.pointerEvents = 'all'
                            if (element.style.backgroundColor == 'rgba(192, 192, 192, 0.6)') {
                                element.style.backgroundColor = 'silver'
                            }
                            
                            cat.guns.forEach(gun =>{
                                gun.challenges.forEach(challenge => {
                                    if (challenge.name == 'Gold' && challenge.completed == false)   {
                                        var fakePlat = document.querySelector('.W'+gun.name.replace(" ",'-').replace(".","-").toLowerCase() + ' + section :nth-last-child(2)')
                                        fakePlat.style.backgroundColor = 'rgba(192, 192, 192, 0.6)'
                                        fakePlat.style.pointerEvents = 'none'
                                    }
                                });
                            })



                        });
                    }
                    else {
                        document.querySelectorAll('.'+cat.category.toLowerCase()+'-section .platinum-camo').forEach(element => {
                            element.style.backgroundColor = 'rgba(192, 192, 192, 0.6)'
                            element.style.pointerEvents = 'none'
                        })
                    }


                    
                    if (goldsCompleted < cat.platReq) {
                        cat.guns.forEach(gun => {
                            gun.challenges.forEach(challenge => {
                                if (challenge.name == 'Platinum' && challenge.completed == true) {
                                    challenge['completed'] = false
                                }
                            });
                        })
                        
                    }

                    var platValues = Object.values(platinumCompleted);
                    const platAllCount = platValues.reduce((accumulator, value) => {
                    return accumulator + value;
                    }, 0);

                    if (platinumCompleted['plat'+cat.category] >= cat.platReq && platAllCount > 51) {
                        weaponsList.forEach(cat=> {
                            document.querySelectorAll('.'+cat.category.toLowerCase()+'-section .polyatomic-camo').forEach(element => {
                                if (element.style.backgroundColor == 'rgba(131, 2, 131, 0.6)') {
                                    element.style.backgroundColor = 'purple'
                                }
                                element.style.pointerEvents = 'all'
                            })

                            cat.guns.forEach(gun =>{
                                gun.challenges.forEach(challenge => {
                                    if (challenge.name == 'Platinum' && challenge.completed == false)   {
                                        var fakePlat = document.querySelector('.W'+gun.name.replace(" ",'-').replace(".","-").toLowerCase() + ' + section :nth-last-child(1)')
                                        fakePlat.style.backgroundColor = 'rgba(131, 2, 131, 0.6)'
                                        fakePlat.style.pointerEvents = 'none'
                                    }
                                });
                            })
                        });
                        
                        
                    }

                    completedChallenges = countTrue(weaponsList)
                    percentage = countPercentage(requiredChallenges, completedChallenges)
                    percentageBar = countBar(percentage)

                    document.getElementById('percentage').innerHTML = percentage + '%'
                    document.getElementById('progressBarInner').style.width = (percentageBar+'%').toString()
                    localStorage.setItem("userWeapons", JSON.stringify(weaponsList))
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
loadCheckRaw(weaponsList)
localStorage.setItem("userWeapons", JSON.stringify(weaponsList))
