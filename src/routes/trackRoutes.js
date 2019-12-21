const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');
const Track = mongoose.model('Track');
const router = express.Router();

router.use(requireAuth);

router.get('/get_tracks', async (req,res) => {
    const tracks = await Track.find({ userId: req.user._id});
    res.send( tracks );
});

router.post('/add_tracks', async (req,res) => {
    console.log(req);
    const {name,locations} = req.body;
    if(!name || !locations) {
        return res.status(422).send({error:"Must Provide Name and locations!"})
    }
    try{
        const track = new Track({name, locations, userId: req.user._id});
        await track.save();
        res.send(track);
    } catch(err){
        return res.status(422).send({error:"Invalid name or locations!"});
    }
});
module.exports = router;