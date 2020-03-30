window.addEventListener("load", loaded);

function loaded() {

    let divSelect = document.getElementById("div_select");
    let divOutput = document.getElementById("div_output");
    let urlPersons = 'http://localhost:3000/persons/';
    makeElementEmpty(divOutput);
    makeElementEmpty(divSelect);
    fetch(urlPersons)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw `error with status ${response.status}`;
            }
        })
        .then((persons) => {
            let select = makeSelect(persons);
            divSelect.appendChild(select);

            let buttonGetFriends = document.getElementById('');
            buttonGetFriends.addEventListener("click", handleGetFriends);

            let buttonPost = document.getElementById('buttonPostPerson');
            buttonPost.addEventListener("click", handlePostPerson);
        })
        .catch((error) => {
            divOutput.appendChild(document.createTextNode(error));
        });

    //



}

function handleGetFriends() {
    let url = 'http://localhost:3000/persons/';
    let select = document.getElementById("select_id");
    let id = select.value;
    let name = "";
    let output = document.getElementById("div_output");
    //let name = document.getElementById("txt_name").value;
    //let friends = [];
    //let person = {name: name, friends: friends};
    makeElementEmpty(output);

    fetch(url + 1)
        .then((response) =>{
            if (response.status ===200){
                return response.json();
            } else {
                throw  `error with status${response.status}`;
            }
        })
        .then((person)=>{
            name = person.name;
            return person.friends;
        })
        .then((friends) =>{
            let friendsIds = friends.join(":id=");
            //makeSelect(output);                       check
            return fetch(url + `?id=${friendsIds}`);
        })
        .then((response) =>{
            if (response.status ===200){
                return response.json();
            }else {
                throw `error wthis status ${response.status}`;
            }
        })
        .then((persons) => {
            let names =[];
            for (let person of persons){
                names.push(person.name);
            }
            let textNode = document.createTextNode(name + 'has friends : ' + names.join(", "));
            output.appendChild(textNode);
        })
        .catch((error)=>{
           output.appendChild(document.createTextNode(error));
        });

}

function handlePostPerson() {
    let url = 'http://localhost:3000/persons/';
    let output = document.getElementById("div_output");
    let name = document.getElementById("txt_name").value;
    let friends = [];
    let person = {name: name, friends: friends};
    makeElementEmpty(output);
    fetch(url,
        {
            method: "POST",
            body: JSON.stringify(person),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw `error with status ${response.status}`;
            }
        })
        .then((person) => {
            let data = [];
            data.push([person.id, person.name,person.friends]);
            let table = makeTable(data);
            output.appendChild(table);
        })
        .catch((error) => {
            output.appendChild(document.createTextNode(error));
        });
}




function makeElementEmpty(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
}


///
function makeTable(matrix) {
    let table = document.createElement("table");
    for (let i = 0; i < matrix.length; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < matrix[i].length; j++) {
            let td = document.createElement("td");
            td.appendChild(document.createTextNode(matrix[i][j]));
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}

function makeSelect(person) {
    let select = document.createElement('select');
    select.setAttribute('id', 'select_id');
    for (let person of persons) {
        // per persoon wordt een option aangemaakt
        //let option=makeOption(person ,select);
        makeOption(person,select);
    }
    return select;
}

function makeOption(person,select) {
    let option = document.createElement("option");
    option.appendChild(document.createTextNode(person.name));
    option.setAttribute('value', person.id);
    select.appendChild(option);
}