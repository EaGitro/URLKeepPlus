type anyObj = {
    [key: string]:anyObj
}
export type StoragedData = {
    keywordList: Set<string>,
    groupList: anyObj
    mainDataObj: {}
}

