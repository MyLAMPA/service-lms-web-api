
const allowed = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z',

    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    
    '1', '2', '3', '4', '5', '6', '7', '8', '9',
    
    '_', '-',
]

const replacements = {
    'á': 'a', 'Á': 'A',
    'é': 'e', 'É': 'E',
    'í': 'i', 'Í': 'I',
    'ó': 'o', 'Ó': 'O',
    'ú': 'u', 'Ú': 'U',
    'ů': 'u', 'Ů': 'U',
    'ý': 'y', 'Ý': 'Y',
    
    'č': 'c', 'Č': 'C',
    'ď': 'd', 'Ď': 'D',
    'ě': 'e', 'Ě': 'E',
    'ľ': 'l', 'Ľ': 'L',
    'ř': 'r', 'Ř': 'R',
    'š': 's', 'Š': 'S',
    'ť': 't', 'Ť': 'T',
    'ž': 'z', 'Ž': 'Z'
}

export const normalizeString = (
    input: any,
    spaceReplacement: string = '_',
    additionalAllowed: string[] = [],
): string => {
    input = String(input)
    const output = ['']

    for (const i in input) {
        if (input[i] == ' ') {
            output.push(spaceReplacement || '_')
        } else if ((<any>allowed).includes(input[i])
            || (<any>additionalAllowed).includes(input[i])) {
            output.push(String(input[i]))
        } else if (replacements[input[i]]) {
            output.push(replacements[input[i]])
        } else {
            output.push('')
        }
    }

    return output.join('').toString()
}