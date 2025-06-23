import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../post/schemas/post.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { TimelineService } from './timeline.service';
import { TimelineController } from './timeline.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: User.name, schema: UserSchema },
    ])
  ],
  controllers: [TimelineController],
  providers: [TimelineService],
})
export class TimelineModule {}