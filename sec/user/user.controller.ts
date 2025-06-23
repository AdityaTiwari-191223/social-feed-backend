import { Controller, Get, Post, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/follow')
  followUser(@Param('id') id: string, @Req() req) {
    return this.userService.followUser(req.user.userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/unfollow')
  unfollowUser(@Param('id') id: string, @Req() req) {
    return this.userService.unfollowUser(req.user.userId, id);
  }
}