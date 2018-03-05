var mongo = require('mongodb').MongoClient;

const HWSS_DB = 'HWSS';
const METADATA = 'METADATA';

function buildQuery(queryParams) {
    var query = {};
    if (queryParams.pis) {
        query.pi = {
            $in: queryParams.pis
        }
    }
    if (queryParams.firstNames) {
        query.firstName = {
            $in: queryParams.firstNames
        }
    }
    if (queryParams.regions) {
        query.region = {
            $in: queryParams.regions
        }
    }
    if (queryParams.dates) {
        query.date = {
            $in: queryParams.dates
        }
    }
    if (queryParams.fileTypes) {
        query.dataType = {
            $in: queryParams.fileTypes
        }
    }
    if (queryParams.instruments) {
        query.sensorName = {
            $in: queryParams.instruments
        }
    }
    if (queryParams.samplingRates) {
        query.samplingRate = {
            $in: queryParams.samplingRates
        }
    }

    return query;
}

//http://localhost:3009/query/metadata?pi=Seger,Faraon&firstName=Kerri,Conard
function queryMetaData(dbName, dbCollection, queryParams, callback) {
    //READ ONLY ACCESS
    new mongo('mongodb://hwss.documents.azure.com:10255/?ssl=true', {
        auth: {
            user: 'hwss',
            password: 'x3vZOYmtOj8KsIItlu23Hx0zXxx1gOjLIxenhixoUjyEXSCrRIHyxuo9LxHLFsSKEZWoT4DxsJ8O99ajATzCjw=='
        }
    }).connect(function (err, db) {
        try {
            if (err) {
                callback("Unreachable Database", null);
            }else {

                var dbo = db.db(dbName);

                if (queryParams.all) {
                    dbo.collection(dbCollection).find({}).toArray(function (err, result) {
                        callback(err, result);
                    });
                } else {
                    var query = buildQuery(queryParams);
                    if (Object.keys(query).length !== 0 || query.constructor !== Object) {
                        dbo.collection(dbCollection).find(query).toArray(function (err, result) {
                            callback(err, result);
                        });
                    } else {
                        callback("Not Found", null);
                    }
                }
            }
        }
        finally {
            db.close();
        }
    });
}

module.exports = {
    METADATA: METADATA,
    HWSS_DB: HWSS_DB,
    queryMetaData: queryMetaData
};