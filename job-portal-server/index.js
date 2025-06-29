const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const app = express();
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// verify cookies token
// const verifyToken = (req, res, next) => {
//   const token = req?.cookies?.token;
//   console.log('cookies in meddileware', token);
//   // verify
//   if (!token) {
//     return res.status(401).send({ message: 'Unauthorized' });
//   }
//   jwt.verify(token, process.env.JWT_ACCESS_SECRET, (error, decoded) => {
//     if (error) {
//       return res.status(401).send({ message:'Unauthorized'});
//   }
//   console.log(decoded);
//   req.decoded=decoded;
//   });
// next();
// }

// verify firebase token

// const verifyFirebaseToken= async(req,res,next)=>{
//   const authHeader=req.headers?.authorization;
//   const token=authHeader.split(' ')[1]
//   if(!token){
//     return res.status(401).send({message:'Unathorized access'})
//   }
//   const userInfo=await admin.auth().verifyIdToken(token)
//   console.log('inside the token',userInfo)
//   req.tokenEmail=userInfo.email;
//   next()
// }
// firebase admin key 

// firebase admain

// var admin = require("firebase-admin");

// var serviceAccount = require("./firebase-admin-key.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g02ycwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
//  Module 61 firebase admin..
const admin = require("firebase-admin");
const decoded = Buffer.from(process.env.FB_SERVICE_KEY,'base64'.toString('utf8'))
const serviceAccount = JSON.parse(decoded)
// const serviceAccount = require("./firebase-admin-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//  Module 61 firebase verify..(middaleWar)
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: "Forbedden access" })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = await admin.auth().verifyIdToken(token)
    req.decoded = decoded
    console.log(decoded)
    next()
  }
  catch {
    return res.status(403).send({ message: "Forbedden access" })
  }
}
// verifyEmail middaleWar
const verifyEmail = (req, res, next) => {
  if (req.query.email !== req.decoded.email) {
    return res.status(403).send({ message: "Unauthorized" })
  }
  next()
}
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const jodsCollection = client.db("jobPortal").collection('jobs')

    const applicationCollection = client.db("jobPortal").collection('applications')
    // JWT token related API...
    // app.post('/jwt', async (req, res) => {
    //   const userData = req.body;
    //   const token = jwt.sign(userData, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' })
    //   // set token in cookies..
    //   res.cookie('token', token, {
    //     httpOnly: true,
    //     secure: false
    //   });

    //   res.send({ success: true })
    // })
    // Jobs API
    app.get('/jobs', async (req, res) => {
      const email = req.query.email;
      const query = {}
      if (email) {
        query.hr_email = email;
      }
      const result = await jodsCollection.find(query).toArray()
      res.send(result)
    })
    // verifyFirebaseToken...
    app.get('/jobs/applications', verifyFirebaseToken, verifyEmail, async (req, res) => {
      const email = req.query.email;
      // if(req.tokenEmail !== email){
      //   return res.status(403).send({message:'Forbidden access'})
      // }
      const query = { hr_email: email }
      const jobs = await jodsCollection.find(query).toArray()
      // not right way
      for (const job of jobs) {
        const applicationQuery = { jobId: job._id.toString() };
        const applicationCount = await applicationCollection.countDocuments(applicationQuery)
        job.application_count = applicationCount
      }
      res.send(jobs)
    })
    app.get('/jobs/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jodsCollection.findOne(query);
      res.send(result);
    })
    app.post('/jobs', async (req, res) => {
      const newJobs = req.body;
      console.log(newJobs)
      const result = await jodsCollection.insertOne(newJobs);
      res.send(result);
    })
    // job application API
    // verifyToken....
    app.get('/applications', verifyFirebaseToken, verifyEmail, async (req, res) => {
      const email = req.query.email;
      // console.log('inside application API',req.cookies)
      // if(email !== req.decoded.email){
      //   return res.status(403).send({message:'Forbidden'})
      // }
      const query = {
        applicant: email
      }
      const result = await applicationCollection.find(query).toArray();
      // bad way....
      for (const application of result) {
        const jobId = application.jobId;
        const jobquery = {_id: new ObjectId(jobId)};
        const job = await jodsCollection.findOne(jobquery);
        application.company = job.company
        application.title = job.title
        application.company_logo = job.company_logo
      }
      res.send(result)
    })
    // get for count application.
    app.get('/applications/job/:job_id', async (req, res) => {
      const job_id = req.params.job_id;
      console.log(job_id);
      const query = { jobId: job_id };
      const result = await applicationCollection.find(query).toArray();
      res.send(result);
    })
    app.post('/applications', async (req, res) => {
      const application = req.body;
      console.log(application)
      const result = await applicationCollection.insertOne(application);
      res.send(result)
    })
    app.patch('/applications/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: req.body.status
        }
      }
      const result = await applicationCollection.updateOne(filter, updateDoc);
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment.You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('job prortal is ready to work');
});
app.listen(port, () => {
  console.log(`Carrear code server is running on :${port}`);
});
// require('crypto').randomBytes(64).toString('hex')
