const express = require('express')
const { insertToDB, getAll, deleteObject} = require('./databaseHandler')
const app = express()
app.set('view engine', 'hbs')
app.use(express.urlencoded({extended:true}))

app.get('/',async (req,res)=>{
    var result = await getAll("products")
    res.render('home',{products:result})
})


app.get('/delete/:id',async (req,res)=>{
    const idValue = req.params.id
    await deleteObject(idValue, "products")
    res.redirect('/')
})

app.post('/insert',async (req,res)=>{
    const name = req.body.txtName
    const price = req.body.txtPrice
    const url = req.body.txtURL
    if (url.length == 0) {
        var result = await getAll("products")
        res.render('home', { products: result, picError: 'Picture is mandatory!' })
    } else {
        const obj = { name: name, price: price, picURL: url }
        await insertToDB(obj, "products")
        res.redirect('/')
    }
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log("Server is running!")