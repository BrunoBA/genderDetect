const genders = require('./gender');
const argv = require('yargs').alias('n', 'name').demandOption('name').argv;
const name = argv.name;

function getGender (name) {
    const prefix = reverseString(name.slice(0, name.length - 1).toLocaleLowerCase());
    const lastWord = name.slice(-1);
    const defaultSetting = getWordSetting(lastWord);

    if (defaultSetting.qtd_itens != 0) {
        let gen = defaultSetting.exceptions.reduce((prevVal, elem, index) => {
            if (elem === prefix || isPrefix(prefix, elem, lastWord)) {
                return true;
            }
            return prevVal;
        }, null);
        return (gen) ? opsite(defaultSetting.default) : defaultSetting.default;
    } else {
        return defaultSetting.default;
    }    
}

function opsite (gender) {
    if (gender == 1)
        return 0;
    else 
        return 1;
}

function getWordSetting (lastWord) {
    return genders.reduce((prevVal, elem, index) => {
        if (elem.word == lastWord) {
            return elem;
        }
        return prevVal;
    },null);
}

function isPrefix(str, word, lastWord) {
    if (word.indexOf('|') != -1) {
        word = word.replace('|', lastWord);
    }

    return str.lastIndexOf(word, 0) === 0;
}

function reverseString(str) {
    array = str.split("");
    array.reverse();
    str = array.join('');
    return str;
}

function translateResponse (name, paranm) {
    if (paranm == 0) {
        return `${name} - FEMININO`;
    } else {
        return `${name} - MASCULINO`;
    }
}

console.log(translateResponse(name, getGender(name)));
