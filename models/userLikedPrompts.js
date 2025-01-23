import mongoose, { Schema, model, models } from 'mongoose';

const UserLikedPromptsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likedPrompts: [{
    type: Schema.Types.ObjectId,
    ref: 'Prompt',
    
  }],
});

const UserLikedPrompts = models.UserLikedPrompts || model('UserLikedPrompts', UserLikedPromptsSchema);

export default UserLikedPrompts;
