var db = require('./db');

var querySample = {
    all: false,
    contributors: ['Seger Kerri', 'Faraon Conard'],
    regions: ['Pacific Ocean', 'Atlantic Ocean'],
    dates: null,
    fileTypes: ['a'],
    instruments: null,
    samplingRate: null
};

var queryOcean = {
    all: false,
    contributors: ['Kim Lisa', 'Faraon Conard'],
    regions: ['Arctic Ocean'],
    dates: null,
    fileTypes: ['a'],
    instruments: null,
    samplingRate: null
};

var queryAll = {
    all: true,
    contributors: null,
    regions: null,
    dates: null,
    fileTypes: null,
    instruments: null,
    samplingRate: null
};

var querySegerSpecific = {
    all: false,
    contributors: ['Seger Kerri'],
    regions: ['Pacific Ocean', 'Atlantic Ocean'],
    dates: [20140306],
    fileTypes: ['a'],
    instruments: ['Acousonde'],
    samplingRate: [8000]
};

// db.queryMetaData(db.HWSS_DB, db.METADATA, queryAll, function(err, result){
//     if(err) throw err;
//
//     console.log(result);
// });

db.queryMetaData(db.HWSS_DB, db.METADATA, querySegerSpecific, function(err, result){
    if(err) throw err;

    console.log(result);
});

// db.queryMetaData(db.HWSS_DB, db.METADATA, queryOcean, function(err, result){
//     if(err) throw err;
//
//     console.log(result);
// });