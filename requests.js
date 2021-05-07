export {getVegan}
async function getVegan(){
    let request = await axios({
        url:'https://api.spoonacular.com/recipes/complexSearch',
        method: 'get',
        params: {
            apiKey: '0bac70aad4b04a21a8195cfc8c0207e7',
            diet: 'vegan'
        },
    })
    return request;
}