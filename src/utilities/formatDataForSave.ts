import { SavedDataFormatProperties, SavedDataFormatKey, VersionDigit } from "../tsTypes/SavedDataFormat";

export default function formatDataForSave(dateStr: string, shortenedUrl: string, title: string, keyword: string, group: string[], note: string, other: {}): [SavedDataFormatKey,SavedDataFormatProperties] {

    let version:VersionDigit = ".0"
    let key:SavedDataFormatKey = `${dateStr} ${version} ${shortenedUrl}`
    return [key,
        {
            title: title,
            keyword: keyword,
            group: group,
            note: note,
            other: other
        }
    ]

}