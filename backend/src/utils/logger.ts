import { createLogger, format, transports } from "winston"

const { combine, timestamp, label, printf } = format

const myFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
})

const logger = createLogger({
  // format: combine(label({ label: "Emaily" }), timestamp(), myFormat),
  transports: [
    new transports.Console({ level: process.env.NODE_ENV === "production" ? "error" : "debug" }),
    new transports.File({ filename: "debug.log", level: "debug" }),
  ],
})

if (process.env.NODE_ENV !== "production") {
  logger.debug("Logging initialized at debug level")
}

export default logger
