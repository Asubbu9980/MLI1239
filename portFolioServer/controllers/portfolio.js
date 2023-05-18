const portfolioModel = require('../models/portfolio')

const createPortfolio = async function(req,res,next) {
    const portfolio = new portfolioModel(req.body);
    try {
        const newPortfolio = await portfolio.save();
        res.status(201).json({
            message:"success",
            data: {
                portfolio:newPortfolio
            }
        })
    } catch(err) {
       res.status(404).json({
        message:"fail",
        data:err
       })
    }
}


const getportfolios = async function(req, res, next) {
    try {
        const portfolios =  await portfolioModel.find({})
        res.status(200).json({
            message:"success",
            data: {
                portfolios:portfolios
            }
        })
       
    } catch(err) {
        res.status(404).json({
            message:"fail",
            data:err
        })
    }
    
}
const getportfolio = async function(req, res, next) {
    console.log("rv")
    const id = req?.params?.id
    console.log(id)
    try {
        const portfolio =  await portfolioModel.findById(id)
        // res.status(200).json({
        //     message:"success",
        //     data: {
        //         portfolio:portfolio
        //     }
        // })
        console.log(portfolio)
        res.send(portfolio)
        
       
    } catch(err) {
        res.status(404).json({
            message:"fail",
            data:err
        })
    }
    
}

module.exports = {createPortfolio,getportfolios,getportfolio}