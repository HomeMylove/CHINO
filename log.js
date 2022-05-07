const log4js = require('log4js');


log4js.configure({
    appenders: {
        console: { type: 'console' },
        file: {
            type: 'file',
            filename: 'all.log',
            layout: {
                type: 'pattern',
                pattern: '%d{yyyyMMdd hh:mm:ss} {%p} %m'
            }
        }
    },
    categories: {
        default: {
            appenders: ['console', 'file'],
            level: 'debug'
        }
    }
})


module.exports = log4js.getLogger();