var reader = require('./read_file.js');

function serviceQuery(req, callback) {
    var dbFindParams = {
        all: false,
        categories: false,
        uniqNames: false,
        uniqRegions: false,
        uniqInstruments: false,
        uniqSamplingRates: false,
        pis: null,
        firstNames: null,
        regions: null,
        dates: null,
        fileTypes: null,
        instruments: null,
        samplingRates: null,
        dateSort: null
    };

    if (req.hasOwnProperty('all')) {
        dbFindParams.all = true;

    }
    else {

        if (req.hasOwnProperty('pi')) {
            dbFindParams.pis = req.pi.split(',');
        }
        if (req.hasOwnProperty('firstName')) {
            dbFindParams.firstNames = req.firstName.split(',');
        }
        if (req.hasOwnProperty('region')) {
            dbFindParams.regions = req.region.split(',');
        }
        if (req.hasOwnProperty('date')) {
            dbFindParams.dates = req.date.split(',');
        }
        if (req.hasOwnProperty('fileType')) {
            dbFindParams.fileTypes = req.fileType.split(',');
        }
        if (req.hasOwnProperty('instrument')) {
            dbFindParams.instruments = req.instrument.split(',');
        }
        if (req.hasOwnProperty('samplingRate')) {
            dbFindParams.samplingRates = req.samplingRate.split(',');
        }
    }
    if(req.hasOwnProperty('categories')) {
        dbFindParams.categories = true;
    }
    else if(req.hasOwnProperty('uniqNames')) {
        dbFindParams.uniqNames = true;
    }
    else if(req.hasOwnProperty('uniqRegions')) {
        dbFindParams.uniqRegions = true;
    }
    else if(req.hasOwnProperty('uniqInstruments')){
        dbFindParams.uniqInstruments = true;
    }
    else if(req.hasOwnProperty('uniqSamplingRates')){
        dbFindParams.uniqSamplingRates = true;
    }
    else if (req.hasOwnProperty('dateSort')) {
        dbFindParams.dateSort = req.dateSort;
    //    TODO handle other dateSort input
    }else{
        dbFindParams.dateSort = "new"
    }

    callback(null, dbFindParams)
}

function serviceResource(req, callback) {
    if(req.hasOwnProperty("schools")){
        reader.getSchool(function(error, data){
            callback(error, data)
        });
    }
}

module.exports = {
    serviceQuery: serviceQuery,
    serviceResource: serviceResource
};