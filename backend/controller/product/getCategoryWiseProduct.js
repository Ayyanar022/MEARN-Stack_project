const productModel = require("../../models/productModel");

async function getCategoryWiseProduct(req,res) {
    try{

        const {category} = req?.body || req?.query;
        const product = await productModel.find({category})

        res.json({
            data:product,
            success:true,
            error:false
        })

    }catch(err){
        res.status(400).json({
            message:err.message,
            success:false,
            error:true
        })
    }
}  


module.exports = getCategoryWiseProduct