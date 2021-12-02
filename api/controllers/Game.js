const Game = require('../../models').Game;

//Create Game
exports.createGame = (req,res) => {
    const url = req.protocol + '://' + req.get('host');
    const {gameName} = req.body
    
      return Game.create({gameName})
        .then((game)=>{
          return res.status(201).json(game);
        }).catch((err) => {
          return res.status(400).json({message:err.message})
        })
    }


   // view all games
   exports.getAllGames = (req,res) => {
    return Game.findAll()
    .then((game) => {
      res.status(200).json(game)
    })
    .catch((err) => {
      res.status(404).json(err)
    })
  }

  //Get a specific Game
exports.getGame = (req, res) => {
    return Game.findByPk(req.params.id).then(game => {
      res.status(200).json(game)
    })
  }

//Delete Game
exports.deleteGame =async (req,res) => {
      return Game.destroy({
        where: {
           id: req.params.id
         }})
         .then(()=>{
           res.status(200).json({message:"Game has been Deleted"})
         })
         .catch((err)=>{
           res.status(404).json({error:err})
         })
    }