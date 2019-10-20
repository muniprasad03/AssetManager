appRoot.factory("SharedModel", function () {

    var zeroTime = { hours: 0, minutes: 0, seconds: 0, ms: 0 }

    Date.prototype.setTimeSpan = function (timeSpan) {
        this.setHours(timeSpan.hours, timeSpan.minutes, timeSpan.seconds, timeSpan.ms);
        return this;
    }

    Date.prototype.equals = function (date) {
        return this.getTime() == date.getTime();
    }

    // Days in Month
    Date.daysInMonth = function (month, year) {
        var d = new Date(year, month + 1, 0);
        return d.getDate();
    }

    // getDate from string object or date itself 
    Date.getDateObj = function (date) {
        if (Date.valid(date)) {
            if (date instanceof Date) {
                return date;
            }
            else if (typeof date == 'string') {
                return date.stringToDate();
            }
        }
    }
    // check the date is valid means default date in c# 1 jan 1 which is invalid
    Date.valid = function (date) {
        if (date instanceof Date) {
            return date.getFullYear() > 1902; // here we  consider  data should greater than 1902
        }
        else if (typeof date == 'string') {
            return date.stringToDate().getFullYear() > 1902;
        }
    }

    // Adds the neccessary offset such that date is send as date part in GMT time.
    Date.prototype.dateOnlyString = function () {
        return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
    }

    // Converts yyyy-MM-dd format date to current system date time format
    String.prototype.stringToDate = function () {
        var dateParts = this.split('-');
        return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]).setTimeSpan(zeroTime);
    }

    function DateWithZeroTime(args) {
        return args ? new StringToDate(args).setTimeSpan(zeroTime) : new Date().setTimeSpan(zeroTime);
    }

    function StringToDate(dateString) {
        if (typeof (dateString) == "string") {
            //IE9 and below compatability check
            if ((String.prototype.endsWith && !dateString.endsWith('Z')) || dateString[dateString.length - 1] != 'Z') {
                dateString += 'Z';
            }
            return new Date(new Date(dateString).getTime() + new Date().getTimezoneOffset() * 60000);
        }

        else {
            return new Date(dateString);
        }
    }

    return {
        DateWithZeroTime: DateWithZeroTime,
        StringToDate: StringToDate,
    };
});