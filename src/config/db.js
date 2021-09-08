const cassandra = require("cassandra-driver")

const client = new cassandra.Client({
    contactPoints: ["172.17.0.2"],
    protocolOptions: { port: 9042 },
    localDataCenter: "datacenter1",
    keyspace: "api_cas"
})

module.exports = client