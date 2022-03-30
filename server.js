/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */

const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
console.log(DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log(con.connections);
    console.log('DB connection Successful');
  });

const app = require('./app');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour Must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Park Camper',
  price: 669,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log('Error 💥😁', err);
  });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on Port ${port}...`);
});
