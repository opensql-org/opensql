module.exports = {

    toString(object) {
        return JSON.stringify(object)
            // remove quotes from Json keys
            // thank you : https://stackoverflow.com/a/60574755/14741947
            .replace(/("(\\[^]|[^\\"])*"(?!\s*:))|"((\\[^]|[^\\"])*)"(?=\s*:)/g, '$1$3')
            .replace(/[{}]/g, '')
            .replace(/:/g, '=')
            .replace(/,/g, ', ');
    }

}