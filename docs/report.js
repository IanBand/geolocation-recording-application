
var state = {
    cities: []
};


function main(){

    fetch('https://s3-us-west-2.amazonaws.com/cdt-web-storage/cities.json')
    .then(res => {
        if(!res.ok){
            throw new Error("HTTP error " + response.status);
        }
        return res.json();
    })
    .then(json => state.cities = json)
    .then(() => renderList());
}

function sortAscending(e){
    console.log('sortAscending()');
}
function sortDecending(e){
    console.log('sortDecending()');
}
function renderList(){
    console.log('renderList()')
}

main();