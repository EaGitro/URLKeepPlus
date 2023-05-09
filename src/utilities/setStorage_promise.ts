export default function setStrage_promise(obj) {
    return new Promise(
        (resolve) => {
            chrome.storage.local.set(obj, function () { resolve() })
        }
    )
}

// await setStrage_promise(obj)