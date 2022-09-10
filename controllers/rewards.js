const Reward = require('../models/Reward')

module.exports = {
    createReward: async (req, res)=>{
        try{
            await Reward.create(
                {
                    reward: req.body.todoItem, 
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
    markRedeemed: async (req, res)=>{
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
    markUnredeemed: async (req, res)=>{
        try{
            await Reward.findOneAndUpdate({_id:req.body.rewardIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteReward: async (req, res)=>{
        console.log(req.body.rewardIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.rewardIdFromJSFile})
            console.log('Deleted Reward')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    