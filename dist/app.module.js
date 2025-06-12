"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const path_1 = require("path");
const jwt_1 = require("@nestjs/jwt");
const nestjs_cls_1 = require("nestjs-cls");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const mailer_1 = require("@nestjs-modules/mailer");
const serve_static_1 = require("@nestjs/serve-static");
const admin_module_1 = require("./modules/admin/admin.module");
const firebase_module_1 = require("./shared/libs/firebase/firebase.module");
const user_module_1 = require("./modules/users/user.module");
const auth_module_1 = require("./modules/users/auth/auth.module");
const upload_module_1 = require("./modules/upload/upload.module");
const category_module_1 = require("./modules/category/category.module");
const artists_module_1 = require("./modules/artists/artists.module");
const song_module_1 = require("./modules/artists/song/song.module");
const playlist_module_1 = require("./modules/artists/playlist/playlist.module");
const album_module_1 = require("./modules/artists/album/album.module");
const profile_module_1 = require("./modules/users/profile/profile.module");
const radio_module_1 = require("./modules/artists/song/radio/radio.module");
const forgetpassword_module_1 = require("./modules/users/forgetpassword/forgetpassword.module");
const comment_module_1 = require("./modules/users/comment/comment.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            nestjs_cls_1.ClsModule.forRoot({
                global: true,
                middleware: {
                    mount: true
                },
                interceptor: { mount: true },
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    host: config.get('DB_HOST'),
                    port: +config.get('DB_PORT'),
                    username: config.get('DB_USERNAME'),
                    password: config.get('DB_PASSWORD'),
                    database: config.get('DB_DATABASE'),
                    entities: [(0, path_1.join)(__dirname, '**', '*.entity{.ts,.js}')],
                    synchronize: true,
                    logging: true,
                }),
            }),
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory(config) {
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
                            adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                            options: {
                                strict: true,
                            },
                        },
                    };
                },
            }),
            jwt_1.JwtModule.registerAsync({
                global: true,
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory(config) {
                    return {
                        secret: config.get('JWT_SECRET'),
                        signOptions: { expiresIn: '1d' },
                    };
                },
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
            admin_module_1.AdminModule,
            firebase_module_1.FirebaseModule,
            user_module_1.UserModule,
            forgetpassword_module_1.ForgetPasswordModule,
            comment_module_1.CommentModule,
            profile_module_1.profileModule,
            auth_module_1.AuthModule,
            upload_module_1.UploadModule,
            category_module_1.CategoryModule,
            artists_module_1.ArtistsModule,
            song_module_1.SongModule,
            radio_module_1.radioModule,
            playlist_module_1.PlaylistModule,
            album_module_1.AlbumModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map