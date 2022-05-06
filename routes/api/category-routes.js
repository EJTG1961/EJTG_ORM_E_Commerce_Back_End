const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    // be sure to include its associated Products
    .then((categories) => res.json(categories))
    .catch((err) => res.status(500).json(err));
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  console.log(req.body, req.params);
  Category.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  }).then((categories) => {
    if (!categories) {
      res.status(404).json({ message: "No category with this id" });
      return;
    }
    res.json(categories);
  });

  router
    .post("/", (req, res) => {
      // create a new category
      category_name: req.body.category_name;
    })
    .then((categories) => res.json(categories))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: { id: req.params.id },
  })
    .then((categories) => {
      if (!categories[0]) {
        res.status(404).json({ message: "No category with this id" });
        return;
      }
      res.json(categories);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: { id: req.params.id, },
  })
  .then(categories => {
    if (!categories) {
      res.status(404).json({ message: 'No category with this id' });
      return;
    }
    res.json(categories)
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
