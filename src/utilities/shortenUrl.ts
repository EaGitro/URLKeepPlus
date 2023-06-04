export default function shortenUrl(urlStr: string){
    let str = decodeURI(urlStr);
    return str.replace(/ /g,"%20")
}