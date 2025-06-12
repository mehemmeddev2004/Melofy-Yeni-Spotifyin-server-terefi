import { Module, Ip } from '@nestjs/common';
import { Request } from 'express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { ClsModule } from 'nestjs-cls';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AdminModule } from './modules/admin/admin.module';
import { FirebaseModule } from './shared/libs/firebase/firebase.module';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/users/auth/auth.module';
import { UploadModule } from './modules/upload/upload.module';
import { CategoryModule } from './modules/category/category.module';
import { ArtistEntity } from './database/artists.entity';
import { ArtistsModule } from './modules/artists/artists.module';
import { SongModule } from './modules/artists/song/song.module';
import { PlaylistModule } from './modules/artists/playlist/playlist.module';
import { AlbumModule } from './modules/artists/album/album.module';
import { profileModule } from './modules/users/profile/profile.module';
import { radioModule } from './modules/artists/song/radio/radio.module';
import { ForgetPasswordModule } from './modules/users/forgetpassword/forgetpassword.module';
import { CommentModule } from './modules/users/comment/comment.module';






@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true
      },
      interceptor: { mount: true },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
        synchronize: true,
        logging: true,
      }),
    }),
      MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          transport: {
            service: 'gmail',
            host: config.get('SMTP_HOST'),
            port: config.get('SMTP_PORT'),
            secure: config.get('SMTP_SECURE'),
            auth: {
              user: config.get('SMTP_USER'),
              pass: config.get('SMTP_PASS'),
            },
          },
          defaults: {
            from: `"melofy" <${config.get('SMTP_FROM')}>`,
          },
          template: {
            dir: __dirname + '/templates',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get('JWT_SECRET'),
          signOptions: { expiresIn: '1d' },
        };
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

   AdminModule,
   FirebaseModule,
   UserModule,
   ForgetPasswordModule,
   CommentModule,
   profileModule,
   AuthModule,
   UploadModule,
   CategoryModule,
   ArtistsModule,
   SongModule,
   radioModule,
   PlaylistModule,
   AlbumModule,  
  
  ],
  
  controllers: [AppController],
  providers: [
    AppService,

  ],
})
export class AppModule {}