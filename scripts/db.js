var mongo = require('mongodb').MongoClient;

const HWSS_DB = 'HWSS';
const METADATA = 'METADATA';


function extractContributors(query, contributors) {
    console.log("--------------extractContributors executing--------------");
    var pi = [];
    var firstName = [];
    for (var i = 0; i < contributors.length; i++) {
        var temp = contributors[i].split(' ');
        // last name is index 0, first name is index 1
        pi.push(temp[0]);
        firstName.push(temp[1])
    }

    query.pi = {
        $in: pi
    };

    query.firstName = {
        $in: firstName
    };
}

function buildQuery(queryParams) {
    console.log("--------------buildQuery executing--------------");
    var query = {};
    if (queryParams.pis) {
        console.log("--------------extract pis executing--------------");
        query.pi = {
            $in: queryParams.pis
        }
    }
    if (queryParams.firstNames) {
        console.log("--------------extract firstNames executing--------------");
        query.firstName = {
            $in: queryParams.firstNames
        }
    }
    if (queryParams.regions) {
        console.log("--------------extracting regions executing--------------");
        query.region = {
            $in: queryParams.regions
        }
    }
    if (queryParams.dates) {
        console.log("--------------extracting dates executing--------------");
        query.date = {
            $in: queryParams.dates
        }
    }
    if (queryParams.fileTypes) {
        console.log("--------------extracting fileTypes executing--------------");
        query.dataType = {
            $in: queryParams.fileTypes
        }
    }
    if (queryParams.instruments) {
        console.log("--------------extracting instruments executing--------------");
        query.sensorName = {
            $in: queryParams.instruments
        }
    }
    if (queryParams.samplingRates) {
        console.log("--------------extracting samplingRate executing--------------");
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
        if (err) throw err;
        try {
            var dbo = db.db(dbName);

            if (queryParams.all) {
                dbo.collection(dbCollection).find({}).toArray(function (err, result) {
                    callback(err, result);
                });
            } else {
                var query = buildQuery(queryParams);
                console.log(query);
                dbo.collection(dbCollection).find(query).toArray(function (err, result) {
                    callback(err, result);
                });
            }
        }
        finally {
            db.close()
        }
    });
}


module.exports = {
    METADATA: METADATA,
    HWSS_DB: HWSS_DB,
    queryMetaData: queryMetaData
};

