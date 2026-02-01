import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: false, // Set to false in production
    logging: true,
};

export const databaseConfig = registerAs('database', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
