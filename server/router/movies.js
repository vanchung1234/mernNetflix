const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const Movie = require('../model/Movie')

//create Movie

router.post("/", async (req, res) => {
    
        const newMovie = new Movie(req.body)
        try {
            const saveMovie = await newMovie.save()
            res.json(saveMovie)
        } catch (error) {
            res.status(500).json(err)
        }
   
})

//update
router.put('/:id', async(req, res) => {
   
        const updateMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {new: true}
        )
        res.status(200).json(updateMovie)
   
})

//delete 

router.delete('/:id', async (req ,res) => {
    
        try {
            await Movie.findByIdAndDelete(req.params.id)
            res.status(200).json('The movie has been deleted')
        } catch (error) {
            res.status(500).json(error)
        }
    
})

//get

router.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET RANDOM

router.get("/random", verifyToken, async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
      if (type === "series") {
        movie = await Movie.aggregate([
          { $match: { isSeries: true } },
          { $sample: { size: 1 } },
        ]);
      } else {
        movie = await Movie.aggregate([
          { $match: { isSeries: false } },
          { $sample: { size: 1 } },
        ]);
      }
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get all

  router.get("/", async (req, res) => {
   
      try {
        const movies = await Movie.find();
        res.status(200).json(movies.reverse());
      } catch (err) {
        res.status(500).json(err);
      }
   
  });
  
module.exports = router;
