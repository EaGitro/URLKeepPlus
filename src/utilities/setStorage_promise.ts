export default async function setStrage_promise(obj) {
    return await chrome.storage.local.set(obj)
}

// await setStrage_promise(obj)