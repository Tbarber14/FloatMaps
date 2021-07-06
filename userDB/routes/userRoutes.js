const router = require('express').Router()
const User = require('../models/User')

router.post('/login', (req, res) => {
  const { username, password } = req.body

  User.findOne({ username })
    .then(user => {
      if(!user) {
        res.status(404).json({ msg: 'User Not found.' })
      } else {
        if(user.comparePasswordHash(password)) {
          res.json(user.genUserObj())
        } else {
          res.status(401).json({ msg: 'Invalid Credentials.' })
        }
      }      
    })
    .catch(err => res.status(500).json(err))
})

router.post('/register', (req, res) => {
  const { name, email, phone, username, password } = req.body

  const user = new User()

  user.name = name
  user.email = email
  user.phone = phone
  user.username = username

  user.genPasswordHash(password)

  user.save()
    .then(newUser => res.json(newUser.genUserObj()))
    .catch(err => res.status(500).json(err))
})

router.put('/updateDetails', (req, res) => {
  const { name, email, phone, username, password } = req.body

  const user = new User()

  user.name = name
  user.email = email
  user.phone = phone
  user.username = username

  user.genPasswordHash(password)

  user.save()
    .then(newUser => res.json(newUser.genUserObj()))
    .catch(err => res.status(500).json(err))
})

router.put('/updatePass', (req, res) => {
  const { username, password } = req.body

  const user = new User()

  user.username = username

  user.genPasswordHash(password)

   User.findOne({ username },{
    $set:{
      password: user.UserSchema.passwordHash
    }
},{
    upsert:true
},(err,result) => {
    if(err) return res.send(err);
    res.send(result)
})
})

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

module.exports = router;