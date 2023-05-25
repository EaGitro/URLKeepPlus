export default async function getStrage_promise(key: null | 'keywordList' | 'groupList' | 'mainDataObj') {
    return await chrome.storage.local.get(key)[key]
}

// let retVal = await getStrage_promise(null);