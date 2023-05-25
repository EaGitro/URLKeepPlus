export default function formatDateObjForDataKey(rawDate: Date){
    var year = rawDate.getFullYear();
    var month = String(rawDate.getMonth() + 1).padStart(2, '0');
    var day = String(rawDate.getDate()).padStart(2, '0');
    var hours = String(rawDate.getHours()).padStart(2, '0');
    var minutes = String(rawDate.getMinutes()).padStart(2, '0');
    var seconds = String(rawDate.getSeconds()).padStart(2, '0');
  
    var formattedDate = year + month + day + hours + minutes + seconds;
    return formattedDate;
  }
  