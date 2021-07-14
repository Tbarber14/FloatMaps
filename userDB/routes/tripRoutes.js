const router = require('express').Router()
const Trips = require('../models/UserTrips');

//Gets all trips
router.get('/getTrips', (req, res) => {
    Trips.find((err, result) => {
        if(err) throw err;
        else res.send(result);
    })
})

//Gets trips by email
router.get('/yourTrips/:email', (req, res) => {
    console.log("Email: ")
    console.log(req.params.email);
    let email = req.params.email;
    Trips.find({'email' : email}, (err, result) => {
        if(err) res.send('Error finding trips!!');
        else res.send(result);
    })
})

//Adds new trips
router.post('/addTrips', (req, res) => {
  console.log("req.body = ",req.body)
  Trips.create(req.body, (err, result) => {
    if(err) {
        res.send('Error inserting document!!')
        console.log("err", err)
    }
    else{
        res.send(
            { message : 'Document inserted successfully!!'});
            console.log("res server", res)
    }
})
})

// Deletes trips by id
router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    console.log("The ID to delete: " + id);
    Trips.findByIdAndDelete(id, (err, result) => {
        if(err) res.send('Error deleting document!!');
        else res.send({ message : 'Document deleted successfully!!'});
        
    })
})

// Updates trip by id
router.put('/updateTrip/:id', (req, res) => {
    let id = req.params.id;
    Trips.findByIdAndUpdate(id,{
            $set:{
                title: req.body.title,
                description: req.body.description,
                image: req.body.image,
                publishDate: req.body.publishDate,
                distance: req.body.distance,
                allMarkers: req.body.allMarkers
            }
        },{
            upsert:true
        },(err,result) => {
            if(err) return res.send(err);
            res.send(result)
        })
})

router.put('/updateTripEmail/:oldEmail', (req, res) => {
    console.log(req.params.oldEmail);
    let currentUserEmail = req.params.oldEmail;
    Trips.updateMany({email: currentUserEmail},{
            $set:{
                    email: req.body.email
            }
        },{
            upsert:true
        },(err,result) => {
            if(err) return res.send(err);
            res.send(result)
        })
})

module.exports = router;