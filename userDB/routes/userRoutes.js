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

router.put('/updateDetails/:userEmail', (req, res) => {

  let userEmail = req.params.userEmail;
  console.log(req.body);
  User.findOneAndUpdate({email: userEmail},{
    $set:{
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.email
    }
    },{
        upsert:true
    },(err,result) => {
        if(err) return res.send(err);
        res.send(result)
    })
})

router.put('/updatePass', (req, res) => {
  const { email, password, newPass } = req.body
  console.log("routes: " + email);
  User.findOne({ email: email })
  .then(user => {
    if(!user) {
      res.status(404).json({ msg: 'User Not found.' })
    } else {
      if(user.comparePasswordHash(password)) {
        let newPassHash = user.genPasswordHash(newPass);
        
        User.findOneAndUpdate({email: email},{
          $set:{
              passwordHash: newPassHash,
          }
          },{
              upsert:true
          },(err,result) => {
              if(err) return res.send(err);
              res.send(result)
          })

      } else {
        res.status(401).json({ msg: 'Invalid Credentials.' })
      }
    }      
  })
  .catch(err => res.status(500).json(err))
})

module.exports = router;