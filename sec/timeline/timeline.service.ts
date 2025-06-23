import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../post/schemas/post.schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class TimelineService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async getTimeline(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const ids = [userId, ...user.following.map((id: Types.ObjectId) => id.toString())];

    return this.postModel.find({ user: { $in: ids } })
      .sort({ createdAt: -1 })
      .populate('user', 'username')
      .exec();
  }
}
