"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', '..', 'public'));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: ['http://localhost:3001', 'http://localhost:3000', 'http://localhost:3010'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Melofy')
        .setDescription('The Melofy API description')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Melofy')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document, {
        customCssUrl: `/swagger.dark.css`,
        customSiteTitle: 'Melofy API Docs',
        swaggerOptions: {
            filter: true,
        },
    });
    await app.listen(process.env.PORT ?? 3010);
}
bootstrap();
//# sourceMappingURL=main.js.map