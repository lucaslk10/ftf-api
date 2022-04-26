import mongoose from 'mongoose'

const EncryptRequestSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

export const EncryptRequestModel = mongoose.model('encrypt-request', EncryptRequestSchema)
