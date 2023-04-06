export const UniqueText = (text : string) : string => {
    return text.replace(/[()]/g, "").replace("="," ").replace("Key","").trimLeft()
}