const express = require('express')
const router = express.Router()
const List = require('../model/List')
const verifyToken = require('../middleware/auth')

//create

router.post('/',verifyToken, async(req, res) => {
    if (req.user.isAdmin){
        const newList = new List(req.body)
        try {
            const saveList = await newList.save()
            res.status(201).json(saveList)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else {
        res.status(403).json("you are not allowed")
    }
})

//delete

router.delete('/:id', verifyToken, async(req, res) => {
    if (req.user.isAdmin) {
        try {
            await List.findByIdAndDelete(req.params.id)
            res.status(201).json("the list has been delete ...")
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else {
        res.status(403).json("you are not allowed")
    }
    
})

//get
router.get("/", verifyToken, async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
      if (typeQuery) {
        if (genreQuery) {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery, genre: genreQuery } },
          ]);
        } else {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery } },
          ]);
        }
      } else {
        list = await List.aggregate([{ $sample: { size: 10 } }]);
      }
      res.status(200).json(list);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;