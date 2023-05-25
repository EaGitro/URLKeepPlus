export default async function getStorage_promise(key: null | 'keywordList' | 'groupObj' | 'mainDataObj') {
    if(key==null){
        return await chrome.storage.local.get(key)
    }
    let tmp = await chrome.storage.local.get(key)
    return tmp[key]
}

// let retVal = await getStrage_promise(null);