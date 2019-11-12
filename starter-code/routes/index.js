const express = require('express');
const router = express.Router();
const Celebrity = require("../model/Celebrity");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/celebrities", (req, res) => {
  Celebrity.find().then(celeb => {
    // res.send(celeb)
    res.render('celebrities.hbs', {
      celebrity: celeb
    });
  }).catch(err => {
    console.log(err)
  })
})

router.get('/celebrities/:celebId', (req, res) => {
  Celebrity.findById(req.params.celebId).then(celeb => {
    res.render('show.hbs', {
      celebInfo: celeb
    });
  }).catch(err => {
    console.log(err);
  })
});

router.get('/new', (req, res) => {
  res.render('new.hbs')
});

router.post("/celebrities", (req, res) => {
  const {
    name,
    occupation,
    catchPhrase
  } = req.body
  Celebrity.create({
    name,
    occupation,
    catchPhrase
  }).then(newCeleb => {
    res.redirect("/celebrities")
  })
})

router.post('/celebrities/:id/delete', (req, res) => {
  Celebrity.findByIdAndDelete(req.params.id).then(celeb => {
    res.redirect('/celebrities')
  }).catch(err => {
    console.log(err);
  })
});

router.get('/celebrities/:id/edit', (req, res) => {
  Celebrity.findById(req.params.id).then(celeb => {
      res.render('edit.hbs', {
        celeb
      })
    })
    .catch(err => {
      console.log(err);
    })
})

router.post("/celebrities/:id", (req, res) => {
  Celebrity.updateOne({
    _id: req.params.id
  }, {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  }).then(() => {
    res.redirect("/celebrities/" + req.params.id)
  }).catch(err => {
    console.log(err);
  })
})


module.exports = router;