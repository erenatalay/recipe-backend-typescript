  
import { Client } from "@elastic/elasticsearch";
const client = new Client({
    node: process.env.ELASTIC_HOST,
    maxRetries: 5,
    requestTimeout: 60000,
    });

export default client