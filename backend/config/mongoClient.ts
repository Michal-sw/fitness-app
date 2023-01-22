import mongoose from "mongoose";

const dbConnData = {
  host: process.env.MONGODB_HOST || '127.0.0.1',
  port: process.env.MONGODB_PORT || 27017,
  database: process.env.MONGODB_DATABASE || 'health_app_db',
  user: process.env.MONGODB_USERNAME || 'user',
  password: process.env.MONGODB_PASSWORD || 'password'
}

const connectToMongoDB = () => new Promise(async (resolve, reject) => {
  let tries = 0;

  while (tries < 5) {
    tries++;
    const connection = await mongoose
      .connect(`mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`)
      .then(() => true)
      .catch(() => false)

    if (connection) {
      return resolve("MongoDB connection successful!")
    } else {
      console.log("Mongo did not respond, trying again...");
    }
  }

  return reject("Error connecting to MongoDB!")
})

export default connectToMongoDB;