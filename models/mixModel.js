const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mixSchema = new Schema({
  mix: [
    {
      soundscape: {
        type: Schema.Types.ObjectId,
        ref: 'Soundscape',
        required: true
      },
      volume: {
        type: Number,
        min: 0,
        max: 1,
        required: true
      },
      isMuted: {
        type: Boolean,
        default: false
      }
    }
  ]
}, { timestamps: true });

mixSchema.statics.makeMix = async function (mixData){
  if (!mixData || !Array.isArray(mixData) || mixData.length === 0) {
    throw new Error('Mix data must be a non-empty array');
  }

  // Create a new mix document
  const mix = await this.create({ mix: mixData });

  return mix
}

module.exports = mongoose.model('Mix', mixSchema);
