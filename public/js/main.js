const deleteBtn = document.querySelectorAll('.del')
const notComplete = document.querySelectorAll('.not')
const isComplete = document.querySelectorAll('.completed')
const claimPoints = document.getElementById('claimPoints')

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

async function deleteItem(){
    const itemId = this.parentNode.dataset.id
    const type = this.parentNode.dataset.type
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

async function claimChorePoints(){
    let pointsClaimed = 0

    Array.from(isComplete).forEach((el)=>{
        // Add to total points
        const value = el.parentNode.parentNode.getElementsByClassName('points')
        pointsClaimed += Number(value[0].innerHTML)
        //Delete non-reoccuring
        if(el.parentNode.parentNode.dataset.reoccurance != 'reoccuring'){
            console.log(el.parentNode.parentElement.lastElementChild)
            el.parentNode.parentElement.lastElementChild.dispatchEvent(event)
        }
        //Reset the completed statuses
        const event = new Event('click')
        if(el.parentNode.parentNode.dataset.type != 'reward'){
            el.dispatchEvent(event)
        }
    })

    // Add points to current total
}