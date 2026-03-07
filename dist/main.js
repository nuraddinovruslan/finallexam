"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('🔍 HeadHunter API')
        .setDescription(`
## HeadHunter - Professional Job Platform Backend

### 🚀 Ishlatish tartibi:
1. **Register** yoki **Login** qiling (/api/v1/auth/register yoki /api/v1/auth/login)
2. Javobdan **access_token** ni nusxalang
3. Yuqoridagi **Authorize** tugmasini bosing
4. \`Bearer <token>\` emas, faqat **token** ni kiriting
5. Endi barcha himoyalangan endpointlar ishlaydi!

### 👥 Rollar:
- **jobseeker** - Ish izlovchi (rezyume yaratadi, vakansiyaga ariza yuboradi)
- **employer** - Ish beruvchi (kompaniya va vakansiya yaratadi)  
- **admin** - Administrator (hamma narsani boshqaradi)
      `)
        .setVersion('1.0')
        .setContact('HeadHunter Team', 'https://hh.uz', 'support@hh.uz')
        .addServer('http://localhost:3000', 'Development Server')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'JWT tokenni kiriting (Bearer so\'zsiz, faqat token)',
        in: 'header',
    }, 'JWT')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            docExpansion: 'none',
            filter: true,
            showRequestDuration: true,
            tryItOutEnabled: true,
            defaultModelsExpandDepth: 1,
        },
        customSiteTitle: 'HeadHunter API Docs',
        customCss: `
      .swagger-ui .topbar { background-color: #cc0000; }
      .swagger-ui .topbar-wrapper img { display: none; }
      .swagger-ui .topbar-wrapper::before { 
        content: '🔍 HeadHunter API'; 
        color: white; 
        font-size: 20px; 
        font-weight: bold;
      }
    `,
    });
    const port = parseInt(process.env.PORT) || 3000;
    await app.listen(port);
    console.log('\n========================================');
    console.log(`🚀 Server:       http://localhost:${port}`);
    console.log(`📄 Swagger UI:   http://localhost:${port}/docs`);
    console.log(`🔗 API Base:     http://localhost:${port}/api/v1`);
    console.log('========================================');
    console.log('📌 Tezkor test:');
    console.log(`   POST http://localhost:${port}/api/v1/auth/register`);
    console.log(`   POST http://localhost:${port}/api/v1/auth/login`);
    console.log('========================================\n');
}
bootstrap();
//# sourceMappingURL=main.js.map