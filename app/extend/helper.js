'use strict';
const crypto = require('crypto');
const moment = require('moment');
const fs = require('fs');

// md5
exports.md5 = str => crypto.createHash('md5').update(str).digest('hex');

exports.reducedFilter = (data, keys, fn) =>
    data.filter(fn).map(el =>
        keys.reduce((acc, key) => {
            acc[key] = el[key];
            return acc;
        }, {})
    );

exports.randomNum = (len = 10) => Math.random().toString().substr(2).slice(0, len);

exports.dateFormat = (format = 'YYYYMMDD', date = new Date()) => moment(date).format(format);

exports.mkdir = (path) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
    return path;
}

