import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Req() req, @Body() body: { caption: string, image?: string }) {
    return this.postService.createPost(req.user.userId, body.caption, body.image);
  }

  @Get('mine')
  getMyPosts(@Req() req) {
    return this.postService.getMyPosts(req.user.userId);
  }

  @Post(':id/like')
  likePost(@Param('id') id: string, @Req() req) {
    return this.postService.likePost(id, req.user.userId);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string, @Req() req) {
    return this.postService.deletePost(id, req.user.userId);
  }
}