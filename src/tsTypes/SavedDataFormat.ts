type DateStr = string;
export type VersionDigit = ".0"|".1" | ".2" | ".3" | ".4" | ".5" | ".6" | ".7" | ".8" | ".9";
type UrlStr = string;
type KeyStr = `${DateStr} ${VersionDigit} ${UrlStr}`
export type SavedDataFormatProperties ={
        title:string;
        keyword: string;
        group: string[];
        note: string;
        other:{}
}
export type SavedDataFormatKey = KeyStr