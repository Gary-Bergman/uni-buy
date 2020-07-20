var db = require("../models");
// var path = require("path");


module.exports = function(app) {
  // Get all examples
  app.get("/api/items", function(req, res) {
    db.Seller.findAll({}).then(function(dbSellers) {
      res.json(dbSellers);
    });
  });

  // Create a new example
  app.post("/api/item", function(req, res) {
    db.Seller.create(req.body).then(dbSellers => {
      res.json(dbSellers);
    })
    .catch(err => {
      console.log("Failed to create new item");
      res.sendStatus(500);
    })
  });

  app.get("/api/items/:id", function(req, res) {
    db.Seller.findAll({ where: { id: req.params.id } }).then(function(dbSellers) {
      res.json(dbSellers);
    });
  });

  // Delete an example by id
  app.delete("/api/items/:id", function(req, res) {
    db.Seller.destroy({ where: { id: req.params.id } }).then(function(dbSellers) {
      res.json(dbSellers);
    });
  });
};

// Home page

app.put('/api/items/:category', function (req, res) {
  db.Post.update({ show: false },
    {}).then(function () {
      db.Post.update({ show: true },
        {
          where: {
            category: req.perams.category
          }
        })
        .then(function (event) {
          res.json(event);
        });
    })
});

app.get("/", function (req, res) {
  db.Post.findAll({
    where: {
      show: true
    }
  }).then(function (Post) {
    res.render("/home", Post);
  });
});

app.get('/api/buy/:id', function (req, res) {

  db.Post.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(function (Posts) {
      res.render("buyItem", Posts);
    });
});

//HomePage
