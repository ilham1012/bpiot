module.exports = {
    HOST: process.env.POSTGRES_HOST || "localhost",
    USER: process.env.POSTGRES_USER || "postgres",
    PASSWORD: process.env.POSTGRES_PASSWORD || "postgres",
    DB: process.env.POSTGRES_DB || "bpiot",
    DIALECT: "postgres",
    PROTOCOL: "postgres",
    PORT: process.env.POSTGRES_PORT || 5432,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}