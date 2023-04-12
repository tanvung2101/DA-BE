const app = require('./app');
const cloudinary = require('cloudinary');
const connectDatabase = require('./config/database')
const cors = require('cors');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,        
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// Handling uncaught Exception
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception`);

    process.exit(1)
})

// config 
// dotenv.config({path:"backend/config/config.env"})

// Connecting to database
connectDatabase()
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// })
cloudinary.config({
    cloud_name: "dk04acfvs",
    api_key: "547271464687361",
    api_secret: "HvQjTQ-3wRyIZgssYq13kvOX5AA"
  });


const server = app.listen(process.env.PORT, () =>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1)
    })
})