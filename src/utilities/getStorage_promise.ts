export default async function getStrage_promise(key: string) {
    return await chrome.storage.local.get(key)
}

// let retVal = await getStrage_promise(null);