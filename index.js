const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
require('dotenv').config()
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;


app.use(cors({
  origin:[
    'http://localhost:5000',
    'http://localhost:5173',
    'https://hasibul-porfolio-server.vercel.app',
    'https://hasibul-portfolio-dac39.web.app'
  ]
}))
// Enable CORS for all origins
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'https://travelsite-a2d59.web.app');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });
// app.use(cors({ 
//   origin: ["http://localhost:5173", "https://travelsite-a2d59.web.app", ]
// }))
app.use(express.json())


console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.75ieoxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// const db = client.db("spotDB");
// the line below creates a collection named 'spot' in the database 
// const spotData = db.collection('spot')  

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();


    const projectsCollection = client.db("Hasibul").collection('Projects');


    app.post('/projects', async (req, res) => {
      const projectInfo = req.body
      console.log(projectInfo)
      const result = await projectsCollection.insertOne(projectInfo)
      res.send(result)
    })

    app.get('/projects', async(req, res)=> {
      const result = await projectsCollection.find().toArray()
      res.send(result)
    })








    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




// middleware
app.use(cors());
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`travel site is running on port ${port}`)
})