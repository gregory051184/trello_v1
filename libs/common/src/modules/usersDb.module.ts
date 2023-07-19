import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppDataSourceUsers} from "@app/common/config/typeorm.config";


/*@Module({
    imports: [
        TypeOrmModule.forRootAsync(
            {
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    type: "postgres",
                    schema: "public",
                    database: configService.get("POSTGRES_USERS_DB"),
                    port: +configService.get("POSTGRES_PORT"),
                    host: configService.get("POSTGRES_HOST"),
                    username: configService.get("POSTGRES_USERS"),
                    password: configService.get("POSTGRES_PASSWORD"),
                    logging: configService.get('IS_PROD') === 'false',
                    synchronize: true,
                    autoLoadEntities: true,
                    entities: [User, Role, Token]
                    //entities: [join(process.cwd(), 'dist', 'apps', 'gateway', 'libs', 'common', 'src',
                    //    'entities', '**', '*.entity.{ts, js}')],
                    //migrations: [join(process.cwd(), 'migrations', '**', '*migration.ts')],
                    //migrationsRun: true,
                    //migrationsTableName: configService.get(`USERS_MIGRATIONS`),
                    //cli: {
                    //    migrationsDir: join(process.cwd(), 'dist', 'migrations')
                    //}
                })

            }
        )
    ],

})*/
@Module({
    imports: [
        TypeOrmModule.forRoot(AppDataSourceUsers.options)
    ]
})
export class UsersDbModule {
}

