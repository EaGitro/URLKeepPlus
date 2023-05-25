type Param = {
    "keywordList": string[]
} | {
    "groupObj": {}
} | {
    "mainDataObj": {}
}
export default async function setStorage_promise(obj: Param) {
    return await chrome.storage.local.set(obj)
}

// await setStrage_promise(obj)