import keyword from '../sql/Keyword';


function COMMENT(description: string): string {
    return keyword.COMMENT + ` '${description}'`;
}


export {
    COMMENT
}