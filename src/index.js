import weapons from "../updatedWeapons.json" assert {type: 'json'};
var maxChallenges = 367
var requiredChallenges = 339
var completedChallenges = 0



var weaponsAlt = JSON.stringify(weapons)
var weaponsList
var userList

var platinumCompleted = {
    "platAR":0,
    "platBR":0,
    "platSMG":0,
    "platS":0,
    "platLMG":0,
    "platMR":0,
    "platSR":0,
    "platP":0,
    "platRL":0,
    "platM":0
}

if (localStorage.length == 0) {
    console.log("hi");
    userList = weapons
} else {
    userList = JSON.parse(localStorage.getItem("userWeapons"))
}

document.querySelector('#lsRemover').addEventListener('click', function() {
    localStorage.setItem("userWeapons",JSON.stringify(weapons))
    location.reload()
})
weaponsList = loadCheckRaw(userList, weaponsAlt, 0, platinumCompleted)



function loadCheckRaw(a, b, c, d) {
    var x = JSON.parse(b)
    for (let C = 0; C< a.length; C++) {
        const cat = a[C];
        let gCompleted = 0
        for (let G = 0; G < cat.guns.length; G++) {
            const gun = cat.guns[G];
            
            let cCompleted = 0
            for (let CH = 0; CH < gun.challenges.length; CH++) {
                const challenge = gun.challenges[CH];
                if (challenge.completed == true) {
                    x[C].guns[G].challenges[CH]['completed'] = true
                    
                    
                    if (c == 1) {
                        switch (challenge.name) {
                            case 'Common':
                                cCompleted++
                                if (cCompleted == (gun.challenges.length - 3)) {
                                    document.querySelector('.W'+gun.name.replace(" ",'-').replace(".","-").toLowerCase() + ' + section :nth-last-child(3)').style.backgroundColor = 'gold'
                                    document.querySelector('.W'+gun.name.replace(" ",'-').replace(".","-").toLowerCase() + ' + section :nth-last-child(3)').style.pointerEvents = 'all'
                                }
                                break;
                            case 'Gold':
                                gCompleted++
                                if (gCompleted >= cat.platReq) {
                                    cat.guns.forEach(gun => {
                                        gun.challenges.forEach(challenge => {
                                            if (challenge.name == 'Gold' && challenge.completed == true) {
                                                document.querySelector('.W'+gun.name.replace(" ",'-').replace(".","-").toLowerCase() + ' + section :nth-last-child(2)').style.pointerEvents = 'all'
                                                if (document.querySelector('.W'+gun.name.replace(" ",'-').replace(".","-").toLowerCase() + ' + section :nth-last-child(2)').style.backgroundColor == 'rgba(192, 192, 192, 0.6)') {
                                                    document.querySelector('.W'+gun.name.replace(" ",'-').replace(".","-").toLowerCase() + ' + section :nth-last-child(2)').style.backgroundColor = 'silver'
                                                }
                                            }
                                        });
                                    });
                                }
                                break;
                            case 'Platinum':

                                if ((d['platAR'] >= 8) &&
                                (d['platBR'] >= 4) &&
                                (d['platSMG'] >= 8) &&
                                (d['platS'] >= 4) &&
                                (d['platLMG'] >= 6) &&
                                (d['platMR'] >= 6) &&
                                (d['platSR'] >= 4) &&
                                (d['platP'] >= 5) &&
                                (d['platRL'] >= 4) &&
                                (d['platM'] >= 2) ) {
                                    
                                    x.forEach(cat => {
                                        cat.guns.forEach(gun => {
                                            gun.challenges.forEach(challenge => {
                                                if (challenge.name == 'Platinum' && challenge.completed == true) {
                                                    document.querySelector('.W'+gun.name.replace(" ",'-').replace(".","-").toLowerCase() + ' + section :nth-last-child(1)').style.pointerEvents = 'all'
                                                    if (document.querySelector('.W'+gun.name.replace(" ",'-').replace(".","-").toLowerCase() + ' + section :nth-last-child(1)').style.backgroundColor == 'rgba(131, 2, 131, 0.6)') {
                                                        document.querySelector('.W'+gun.name.replace(" ",'-').replace(".","-").toLowerCase() + ' + section :nth-last-child(1)').style.backgroundColor = 'purple'
                                                    }
                                                }
                                            });
                                        });
                                    });
                                }

                                break
                        }
                        document.querySelector('.W'+gun.name.replace(" ",'-').replace(".","-").toLowerCase() + ' + section :nth-child('+(CH + 1 )+')').style.backgroundColor = 'rgb(53, 212, 63)'
                    }
                }                
            }
            
        }
    }
    return x
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
                fullName = "Submachine guns"
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
                fullName = "Handguns"
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
                
                var reqCont = document.createElement('div')
                reqCont.classList.add('reqCont')
                

                var requirements = document.createElement('div')
                requirements.classList.add(gun.name.replace(" ",'-').replace(".","-").toLowerCase() + '-' + challenge.name.toLowerCase())
                requirements.innerHTML = challenge.requirements

                reqCont.appendChild(requirements)
                checker.appendChild(reqCont)

                if (gun.name == 'Riot Shield') {
                    //console.log(challenge);
                }
                checker.style.backgroundColor = '#484848'
                switch (checker.className) {
                    case "polyatomic-camo":
                        checker.style.backgroundColor = 'rgba(131, 2, 131, 0.6)' //dark purple
                        break;
                    case "gold-camo":
                        checker.style.backgroundColor = 'rgba(255, 217, 0, 0.6)' //dark gold
                        break;
                    case "platinum-camo":
                        checker.style.backgroundColor = 'rgba(192, 192, 192, 0.6)' //dark plat
                        break;
                    case 'common-camo':
                        checker.style.backgroundColor = '#484848'
                        break;
                }

                if (challenge.name == 'Gold' && challenge.completed == true) {
                    goldsCompleted++
                }
                if (challenge.name == 'Platinum' && challenge.completed == true) {
                    platinumCompleted['plat'+cat.category]++
                }
                
                checker.addEventListener('click', function() {
                    
                    var commonCompleted = 0
                    switch (challenge.completed) {
                        case true:
                            challenge['completed'] = false
                            checker.style.backgroundColor = '#484848'
                            switch (checker.className) {
                                case "polyatomic-camo":
                                    checker.style.backgroundColor = 'rgba(131, 2, 131, 0.6)' //dark purple
                                    break;
                                case "gold-camo":
                                    checker.style.backgroundColor = 'rgba(255, 217, 0, 0.6)' //dark gold
                                    break;
                                case "platinum-camo":
                                    checker.style.backgroundColor = 'rgba(192, 192, 192, 0.6)' //dark plat
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
                        //goldCamo.style.pointerEvents = 'none'
                        
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
                                        //fakePlat.style.pointerEvents = 'none'
                                    }
                                });
                            })



                        });
                    }
                    else {
                        document.querySelectorAll('.'+cat.category.toLowerCase()+'-section .platinum-camo').forEach(element => {
                            element.style.backgroundColor = 'rgba(192, 192, 192, 0.6)'
                            
                            //element.style.pointerEvents = 'none'
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

                    var d = platinumCompleted
                    console.log(d['platM']);
                    if ((d['platAR'] >= 8) &&
                        (d['platBR'] >= 4) &&
                        (d['platSMG'] >= 8) &&
                        (d['platS'] >= 4) &&
                        (d['platLMG'] >= 6) &&
                        (d['platMR'] >= 6) &&
                        (d['platSR'] >= 4) &&
                        (d['platP'] >= 5) &&
                        (d['platRL'] >= 4) &&
                        (d['platM'] >= 2) ) {
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
                                        gun.challenges.forEach(challenge => {
                                            if (challenge.name == 'Polyatomic') {
                                                challenge['completed'] = false
                                            }
                                        });
                                        fakePlat.style.backgroundColor = 'rgba(131, 2, 131, 0.6)'
                                        //fakePlat.style.pointerEvents = 'none'
                                    }
                                });
                            })
                        });
                        
                        
                    }
                    else {
                        console.log("hi there");
                        weaponsList.forEach(cat => {
                            
                            document.querySelectorAll('.'+cat.category.toLowerCase()+'-section .polyatomic-camo').forEach(element => {
                                element.style.backgroundColor = 'rgba(131, 2, 131, 0.6)'
                                //element.style.pointerEvents = 'none'
                            })
                            cat.guns.forEach(gun => {
                                gun.challenges.forEach(challenge => {
                                    if (challenge.name == 'Polyatomic') {
                                        console.log('kk');
                                        challenge['completed'] = false
                                    }
                                });
                            });
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
loadCheckRaw(userList, weaponsAlt, 1, platinumCompleted)
document.getElementById('percentage').innerHTML = percentage + '%'
document.getElementById('progressBarInner').style.width = (percentageBar+'%').toString()
localStorage.setItem("userWeapons", JSON.stringify(weaponsList))
