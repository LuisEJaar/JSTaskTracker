const User = require('../models/User')

module.exports = {
  changeTotal: async (req, res)=>{
      try{
          await User.findOneAndUpdate({_id:req.user.id},{
              points: req.body.points
          })
          console.log('Done')
      }catch(err){
          console.log(err)
      }
  }
}    