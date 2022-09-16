const Reward = require('../models/Reward')

module.exports = {
    createReward: async (req, res)=>{
        try{
            await Reward.create(
                {
                    reward: req.body.rewardItem, 
                    completed: false, 
                    userId: req.user.id, 
                    points: req.body.points,
                    reoccuring: req.body.reoccuring,
                })
            console.log('Reward has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Reward.findOneAndUpdate({_id:req.body.rewardIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try {
            await Reward.findOneAndUpdate({_id:req.body.rewardIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        } catch(err){
            console.log(err)
        }
    },
    deleteReward: async (req, res)=>{
        console.log(req.body.rewardIdFromJSFile)
        try{
            await Reward.findOneAndDelete({_id:req.body.rewardIdFromJSFile})
            console.log('Deleted Reward')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }, 
    claimReward: async(req, res)=> {
        console.log("claim clicked")
        // req.flash('errors', { msg: 'Not enough points' })
    }
}    