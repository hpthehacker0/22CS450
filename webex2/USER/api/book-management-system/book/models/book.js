const mongoose = require('mongoose');
const { Schema } = mongoose;

const urlRegularExp =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const bookSchema = new Schema(
  {
    bookName: { type: String, required: true, unique: true }, // String is shorthand for {type: String}
    author: { type: String, required: true },
    noOfBook: { type: Number, required: false },
    publisher: { type: String, required: true },
    url: {
      type: String,
      required: false,
      validate: {
        validator: function (v) {
          return urlRegularExp.test(v);
        },
        message: (props) => `${props.value} is not a valid url!`
      }
    },
    // releaseDate: {
    //   type: Date
    // },
    price: { type: Number, required: true }
  },
  { timestamps: true }
);

const Book = mongoose.model('book', bookSchema, 'books');

module.exports = Book;
