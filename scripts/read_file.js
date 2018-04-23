const fs = require('fs');

function getSchool(callback) {
    fs.readFile('resources/us_schools.csv', 'utf8', function(error, data) {
        if(error) {
            callback(error, null);
        }
        else {
            let data2 = data.toString().split('\n');
            let length = data2.length;
            var schools = [];
            for(var i = 0; i < length; i++) {
                schools.push(data2[i].split(',')[1].replace(/["']/g, ""));
            }
            callback(null, schools.sort());
        }
    });
}


module.exports = {
    getSchool: getSchool
};