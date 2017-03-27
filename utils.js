exports.firstLetterCapitalize = str => {
    const firstCapitalize = str.slice(0, 1).toUpperCase();
    const result = firstCapitalize + str.slice(1);
    
    return result;
}

exports.convertToCelcius = temperature => {
    const celcius =  (temperature - 32) * (5 / 9);

    return celcius.toFixed();
}