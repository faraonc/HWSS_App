function serviceQuery(req, callback) {
    console.log(req);
    var dbFindParams = {
        all: false,
        pis: null,
        firstNames: null,
        regions: null,
        dates: null,
        fileTypes: null,
        instruments: null,
        samplingRates: null
    };

    if (req.hasOwnProperty('all')) {
        dbFindParams.all = true;

    } else {

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

    console.log(dbFindParams);
    callback(null, dbFindParams)
}


module.exports = {
    serviceQuery: serviceQuery
};