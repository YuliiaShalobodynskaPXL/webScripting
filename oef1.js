let url = 'http://localhost:3000/persons/' ;
let output = document.getElementById("div_output");
makeElementEmpty(output);
fetch(url)
    .then((response) =>{
        if(response.status==200){
            return response.json();
        } else {
            throw `error with status ${response.status}`;
        }
    })
    .then((persons) => {
        let data = [];
        for (let person of persons) {
            data.push([person.id, person.name]);
        }
        let table=makeTable(data);
        output.appendChild(table);
    })
    .catch( (error) => {
        output.appendChild(document.createTextNode(error));
    } );