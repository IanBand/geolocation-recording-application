const listElement = document.getElementById('list');
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
    .then(json => state.cities = calcDistances(json))
    .then(() => renderList());
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function sortAscending(e){
    // console.log('sortAscending()');
    state.cities.sort((a,b) => a.dist - b.dist);
    renderList();
}
function sortDecending(e){
    // console.log('sortDecending()');
    state.cities.sort((a,b) => b.dist - a.dist);
    renderList();
}

function calcDistances(apiData){
    return apiData.map(elem => {
        // Corvallis latitude and longitude obtained from https://www.geodatasource.com/demo
        return {city: elem.city, dist: distance(44.5646, -123.262, elem.lat, elem.lng, "M")};
    });
}
function renderList(){
    console.log('renderList()');
    removeAllChildNodes(listElement);
    addRow(listElement,["City", "Distance"]);
    state.cities.forEach(elem => addRow(listElement,[elem.city, elem.dist]));
}
/**
 * @param {Element}  parent parent <table> element
 * @param {[String]} columns list of strings to be the contents of cells 
 */
function addRow(parent,columns){

    const row = document.createElement("tr");
    parent.appendChild(row);

    columns.forEach(cellText => {
        const col = document.createElement("th")
        col.appendChild(document.createTextNode(cellText));
        row.appendChild(col);
    });
}

main();