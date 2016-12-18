export function extractFunctionCode(func) {
    let source = func.toString();
    let functionBody = source.substring(source.indexOf('{') + 1, source.lastIndexOf('}'));
    return functionBody;
}

export function substituteImports(source) {
    return source.replace(/(?:.)%((?:require|import)[^%]+)%(?:.)/g, '$1');
}
