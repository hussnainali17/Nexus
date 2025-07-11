const CollabRequest = require('../Models/Request.model');
const Investor = require('../Models/Investor.model');
const Entrepreneur = require('../Models/Entrepreneur.model');

module.exports.sendRequest = async (req, res) => {
    
  const { userId, entrepreneurId } = req.body;
  const investorId=await Investor.findOne({'user':userId});
  console.log('Investor ID:', investorId._id);

  try { 
    // // Confirm investor exists
    // const investor = await Investor.findById(investorId);
    // if (!investor) return res.status(404).json({ msg: 'Investor not found' });

    // // Confirm entrepreneur exists
    // const entrepreneur = await Entrepreneur.findById(entrepreneurId);
    // if (!entrepreneur) return res.status(404).json({ msg: 'Entrepreneur not found' });

    // Check for duplicate request
    // const existing = await CollabRequest.findOne({ investorId, entrepreneurId });
    // if (existing) return res.status(400).json({ msg: 'Request already sent' });

    // Create new request

    const request = new CollabRequest({ investorId, entrepreneurId });

    await request.save();

    res.status(201).json({ msg: 'Request sent', request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports.getRequestsForEntrepreneur = async (req, res) => {
     console.log(req.params);
  const { entrepreneurId } = req.params;
// this entrepreneurId is the userId of the entrepreneur
  const entrepreneur = await Entrepreneur.findOne({'user': entrepreneurId });
  console.log('Entrepreneur ID:', entrepreneur);
  

  try {
    //const requests = await CollabRequest.find({ entrepreneurId }).populate('investorId');
   const requests = await CollabRequest.find({ entrepreneurId: entrepreneur._id })
      .populate({
        path: 'investorId',
        populate: {
          path: 'user',
          model: 'User',
          populate: {
            path: 'profile',
            model: 'investor' // Because the user's role is 'investor'
          }
        }
      });

    // console.log('Requests:', requests);
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports.updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid status' });
    }

    const updated = await CollabRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ msg: 'Request not found' });

    res.json({ msg: 'Status updated', updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};


module.exports.getRequestStatus = async (req, res) => {
  console.log('Request params:', req.params);
  const { id } = req.params; // id is entrepreneurId
console.log('Entrepreneur ID:', id);
  try {
    // Find the latest request for this entrepreneur (optionally add investorId if needed)
    const request = await CollabRequest.findOne({ entrepreneurId: id })
    console.log('Request found:', request);
    if (!request) return res.status(404).json({ msg: 'Request not found' });

    res.json({ status: request.status, request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// module.exports.getRequestStatus = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const request = await CollabRequest.findById(id).populate('investorId entrepreneurId');
//     if (!request) return res.status(404).json({ msg: 'Request not found' });

//     res.json({ status: request.status, request });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server Error' });
//   }
// };