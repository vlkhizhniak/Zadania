function randint(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
};

function alphanumeric(len) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // const charactersLength = characters.length;
    let counter = 0;
    while (counter < len) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
      counter += 1;
    }
    return result;
};


function randtable(min, max, len){
    table=[]
    for( let i=0; i<len; i++){
        // console.log(i)
        table.push(randint(min,max))
    };
    return table;
};
module.exports={
    randint: randint,
    alphanumeric: alphanumeric,
    randtable: randtable,
};