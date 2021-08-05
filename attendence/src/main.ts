import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true,logger: ['error', 'warn'] },);
  const options = new DocumentBuilder()
  .setTitle('Field Force Attendance Service')
  .setDescription('Attendance Service API description')
  .setVersion('1.0')
  .addTag('attendance')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
    'access-token',
  )
  .build();
 const document = SwaggerModule.createDocument(app, options);
 SwaggerModule.setup('api/attendance', app, document);
  await app.listen(3000);

 
}
bootstrap();
