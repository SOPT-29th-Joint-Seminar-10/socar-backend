function getDayFromDate(day) {
    var week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    var dayOfWeek = week[new Date(day).getDay()];
    return dayOfWeek;
}

module.exports = { getDayFromDate };