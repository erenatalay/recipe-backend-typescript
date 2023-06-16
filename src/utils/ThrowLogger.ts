
const ThrowLogger = (Error,logger) => {
    const result = Error
    logger.log({
        level: "info",
        message: result
      })

    return result
  }
  


export default ThrowLogger