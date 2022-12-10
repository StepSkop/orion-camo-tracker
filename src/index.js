import weapons from "../updatedWeapons.json" assert {type: 'json'};
var maxChallenges = 367
var requiredChallenges = 339
var completedChallenges = 0

var weaponsAlt = JSON.stringify(weapons)
var weaponsList
var userList

var commonChallenges = 0

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

let fileInput = document.querySelector('#lsImp')

function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}
function onReaderLoad(event){
    localStorage.setItem("userWeapons", event.target.result)
    location.reload()
}
fileInput.addEventListener('change', onChange)

if (localStorage.length == 0) {
    userList = weapons
} else {
    userList = JSON.parse(localStorage.getItem("userWeapons"))
}

document.querySelector('#lsRemover').addEventListener('click', function() {
    localStorage.setItem("userWeapons",JSON.stringify(weapons))
    location.reload()
})

let fileExport = document.querySelector('#lsExp')


fileExport.addEventListener('click', function downloadObjectAsJson(){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(localStorage.getItem('userWeapons'));
    var downloadAnchorNode = document.createElement('a');
    var d = new Date();
    d = new Date(d.getTime() - 3000000);


    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", 'orion_'+ new Date().toISOString().split('T')[0] + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
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
                    if (x[C].guns[G] != null) {
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
                                                        document.querySelector('.W'+gun.name.replace(" ",'-').replace(".","-").toLowerCase() + ' + section > div:last-child').style.pointerEvents = 'all'
                    

                                                        if (document.querySelector('.W'+gun.name.replace(" ",'-').replace(".","-").toLowerCase() + ' + section > div:last-child').style.backgroundColor == 'rgba(131, 2, 131, 0.6)') {
                                                            document.querySelector('.W'+gun.name.replace(" ",'-').replace(".","-").toLowerCase() + ' + section > div:last-child').style.backgroundColor = 'purple'
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
    }
    return x
}
function loadBanner(gun) {


    let gunBann = document.querySelector('.W'+gun.name.replace(" ",'-').replace(".","-").toLowerCase())
    if ((gun.challenges[gun.challenges.length -3].name == "Gold" && gun.challenges[gun.challenges.length -3].completed == false) 
    && (gun.challenges[gun.challenges.length -2].name == "Platinum" && gun.challenges[gun.challenges.length -2].completed == false) 
    && (gun.challenges[gun.challenges.length -1].name == "Polyatomic" && gun.challenges[gun.challenges.length -1].completed == false)) {
        gunBann.style.backgroundColor = '#2e2d2d';
        gunBann.style.color = "white"
    }
    
    gun.challenges.forEach(challenge => {
        if (challenge.completed == true) {
            switch (challenge.name) {
                case "Gold":
                    
                    gunBann.style.backgroundColor = 'gold'
                    gunBann.style.color = "black"
                    break;
                case "Platinum":
                   
                    gunBann.style.backgroundColor = 'silver'
                    gunBann.style.color = "black"
                    break;
                case "Polyatomic":
                   
                    gunBann.style.backgroundColor = 'purple'
                    gunBann.style.color = "white"
                    break;
            }
        } 
        
    });
    
}
function countTrue(weapons, p) {
    let commonCount = 0
    let foundCompleted = 0
    weapons.forEach(cat => {

        if (cat.category == "M" ||
        cat.category == "RL") {
            commonCount = 1
        } else {
            commonCount = 4
        }

        var orionRequirements = {
            "common":0, //186
            "gold":0, //51
            "platinum":0, //51
            "polyatomic":0 //51
        }

        cat.guns.forEach(gun =>{
            let gunComCom = 0
            gun.challenges.forEach(challenge =>{
                if (p == true) {
                    switch (challenge.name) {
                        case "Common":
                            if ((challenge.completed == true)) {
                                gunComCom++
                                if (condition) {
                                    
                                }
                            }


                            if ((orionRequirements.common < 186) && (challenge.completed == true)) {
                                foundCompleted++
                                orionRequirements["common"]++
                            }
                            break;
                    
                        case "Gold":
                            if ((orionRequirements.gold < 51) && (challenge.completed == true))  {
                                foundCompleted++
                                orionRequirements["gold"]++
                            }
                            break;
                        case "Platinum":
                            if ((orionRequirements.platinum < 51) && (challenge.completed == true)) {
                                foundCompleted++
                                orionRequirements["platinum"]++
                            }
                            break;
                        case "Polyatomic":
                            if ((orionRequirements.polyatomic < 51) && (challenge.completed == true)) {
                                foundCompleted++
                                orionRequirements["polyatomic"]++
                            }
                            break;
                    }
                } else {



                    if (challenge.completed == true) {
                        foundCompleted++
                    }
                }
            })
        })
    });
    if (p == true) {
        return foundCompleted
    } else {
        return foundCompleted
    }
    
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

completedChallenges = countTrue(weaponsList, false)
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
                    var commonCompletedX = 0
                    gun.challenges.forEach(challengeX => {
                        if (challengeX.name == 'Common' && challengeX.completed == true) {
                            commonCompletedX++
                        }
                    });

                    
                    
                    
                    switch (challenge.completed) {
                        case true:
                            challenge['completed'] = false
                            if (challenge.name == 'Platinum') {
                                if (platinumCompleted['plat'+cat.category] != 0) {
                                    platinumCompleted['plat'+cat.category]--
                                }
                            }

                            if (challenge.name == 'Gold') {

                                if (gun.challenges[gun.challenges.length - 2].completed == true) {
                                    if (platinumCompleted['plat'+cat.category] != 0) {
                                        platinumCompleted['plat'+cat.category]--
                                    }

                                }
                                goldsCompleted--
                                
                            }

                            if (challenge.name == "Common") {
                                if (gun.challenges[gun.challenges.length - 2].completed == true) {
                                    if (platinumCompleted['plat'+cat.category] != 0) {
                                        platinumCompleted['plat'+cat.category]--
                                    }
                                }
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
                            break;
                    
                        case false:

                            if (challenge.name == "Common") {
                                challenge['completed'] = true
                                checker.style.backgroundColor = 'rgb(53, 212, 63)'
                            }
                            if (challenge.name == "Gold") {

                                
                                
                                if (commonCompletedX == gun.challenges.length -3) {
                                    challenge['completed'] = true
                                    checker.style.backgroundColor = 'rgb(53, 212, 63)'
                                } else {
                                    challenge['completed'] = false
                                }
                            }
                           

                            if (challenge.name == "Platinum") {
                                let gunGold = false
                                gun.challenges.forEach(challenge2 =>{
                                    if (challenge2.name == 'Gold' && challenge2.completed == true) {
                                        gunGold = true
                                    }
                                })
                                let catGolds = 0
                                cat.guns.forEach(gun3 => {
                                    gun3.challenges.forEach(challenge3 => {
                                        if (challenge3.name == 'Gold' && challenge3.completed == true) {
                                            catGolds++
                                        }
                                    });
                                })
                                if ((catGolds >= cat.platReq) && gunGold == true) {
                                    
                                    challenge['completed'] = true
                                    checker.style.backgroundColor = 'rgb(53, 212, 63)'
                                } else {
                                    
                                    challenge['completed'] = false
                                    
                                }

                            }
                            if (challenge.name == "Polyatomic") {
                                gun.challenges.forEach(challenge2 => {
                                    
                                    if (challenge2.name == "Platinum" && challenge2.completed == true) {
                                        challenge['completed'] = true
                                        checker.style.backgroundColor = 'rgb(53, 212, 63)'
                                    }
                                    else if (challenge2.name == "Platinum" && challenge2.completed == false){
                                        
                                        challenge['completed'] = false
                                    }
                                })
                            
                            

                            } 
                            //else {

                            //     challenge['completed'] = true
                            //     checker.style.backgroundColor = 'rgb(53, 212, 63)'
                            // }
                            
                            
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
                        //goldsCompleted--
                    }
                    if (commonCompleted >= gun.challenges.length - 3) {
                        
                        if (goldCamo.style.backgroundColor == 'rgba(255, 217, 0, 0.6)') {
                            
                            goldCamo.style.backgroundColor = 'gold'
                        }
                        goldCamo.style.pointerEvents = 'all'
                    }
                    else {
                        goldCamo.style.backgroundColor = 'rgba(255, 217, 0, 0.6)'
                    }
                    
                    if (commonCompleted != gun.challenges.length - 3) {

                        gun.challenges.forEach(challenge => {
                            
                            if (challenge.name == 'Gold' && challenge.completed == true) {
                                
                                challenge['completed'] = false
                                goldsCompleted--
                                gun.challenges.forEach(challenge => {
                                    if (challenge.name == "Platinum" && challenge.completed == true) {
                                        //platinumCompleted['plat'+cat.category]--
                                    }
                                })
                                
                            }
                        });
                    }

                    //platinum camo
                    if (challenge.name == 'Platinum' && challenge.completed == true) {
                        platinumCompleted['plat'+cat.category]++

                    } else if (challenge.name == 'Platinum' && challenge.completed == false) {
                        // if (platinumCompleted['plat'+cat.category] != 0) {
                        //     platinumCompleted['plat'+cat.category]--
                        // }
                    }
                    

                    
                    if ((goldsCompleted >= cat.platReq)) {

                        document.querySelectorAll('.'+cat.category.toLowerCase()+'-section .platinum-camo').forEach(element => {
                            cat.guns.forEach(gun => {
                                gun.challenges.forEach(challenge => {
                                    if (challenge.name == "Gold" && challenge.completed == true) {
                                        element.style.pointerEvents = 'all'
                                        if (element.style.backgroundColor == 'rgba(192, 192, 192, 0.6)') {
                                            element.style.backgroundColor = 'silver'
                                        }
                                        
                                        
                                    }
                                })
                            });
                        });
                        cat.guns.forEach(gun =>{
                            gun.challenges.forEach(challenge => {
                                
                                if (challenge.name == 'Gold' && challenge.completed == false)   {
                                    var fakePlat = document.querySelector('.W'+gun.name.replace(" ",'-').replace(".","-").toLowerCase() + ' + section :nth-last-child(2)')
                                    fakePlat.style.backgroundColor = 'rgba(192, 192, 192, 0.6)'
                                    gun.challenges[gun.challenges.length - 2].completed = false
                                    // if (platinumCompleted['plat'+cat.category] != 0) {
                                    //     platinumCompleted['plat'+cat.category]--
                                    // }
                                    //fakePlat.style.pointerEvents = 'none'
                                }
                            });
                        })
                    }
                    else {


                        document.querySelectorAll('.'+cat.category.toLowerCase()+'-section .platinum-camo').forEach(element => {
                            element.style.backgroundColor = 'rgba(192, 192, 192, 0.6)'
                        })
                    }
                    
                    if ((goldsCompleted < cat.platReq)) {
                        cat.guns.forEach(gun => {
                            gun.challenges.forEach(challenge => {
                                if (challenge.name == 'Platinum' && challenge.completed == true) {
                                    challenge['completed'] = false
                                }
                            });
                        })
                    }


                    //Poly
                    var d = platinumCompleted
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

                            weaponsList.forEach(cat => {
                                cat.guns.forEach(gun => {
                                    gun.challenges.forEach(challenge =>{
                                        if (challenge.name == "Platinum" && challenge.completed == true) {
                                            if (document.querySelector('.W'+gun.name.replace(" ",'-').replace(".","-").toLowerCase() + ' + section > div:last-child').style.backgroundColor == 'rgba(131, 2, 131, 0.6)') {
                                                document.querySelector('.W'+gun.name.replace(" ",'-').replace(".","-").toLowerCase() + ' + section > div:last-child').style.backgroundColor = 'purple'
                                            }
                                        }
                                    })
                                })
                            });
                            
                    } else { 
                        weaponsList.forEach(cat => {
                            cat.guns.forEach(gun => {
                                gun.challenges.forEach(challenge => {
                                    if (challenge.name == "Polyatomic") {
                                        challenge["completed"]= false
                                    }
                                })
                            })
                        });
                        document.querySelectorAll(".polyatomic-camo").forEach(polyDiv => {
                            polyDiv.style.backgroundColor = 'rgba(131, 2, 131, 0.6)'
                        })
                    }
                    
                    weaponsList.forEach(cat => {
                        cat.guns.forEach(gun => {
                            loadBanner(gun)
                        })
                    });

                    if (gun.challenges[gun.challenges.length - 2].completed == false) {
                        //document.querySelector('.W'+gun.name.replace(" ",'-').replace(".","-").toLowerCase() + ' + section > div:last-child').style.backgroundColor == 'rgba(131, 2, 131, 0.6)'
                        document.querySelector('.W'+gun.name.replace(" ",'-').replace(".","-").toLowerCase() + ' + section > div:last-child').style.backgroundColor = 'rgba(131, 2, 131, 0.6)';
                        gun.challenges[gun.challenges.length - 1].completed = false
                        loadBanner(gun)
                        

                    }
                    completedChallenges = countTrue(weaponsList, false)
                    percentage = countPercentage(requiredChallenges, completedChallenges)
                    percentageBar = countBar(percentage)

                    document.getElementById('percentage').innerHTML = "Orion camo: "+percentage + '%'
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

weaponsList.forEach(cat => {
    cat.guns.forEach(gun => {
        loadBanner(gun)
    })
});
loadCheckRaw(userList, weaponsAlt, 1, platinumCompleted)
document.getElementById('percentage').innerHTML = 'Orion camo: '+ percentage + '%'
document.getElementById('progressBarInner').style.width = (percentageBar+'%').toString()
localStorage.setItem("userWeapons", JSON.stringify(weaponsList))
