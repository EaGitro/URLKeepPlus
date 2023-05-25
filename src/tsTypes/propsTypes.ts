type anyObj = {
    [key: string]:anyObj
}
type initObj = {

}
export type StoragedData = {
    keywordList: string[];
    groupObj: anyObj|initObj;
    mainDataObj: {};
}

