const path = require('path')
const express = require("express");
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const hbs = require('hbs');
const geoCode = require('./utils/geocode');


// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express();
const port = process.env.PORT || 3000 

//Define paths
const publicDirectoryPath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

//setup handlebar engine and location

app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)

//setup static dir..

app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {


  res.render('index',{
    title:'Weather ',
    name:'raja'
  })
})

app.get('/about',(req,res) =>{

  res.render('about',{

    title: 'About me',
    name: 'persie'
  })
})

app.get('/help',(req,res) => {


  res.render('help',{

    helptext:'something helpfull',
    title:'Help',
    name:'persie'
  })

})

// app.get("", (req, res) => {
//   res.send('<h1> Weather </h1>');
// });

// app.get("/help", (req, res) => {
//   res.send([{name:'raja'},{age:22}]
//       );
// });

// app.get("about", (req, res) => {
//   res.send("<h1>About page</h1>");
// });

app.get("/weather", (req, res) => {

  if(!req.query.address){
    return res.send({
      error: 'must provide address'
    })
  }

  geocode(req.query.address,(error,{latitude,longitude,location}={}) => {

    if(error){

      return res.send({error})
    }

    forecast(latitude,longitude,(error,forecastData)=>{

      if(error){
        return res.send({error})
      }
      res.send({

        forecast:forecastData,
        location,
        address:req.query.address 
      })
    })

  })
  
  // res.send({
  //     forecast:"forecast",
  //     location: "delhi",
  //     address:req.query.address
  // });
});



app.get('/products',(req,res) => {
  if(!req.query.search){

    return res.send({
      error:'must provide search'
    })
 

  }
  
  console.log(req.query.search)

  res.send({

    products: []
  })

})

//app.com
//app.com/help
//app.com/about
app.get('/help/*',(req,res)=>{

res.render('404',{

  title:'404 page',

  
  name:'persie',
  errormessage:'help article not found'
})


})

app.get('*',(req,res) =>{

  res.render('404',{

    title:404,
    name: 'persie',
    errormessage:'page not found'

     
  })


})

app.listen(port, () => {
  console.log("server is up at port "+ port);
});
