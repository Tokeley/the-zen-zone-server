const Mix = require('../models/mixModel');
const mongoose = require('mongoose');

// Get mix by ID
const getMix = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid Mix ID' + id});
  }

  try {
    const mix = await Mix.findById(id).populate('mix.soundscape');

    if (!mix) {
      return res.status(404).json({ error: 'Mix not found' });
    }

    res.status(200).json(mix);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching mix' });
  }
};

module.exports = {
  getMix,
};