const Sauce = require('../models/source');
const fs = require('fs');
exports.createSauce = (req, res, next) => {
  const url=req.protocol +'://'+ req.get('host');
  req.body.sauce=JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    imageUrl:url+'/images/' + req.file.filename,
    description: req.body.sauce.description,
    mainPepper: req.body.sauce.mainPepper,
    heat: req.body.sauce.heat,
    userId: req.body.sauce.userId
  });
  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getallSauce=(req, res, next) => {
    Sauce.find().then(
      (sauce) => {
        res.status(200).json(sauce);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

exports.deleteSauce=(req, res, next) => {
  Sauce.findOne({_id: req.params.id}).then(
    (sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Sauce.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      });
    }
  );
};
exports.oneSauce= (req, res, next) => {
    Sauce.findOne({
      _id: req.params.id
    }).then(
      (sauce) => {
        res.status(200).json(sauce);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

  // exports.likeSauce= (req, res, next) => {
  //   Sauce.findOne({
  //     _id: req.params.id
  //   }).then(
  //     (sauce) => {
  //       res.status(200).json(sauce);
  //     }
  //   ).catch(
  //     (error) => {
  //       res.status(404).json({
  //         error: error
  //       });
  //     }
  //   );
  // };

  exports.updateSauce=  (req, res, next) => {
    let sauce = new Sauce({ _id: req.params._id });
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      req.body.sauce = JSON.parse(req.body.sauce);
      sauce = {
        _id: req.params.id,
        name: req.body.sauce.name,
        description: req.body.sauce.description,
        imageUrl: url + '/images/' + req.file.filename,
        manufacturer: req.body.sauce.manufacturer,
        mainPepper:req.body.sauce.mainPepper,
        heat:req.body.sauce.heat,
        userId: req.body.sauce.userId
      };
    } else {
      sauce = {
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description,
       // imageUrl: req.body.imageUrl,
        manufacturer: req.body.manufacturer,
        mainPepper:req.body.mainPepper,
        heat:req.body.heat,
        userId: req.body.userId

        // _id: req.params.id,
        // title: req.body.title,
        // description: req.body.description,
        // imageUrl: req.body.imageUrl,
        // price: req.body.price,
        // userId: req.body.userId
      };
    }
    Sauce.updateOne({_id: req.params.id}, sauce).then(
      () => {
        res.status(201).json({
          message: 'Thing updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };