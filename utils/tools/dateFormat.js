/**
 * @function Format the date in the given format
 * @param date {Date} The default is the current time
 * @param format {string}Output format "YY-MM-DD hh:mm:ss"
 */
module.exports = (date = new Date(), format = "YY-MM-DD hh:mm:ss") => {
    const formatList = ["YY", "MM", "DD", "hh", "mm", "ss"];
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const dateObj = {
        "YY": year,
        "MM": month < 10 ? '0' + month : month,
        "DD": day < 10 ? '0' + day : day,
        "hh": hours < 10 ? '0' + hours : hours,
        "mm": minutes < 10 ? '0' + minutes : minutes,
        "ss": seconds < 10 ? '0' + seconds : seconds
    }
    for (let i = 0; i < formatList.length; i++) {
        format = format.replace(formatList[i], dateObj[formatList[i]]);
    }
    return format;
}