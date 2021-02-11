const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const requiredLogin = require("../Middleware/requiredlogin");
const Post = mongoose.model("Post");

router.get("/allpost", requiredLogin, (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .populate("comments.postBy", "_id name")
    .then((posts) => {
      res.json({ allposts: posts });
    })
    .then((err) => {
      console.log(err);
    });
});

router.post("/createpost", requiredLogin, (req, res) => {
  const { title, body, url } = req.body;

  if (!title || !body || !url) {
    return res.status(422).json({ error: "Please fill title and body both " });
  }
  // console.log(req.user);
  req.user.password = undefined;

  const post = new Post({
    title,
    body,
    photo: url,
    postedBy: req.user,
  });

  post
    .save()
    .then((val) => {
      res.json({ createdpost: val });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/mypost", requiredLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((posts) => {
      res.json({ mypost: posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/like", requiredLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { likes: req.user._id } },
    { new: true }
  )
    .populate("comments.postBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        return res.json(result);
      }
    });
});

router.put("/unlike", requiredLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate("comments.postBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        return res.json(result);
      }
    });
});

router.put("/comment", requiredLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postBy: req.user._id,
  };

  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { comments: comment } },
    { new: true }
  )
    .populate("comments.postBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        return res.json(result);
      }
    });
});

router.put("/deletecomment", requiredLogin, (req, res) => {});

module.exports = router;
