import mongoose from "mongoose";

export async function connectdb() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("mongodb connected");
    });
    connection.on("error", (err) => {
      console.log(
        "mongodb connection error,please make sure db is up and runnning" + err
      );
      process.exit(1);
    });
  } catch (error) {
    console.log("something went wrong in connection to DB");
    console.log(error);
  }
}
