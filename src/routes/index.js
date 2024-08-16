const userRouter = require('./userRouter');

const router = (app) => {
    app.use("/users", userRouter)
    app.get('/coucou', (req, res)=>{
        res.json({message:"Tu vas y arriver, ne désespère pas !"});
    })
}

module.exports = {router};