import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { TimelineModule } from './timeline/timeline.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/social-feed-app'),
    AuthModule,
    UserModule,
    PostModule,
    TimelineModule,
  ],
})
export class AppModule {}