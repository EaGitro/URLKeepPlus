export default function getStrage_promise(key: string) {
    console.log("getStrage")
    return new Promise(
        (resolve) => {
            chrome.storage.local.get(key, function (data) { resolve(data) })
        }
    )
}

// let retVal = await getStrage_promise(null);