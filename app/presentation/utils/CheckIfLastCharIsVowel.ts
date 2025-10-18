
export const checkIfLastCharIsVowel = (text: string) => {
    const vowels = ["a", "e", "i", "o", "u"];
    return vowels.includes(text.toLowerCase().charAt(text.length -1))
}