const Score = require('../../models').Score;
const User = require('../../models').User;

//Create Score when the game starts
exports.createInitialScore = async(req,res) => {
   
    const {scores} = req.body
  const gameRecord = await Score.findOne({ where: { gameId:req.params.gameId } });
   if(gameRecord){
    res.status(404).json({message:"Could not recreate game"})
   }
    
    scores.map( record => {
    (async record => { 
        try {
         const inserted = await  Score.create({...record});
          res.status(200).json(record)
        } catch (e) {
          res.status(404).json(e)
        }
    })(record);
});
}

//Get specific Game scores
  exports.getGameScores = (req, res) => {
    return Score.findAll({
      where:{gameId:req.params.id},
      include: {
        model: User,
        required: true
      }
    })
    .then(scores => {
      res.status(200).json(scores)
    }).catch((err) => {
      res.status(404).json(err)
    })
  }

//Kill or Revive a user in the game
  exports.reviveOrKillPlayer = (req, res) => {
    Score.update(
      { playerStatus: req.body.playerStatus },
      { where: { userId: req.params.userId,gameId:req.params.gameId } }
    )
      .then(status =>
        res.status(200).json(status)
      )
      .catch(err =>
        res.status(404).json(err)
      )
  }

//Increase score for a player when a kill is made
exports.increasePlayerScore = async(req, res) => {
  const scoreRecord = await Score.findOne({ where: { userId: req.params.userId,gameId:req.params.gameId } });
  const currentScore =  scoreRecord.noOfkills

  Score.update(
    { noOfkills: currentScore+1},
    { where: { userId: req.params.userId,gameId:req.params.gameId } }
  )
    .then(status =>
      res.status(200).json(status)
    )
    .catch(err =>
      res.status(404).json(err)
    )
}
68.183.72.41
k1araElevkar







