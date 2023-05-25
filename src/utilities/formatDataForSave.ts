import { SavedDataFormat } from "../tsTypes/SavedDataFormat";

export default function formatDataForSave(dateStr: string, shortenedUrl: string, title: string, keyword: string, group: string[], note: string, other: {}): SavedDataFormat {

    let version = ".0"
    let key = `${dateStr} ${version} ${shortenedUrl}`
    return {
        [key]: {
            title: title,
            keyword: keyword,
            group: group,
            note: note,
            other: other
        }
    }
}