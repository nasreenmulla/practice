
const chequeSchema = new mongoose.Schema({
    bank: { type: String }, // Add a field for the bank name
    datePosition: { type: Object },
    payeeNamePosition: { type: Object },
    amountInWordsPosition: { type: Object },
    amountPosition: { type: Object },
  });
  
  const Cheque = mongoose.model('Cheque', chequeSchema);
  
  // Get positions for a specific bank
  app.get('/api/cheques/:bank', async (req, res) => {
    const bank = req.params.bank;
    try {
      const cheque = await Cheque.findOne({ bank });
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
  
  // Save positions for a specific bank
  app.post('/api/cheques/:bank', async (req, res) => {
    const bank = req.params.bank;
    try {
      const { datePosition, payeeNamePosition, amountInWordsPosition, amountPosition } = req.body;
      let cheque = await Cheque.findOne({ bank });
      if (!cheque) {
        cheque = new Cheque({
          bank,
          datePosition,
          payeeNamePosition,
          amountInWordsPosition,
          amountPosition,
        });
        await cheque.save();
      } else {
        await Cheque.updateOne({ bank }, {
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
  
  