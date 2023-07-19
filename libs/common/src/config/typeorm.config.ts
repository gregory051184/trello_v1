import {DataSource, DataSourceOptions} from 'typeorm';
import {config} from 'dotenv';
import {join} from 'path'
import {ConfigService} from "@nestjs/config";



config({path: join(process.cwd(), 'env')})
const configService = new ConfigService()

const options = (): DataSourceOptions => {
    const db = configService.get(`POSTGRES_USERS_DB`)
    console.log(configService.get('POSTGRES_PORT'))
    //if (!db) {
    //    throw new Error('No such database!')
    //}
    return {
        username: 'postgres',//configService.get(`POSTGRES_USERS`),
        password: 'postgres',//configService.get(`POSTGRES_PASSWORD`),
        host: 'localhost',//configService.get('POSTGRES_HOST'),
        database: 'users',//configService.get(`POSTGRES_USERS_DB`),
        port: 5432,//configService.get('POSTGRES_PORT'),
        type: 'postgres',
        schema: 'public',
        logging: configService.get('IS_PROD') === 'false',
        synchronize: false,
        //entities: [User, Role, Token],
        entities: [join(process.cwd(), 'dist', 'apps', 'gateway', 'libs', 'common', 'src',
            'entities', '**', '*.entity.{js, ts}')],
        //entities: [join(process.cwd(), 'libs', 'common', 'src', 'entities', '**', '*.entity.{js, ts}')],
        migrations: [join(process.cwd(), 'migrations', '**', '*migration.ts')],
        migrationsRun: true,
        migrationsTableName: configService.get(`MIGRATIONS_USERS`)
    }
}

export const AppDataSourceUsers = new DataSource(options())
//export const AppDataSourceCards = new DataSource(options('CARDS'))
