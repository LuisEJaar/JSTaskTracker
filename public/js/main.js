const deleteBtn = document.querySelectorAll('.del')
const notComplete = document.querySelectorAll('.not')
const isComplete = document.querySelectorAll('.completed')
const claimPoints = document.getElementById('claimPoints')
const claimRewards = document.getElementById('claimRewards')


Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteItem)
})

Array.from(notComplete).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(isComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

claimPoints.addEventListener('click', claimChorePoints)
claimRewards.addEventListener('click', claimRewardsPoints)

//Check to ensure sufficient funds
function pointsCheck() {
    try{
        let pointsAvailable = Number(document.getElementById('userPoints').innerHTML)
        let pointsClaimed = 0
        Array.from(isComplete).forEach((el)=>{
            let elType = el.parentNode.parentNode.dataset.type
            // Add to total points
            if(elType == 'reward'){
                const value = el.parentNode.parentNode.getElementsByClassName('points')
                pointsClaimed += Number(value[0].innerHTML)
            }
        })

        if(pointsClaimed > pointsAvailable){
            let rewBtn = document.getElementById('claimRewards')
            rewBtn.setAttribute('disabled', '')
            let pointDeficit = document.getElementById('pointDeficit')
            pointDeficit.classList.remove('hidden') 
        }
    } catch(err){
        console.log(err)
    }
}

pointsCheck()

async function deleteItem(){
    const itemId = this.parentNode.parentNode.dataset.id
    const type = this.parentNode.parentNode.dataset.type
    try{
        const response = await fetch(type == 'reward' ? 'rewards/deleteReward' : 'todos/deleteTodo' , {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(
                type == 'reward' ? {'rewardIdFromJSFile': itemId} : {'todoIdFromJSFile': itemId}
            )
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const itemId = this.parentNode.parentNode.dataset.id
    const type = this.parentNode.parentNode.dataset.type
    try{
        const response = await fetch(type == 'reward' ? 'rewards/markComplete' : 'todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(
                type == 'reward' ? {'rewardIdFromJSFile': itemId} : {'todoIdFromJSFile': itemId}  
            )
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const itemId = this.parentNode.parentNode.dataset.id
    const type = this.parentNode.parentNode.dataset.type
    try{
        const response = await fetch(type == 'reward' ? 'rewards/markIncomplete' : 'todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(
                type == 'reward' ? {'rewardIdFromJSFile': itemId} : {'todoIdFromJSFile': itemId}
            )
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function changeTotal(pointsValue){
    try{
        const response = await fetch('users/changeTotal', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                points: pointsValue
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function claimChorePoints(){
    try {
        let pointsClaimed = Number(document.getElementById('userPoints').innerHTML)

        Array.from(isComplete).forEach((el)=>{
            let reoccuring = el.parentNode.parentNode.dataset.reoccurance
            let type = el.parentNode.parentNode.dataset.type
            if(type != 'reward'){
                // Add to total points
                const value = el.parentNode.parentNode.getElementsByClassName('points')
                pointsClaimed += Number(value[0].innerHTML)
                //Delete non-reoccuring
                const event = new Event('click')
                if(reoccuring != 'reoccuring'){
                    console.log(el.parentNode.parentElement.lastElementChild)
                    el.parentNode.parentElement.lastElementChild.dispatchEvent(event)
                }
                //Reset the completed statuses
                el.dispatchEvent(event)
            }
        })

        // Add points to current total
        changeTotal(pointsClaimed)
    } catch(err) {
        console.log(err)
    }
}

async function claimRewardsPoints(){
    try{
        let pointsCurrent = Number(document.getElementById('userPoints').innerHTML)
        let pointsClaimed = 0;
    
        Array.from(isComplete).forEach((el)=>{
            let reoccuring = el.parentNode.parentNode.dataset.reoccurance
            let type = el.parentNode.parentNode.dataset.type
            
            if(type == 'reward'){
                // Add to total points
                const value = el.parentNode.parentNode.getElementsByClassName('points')
                pointsClaimed += Number(value[0].innerHTML)
                //Delete non-reoccuring
                const event = new Event('click')
                if(reoccuring != 'reoccuring'){
                    console.log(el.parentNode.parentElement.lastElementChild)
                    el.parentNode.parentElement.lastElementChild.dispatchEvent(event)
                }
                //Reset the completed statuses
                el.dispatchEvent(event)
            }
            // Change total
            changeTotal(pointsCurrent - pointsClaimed)
        })
    } catch(err) {
        console.log(err)
    }
}