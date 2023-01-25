const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "63bef98ef76fbcdf83d5dfbc",
      location: `${cities[random1000].city}, ${cities[random1000].state}}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi voluptatibus obcaecati dignissimos cum! Aut assumenda fugit quidem qui recusandae eligendi aliquam aperiam dicta similique, quo consequatur quae atque ab esse?",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dcvo0dqyt/image/upload/v1674066540/YelpCamp/yoqa0ls1yd6gtg6afky5.png',
          filename: 'YelpCamp/yoqa0ls1yd6gtg6afky5',
        },
        {
          url: 'https://res.cloudinary.com/dcvo0dqyt/image/upload/v1674066540/YelpCamp/x7dmpp6whvoev421l4ui.png',
          filename: 'YelpCamp/x7dmpp6whvoev421l4ui',
        }
      ]
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
