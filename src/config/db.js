const cassandra = require("cassandra-driver")
require("dotenv").config()

const client = new cassandra.Client({
    contactPoints: [process.env.CONTAINERIPADDRESS],
    protocolOptions: { port: 9042 },
    localDataCenter: "datacenter1",
    keyspace: "api_cas"
})

module.exports = client