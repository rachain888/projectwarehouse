const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.post('/add', (req,res) => {
    const product = new Product(req.body);
    product.save((err)=>{
        if(err) return res.status(400).json({success:false, err});
        return res.status(200).json({success:true})
    });
});

router.get('/' , (req,res) => {
    Product.find().exec((err, products) => {
        if(err) return res.status(400).json({success:false, err});
        return res.status(200).json({success:true , products:products });
    });
});

router.put('/update/:id' , (req,res) => {
    Product.findByIdAndUpdate(
        req.params.id,{
            $set : req.body
        },
        (err, post ) => {
            if(err) return res.status(400).json({success:false, err});
            return res.status(200).json({success:true });
        }
    );
}); 

router.delete('/delete/:id' , (req,res) => {
    Product.findByIdAndRemove(req.params.id).exec((err, deleteItem) => {
        if(err){
            res.send(err);
        };
        return res.json(deleteItem)
    });
});

module.exports = router