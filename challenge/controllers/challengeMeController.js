const db = require("../models");

module.exports = {
  createUser: function(req,res){
    console.log(req.body)
    db.Users
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findUser: function(req,res){
    db.Users
      .findOne({firebaseId: req.params.firebaseId})
      .populate({
        path: "challenges",
        populate:{
          path: "participants owner"
        }
      })
      .exec(function(err,userInfo){
          if(err){
            throw err
          }
          res.json(userInfo)
        }
      )
  },
  createChallenge: function(req,res){
    db.Users
      .findOne({firebaseId: req.body.firebaseId},function(err,userInfo){
        if(err){
          res.send("User not found!")
        }
        var newChallenge = {
          name: req.body.name,
          status: "created",
          duration: req.body.duration,
          unitCost: req.body.unitCost,
          currency: req.body.currency,
          rules: req.body.rules,
          owner: userInfo._id,
          participants: [userInfo._id]
        }  
        db.Challenges
          .create(newChallenge)
          .then(dbModel => {
            db.Users
              .update({firebaseId: req.body.firebaseId},{$push:{challenges:dbModel._id, ownedChallenges: dbModel._id}})
              .then(userModel =>{
                res.json(dbModel)
              })
          })
        })
  },
  joinChallenge: function(req,res){
    db.Users
      .findOne({firebaseId: req.body.firebaseId},function(err,userInfo){
        if(err){
          res.send("User not found!")
        }
        db.Challenges
          .findOne({_id:req.body.invitationCode},function(err,challengeInfo){
            if(err){
              res.send("Invalid invitation code")
            }
            db.Users
              .update({_id:userInfo._id},{$push:{challenges:challengeInfo._id}})
              .then(updateUserResult =>{
                db.Challenges
                  .update({_id:challengeInfo._id},{$push:{participants:userInfo._id}})
                  .then(updateChallengeResult =>{
                    res.json(
                      {
                        userUpdate: updateUserResult,
                        challengeUpdate: updateChallengeResult
                      }
                    )
                  })
              }
              )
          })
      })
  },
  findChallenge: function(req,res){
    db.Challenges
      .findOne({_id:req.params.challengeId})
      .populate({
        path: "participants",
        populate:{
          path: "challenges"
        }
      })
      .populate("owner")
      .exec(function(err,challenge){
        if(err){
          res.send(err)
        }
        res.json(challenge)
      })
  },
  createActivity: function(req,res){
    console.log("Running createActivity!")
    db.Users
      .findOne({firebaseId: req.body.firebaseId},function(err,userInfo){
        if(err){
          res.end("User not found!")
        }
        else{
          var challengeInUser = false
          for(i=0;i<userInfo.challenges.length;i++){
            if(userInfo.challenges[i]._id.toString() === req.body.challengeId.toString()){
              challengeInUser = true
              break
            }
          }
          if(challengeInUser===false){
            res.end("The challenge that was specified is not part of the user's challenges array")
          }
          else{
            db.Challenges
              .findOne({_id: req.body.challengeId},function(err,challengeInfo){
                if(err){
                  res.end("Challenge not found!")
                }
                else{
                  var userInChallenge = false
                  for(i=0;i<challengeInfo.participants.length;i++){
                    if(challengeInfo.participants[i]._id.toString() === userInfo._id.toString()){
                      userInChallenge = true
                      break
                    }
                  }
                  if(userInChallenge===false){
                    res.end("The user that was specified is not part of the challenge participants array")
                  }
                  else{
                    var newActivity = {
                      description: req.body.description,
                      owner: userInfo._id,
                      approved: false
                    }
                    db.Activities
                      .create(newActivity)
                      .then(dbActivity=>{
                        res.json(dbActivity)
                      })
                  }
                }
              })
          }
        }
      })
  },
  activityApproval: function(req,res){
    res.send("Activity approval route")
  }
};
