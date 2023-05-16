import { DataSource } from "typeorm"
import config from "./config"
import logger from "../utils/util.logger"

const AppDataSource = () => {
    const DB = new DataSource({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: config.MYSQL_USER,
        password: config.MYSQL_PASS,
        database: config.MYSQL_DB,
        synchronize: false,
        logging: false,
        entities: ["{src, dist}/models/*.model{.ts,.js}"],
        subscribers: [],
        migrations: [],
    })

    DB.initialize()
        .then(() => {
            logger.info("Data Source has been initialized!")
        })
        .catch((err) => {
            logger.error("Error during Data Source initialization", err)
        })
}

export default AppDataSource
