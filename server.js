//W13D1
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const Fruit = require('./models/fruit');
const mongoose = require('mongoose');
//include the method-override package in order to be able to DELETE
const methodOverride = require('method-override');

//// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});
//////////////////////////

const jsxViewEngine = require('jsx-view-engine');

app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxViewEngine());

//CSS Import 
// serve all the files in the public folder 

app.use(express.static('public'));



// Middleware;
app.use((req, res, next) => {
  console.log('Middleware: I run for all routes, 1');
  next();
});
// By implementing the line below, we now have access to the req.body. Which is the parsed formData from the form request.
app.use(express.urlencoded({ extended: false }));

//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'));

// const middleware = (req, res, next) => {
//   console.log('Middleware: I run for all routes, 1');
//   next();
// };


// Seed Route
app.get('/fruits/seed', async (req, res) => {
  try {
    await Fruit.create([
      {
        name: 'grapefruit',
        color: 'pink',
        readyToEat: true
      },
      {
        name: 'grape',
        color: 'purple',
        readyToEat: false
      },
      {
        name: 'avocado',
        color: 'green',
        readyToEat: true
      }
    ]);
    res.redirect('/fruits');
  } catch (err) {
    res.status(400).send(err);
  }
})




// Index
app.get('/fruits', async (req, res) => {
  try {
    const foundFruits = await Fruit.find({});
    console.log(foundFruits);
    res.status(200).render('fruits/Index', {
      fruits: foundFruits,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// New
app.get('/fruits/new', (req, res) => {
  console.log('New controller');
  res.render('fruits/New');
});

// Delete
app.delete('/fruits/:id', async (req, res) => {
  // this is is going to actually implement the delete functionality from the database
  try {
    // we are getting this id from the req params (:id)
    await Fruit.findByIdAndDelete(req.params.id); 
    res.status(200).redirect('/fruits');
  } catch (err) {
    res.status(400).send(err);
  }

  // we had this in originally to test that the route worked.  
  // res.send('deleting...');
})



// Update -- notes on this topic outdated, hence the code below 
app.put('/fruits/:id', async (req, res) => {
  try {
    if (req.body.readyToEat === 'on') {
      req.body.readyToEat = true;
    }
    else {
      req.body.readyToEat = false;
    }
    const updatedFruit = await Fruit.findByIdAndUpdate(
      // id is from the url that we got by clicking on the edit <a/> tag
      req.params.id, 
      // the information from the form, with the update that we made above
      req.body, 
      // need this to prevent a delay in the update
      {new: true})
      console.log(updatedFruit);
      res.redirect(`/fruits/${req.params.id}`);
  } catch (err) {
    res.status(400).send(err);
  }
});





// Create
app.post('/fruits', async (req, res) => {
  try {
    // if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
    //   req.body.readyToEat = true; //do some data correction
    // } else { //if not checked, req.body.readyToEat is undefined
    //   req.body.readyToEat = false; //do some data correction
    // }
    req.body.readyToEat = req.body.readyToEat === 'on';

    const createdFruit = await Fruit.create(req.body);

    res.status(201).redirect('/fruits');
  } catch (err) {
    res.status(400).send(err);
  }
});

// Edit -- notes on this topic outdated, hence the code below 
app.get('/fruits/:id/edit', async( req, res ) => {
  try {
    // find the document in the database that we want to update 
    const foundFruit = await Fruit.findById(req.params.id);
    res.render('fruits/Edit', {
      fruit: foundFruit //pass in the foundFruit so that we can prefill the form
    })
  } catch (err) {
    res.status(400).send(err);
  }
})

// Show
app.get('/fruits/:id', async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);

    //second param of the render method must be an object
    res.render('fruits/Show', {
      //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
      fruit: foundFruit,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});




































// //W12D3
// require('dotenv').config();
// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3000;
// const Fruit = require('./models/fruit');
// const mongoose = require('mongoose');

// //// Database Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongoose.connection.once('open', () => {
//   console.log('connected to mongo');
// });
// //////////////////////////

// const jsxViewEngine = require('jsx-view-engine');

// app.set('view engine', 'jsx');
// app.set('views', './views');
// app.engine('jsx', jsxViewEngine());

// // Middleware;
// app.use((req, res, next) => {
//   console.log('Middleware: I run for all routes, 1');
//   next();
// });
// // By implementing the line below, we now have access to the req.body. Which is the parsed formData from the form request.
// app.use(express.urlencoded({ extended: false }));

// // const middleware = (req, res, next) => {
// //   console.log('Middleware: I run for all routes, 1');
// //   next();
// // };

// // Index
// app.get('/fruits', async (req, res) => {
//   try {
//     const foundFruits = await Fruit.find({});
//     console.log(foundFruits);
//     res.status(200).render('fruits/Index', {
//       fruits: foundFruits,
//     });
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// // New
// app.get('/fruits/new', (req, res) => {
//   console.log('New controller');
//   res.render('fruits/New');
// });

// // Delete

// // Update

// // Create
// app.post('/fruits', async (req, res) => {
//   try {
//     // if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
//     //   req.body.readyToEat = true; //do some data correction
//     // } else { //if not checked, req.body.readyToEat is undefined
//     //   req.body.readyToEat = false; //do some data correction
//     // }
//     req.body.readyToEat = req.body.readyToEat === 'on';

//     const createdFruit = await Fruit.create(req.body);
//     res.status(201).redirect('/fruits');
//     // res.status(201).send(createdFruit); used it to check
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// // Edit

// // Show
// app.get('/fruits/:id', async (req, res) => {
//   try {
//     const foundFruit = await Fruit.findById(req.params.id)
// //second param of the render method must be an object
// res.render('fruits/Show', {
//   //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
//   fruit: foundFruit,
//   fruit: fruits[req.params.id],
// });

//   } catch (err) {
//     res.status(400).send(err);
//   }});
  
  

// app.listen(PORT, () => {
//   console.log(`Listening on port: ${PORT}`);
// });




































// //W12D2 (also will need fruits.js file under models which was deleted for the code above in //W12D3)

// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3000;
// const fruits = require('./models/fruits');

// const jsxViewEngine = require('jsx-view-engine');

// app.set('view engine', 'jsx');
// app.set('views', './views');
// app.engine('jsx', jsxViewEngine());

// // Middleware;
// app.use((req, res, next) => {
//   console.log('Middleware: I run for all routes, 1');
//   next();
// });
// // By implementing the line below, we now have access to the req.body. Which is the parsed formData from the form request.
// app.use(express.urlencoded({ extended: false }));

// // const middleware = (req, res, next) => {
// //   console.log('Middleware: I run for all routes, 1');
// //   next();
// // };

// // Index
// app.get('/fruits', (req, res) => {
//   console.log('Index controller');
//   res.render('fruits/Index', { fruits });
// });

// // New
// app.get('/fruits/new', (req, res) => {
//   console.log('New controller');
//   res.render('fruits/New');
// });

// // Delete

// // Update

// // Create
// app.post('/fruits', (req, res) => {
//   // console.log('req.body');
// //   if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
// //     req.body.readyToEat = true; //do some data correction
// // } else { //if not checked, req.body.readyToEat is undefined
// //     req.body.readyToEat = false; //do some data correction
// // 

// req.body.readyToEat = req.body.readyToEat === "on";  // same as lines 44-48

// fruits.push(req.body);
// console.log(fruits);
//   // res.send('data received');
//   res.redirect('/fruits') // send the user back to /fruits
// });

// // Edit

// // Show
// app.get('/fruits/:id', (req, res) => {
//   //second param of the render method must be an object
//   res.render('fruits/Show', {
//     //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
//     fruit: fruits[req.params.id],
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Listening on port: ${PORT}`);
// });















// //W12D1 (also will need fruits.js file under models which was deleted for the code above in //W12D3)
// // const express = require('express');
// // const app = express();
// // const PORT = process.env.PORT || 3000;


// // const fruits = [
// //   {
// //       name:'apple',
// //       color: 'red',
// //       readyToEat: true
// //   },
// //   {
// //       name:'pear',
// //       color: 'green',
// //       readyToEat: false
// //   },
// //   {
// //       name:'banana',
// //       color: 'yellow',
// //       readyToEat: true
// //   }
// // ];


// // // Index Route
// // app.get('/fruits', (req, res) => {
// //   res.send(fruits);
// // });

// // //Show Route
// // app.get('/fruits/:id', (req, res) => {
// //   // res.send(fruits[req.params.id]); 
// // });

// // app.listen(PORT, () => {
// //   console.log(`Listening on port: ${PORT}`);
// // });