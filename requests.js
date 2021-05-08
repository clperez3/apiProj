
export {getRecipeByTime, getNumTrivia, getDoggo,getRecipeByID, getTrivia}
async function getRecipeByTime(time){
    let request = await axios({
        url:'https://api.spoonacular.com/recipes/complexSearch',
        method: 'get',
        params: {
            apiKey: '0bac70aad4b04a21a8195cfc8c0207e7',
            maxReadyTime: time,
        },
    })
    return request.data;
}

async function getRecipeByID(id){
    let request = await axios({
        url:'https://api.spoonacular.com/recipes/' + id + '/information',
        method: 'get',
        params: {
            apiKey: '0bac70aad4b04a21a8195cfc8c0207e7',
            includeNutrition: 'false',
        },
    });
    return request.data;
}

async function getNumTrivia(min, max){
    let request = await axios({
        url: 'http://numbersapi.com/'+min+ '..' + max,
        method: 'get',

    });

    return request.data;
}

async function getDoggo(){
    let request = await axios({
        url: 'https://dog.ceo/api/breeds/image/random',
        method: 'get',
    });
    return request.data;
}

async function getTrivia(){
    let request = await axios({
        url: 'https://opentdb.com/api.php?amount=15',
        method: 'get',
    });

    return request.data;
}