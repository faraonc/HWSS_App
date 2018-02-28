var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://hwss:8JcTzimkK9isNVmktnVcLhKbAqVG5dGlm4Qwu1FqrBOzr1oniaUCnmdGdMk1ozlZE99JkuE5DVGXFzNQIX2xvg==@hwss.documents.azure.com:10255/?ssl=true", function (err, db) {
    db.close();
});