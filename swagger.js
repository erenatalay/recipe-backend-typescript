const swaggerAutogen = require('swagger-autogen')()
const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes/user.ts','./src/routes/index.ts']

swaggerAutogen(outputFile, endpointsFiles)