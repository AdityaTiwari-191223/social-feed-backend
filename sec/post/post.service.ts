import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async createPost(userId: string, caption: string, image?: string) {
    const newPost = new this.postModel({
      user: userId,
      caption,
      image,
    });
    return newPost.save();
  }

  async getMyPosts(userId: string) {
    return this.postModel.find({ user: userId }).sort({ createdAt: -1 }).exec();
  }

  async likePost(postId: string, userId: string) {
    const post = await this.postModel.findById(postId);
    if (!post) throw new NotFoundException('Post not found');

    const index = post.likes.findIndex(id => id.equals(userId));
    if (index >= 0) {
      post.likes.splice(index, 1); // unlike
    } else {
      post.likes.push(new Types.ObjectId(userId)); // like
    }

    await post.save();
    return { message: 'Updated likes', likes: post.likes.length };
  }

  async deletePost(postId: string, userId: string) {
    const post = await this.postModel.findById(postId);
    if (!post) throw new NotFoundException('Post not found');
    if (!post.user.equals(userId)) throw new ForbiddenException('Not your post');
    await post.deleteOne();
    return { message: 'Post deleted' };
  }
}