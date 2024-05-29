
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 6500;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/cheque', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const chequeSchema = new mongoose.Schema({
  datePosition: { type: Object },
  payeeNamePosition: { type: Object },
  amountInWordsPosition: { type: Object },
  amountPosition: { type: Object },
});

const Cheque = mongoose.model('Cheque', chequeSchema);

app.get('/api/cheques', async (req, res) => {
    try {
      const cheque = await Cheque.findOne();
      if (!cheque) {
        res.json({});
        return;
      }
      res.json({
        datePosition: cheque.datePosition,
        payeeNamePosition: cheque.payeeNamePosition,
        amountInWordsPosition: cheque.amountInWordsPosition,
        amountPosition: cheque.amountPosition,
      });
    } catch (error) {
      console.error('Error fetching cheque data:', error);
      res.status(500).send('Error fetching cheque data');
    }
  });

app.post('/p', async (req, res) => {
  try {
    const { datePosition, payeeNamePosition, amountInWordsPosition, amountPosition } = req.body;
    const cheque = await Cheque.findOne();
    if (!cheque) {
      const newCheque = new Cheque({
        datePosition,
        payeeNamePosition,
        amountInWordsPosition,
        amountPosition,
      });
      await newCheque.save();
    } else {
      await Cheque.updateOne({}, {
        datePosition,
        payeeNamePosition,
        amountInWordsPosition,
        amountPosition,
      });
    }
    res.status(201).send('Cheque data saved successfully');
  } catch (error) {
    console.error('Error saving cheque data:', error);
    res.status(500).send('Error saving cheque data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
