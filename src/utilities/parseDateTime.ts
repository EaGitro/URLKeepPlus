export default function parseDateTime(datetimeString: string) {
    var year = datetimeString.substring(0, 4);
    var month = datetimeString.substring(4, 6);
    var day = datetimeString.substring(6, 8);
    var hour = datetimeString.substring(8, 10);
    var minute = datetimeString.substring(10, 12);
    var second = datetimeString.substring(12, 14);

    var formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    return formattedDateTime;
}