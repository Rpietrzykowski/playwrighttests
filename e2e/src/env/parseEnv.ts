export const env = (key: string): string => {
    const value = process.env[key];

    if(!value){
        throw Error(`No enviroment variable found for ${key}`);
    }

    return value;
}