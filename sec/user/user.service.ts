import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().select('-password').exec();
  }

  async followUser(currentUserId: string, targetUserId: string) {
    if (currentUserId === targetUserId) {
      throw new BadRequestException('You cannot follow yourself');
    }

    const currentUser = await this.userModel.findById(currentUserId);
    const targetUser = await this.userModel.findById(targetUserId);

    if (!currentUser || !targetUser) throw new NotFoundException('User not found');

    if (currentUser.following.includes(targetUser._id)) {
      throw new BadRequestException('Already following this user');
    }

    currentUser.following.push(targetUser._id);
    targetUser.followers.push(currentUser._id);

    await currentUser.save();
    await targetUser.save();

    return { message: 'Followed successfully' };
  }

  async unfollowUser(currentUserId: string, targetUserId: string) {
    const currentUser = await this.userModel.findById(currentUserId);
    const targetUser = await this.userModel.findById(targetUserId);

    if (!currentUser || !targetUser) throw new NotFoundException('User not found');

    currentUser.following = currentUser.following.filter(id => !id.equals(targetUser._id));
    targetUser.followers = targetUser.followers.filter(id => !id.equals(currentUser._id));

    await currentUser.save();
    await targetUser.save();

    return { message: 'Unfollowed successfully' };
  }
}