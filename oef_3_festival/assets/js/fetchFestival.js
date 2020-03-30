window.addEventListener("load", loaded);

function loaded() {
    //let url = 'http://localhost:3000/performances/';
    //let output = document.getElementById("div_output");

    let buttonGetAll = document.getElementById("get_all");
    buttonGetAll.addEventListener("click", handleGetAllButton);

    let buttonGetByDate = document.getElementById("get_all_date");
    buttonGetByDate.addEventListener("click", handleGetByDateButton);

    let buttonGetById = document.getElementById("get_by_id");
    buttonGetById.addEventListener("click",handleGetByIdButton);

    let buttonPost = document.getElementById("post");
    buttonPost.addEventListener("click", handlePostButton);

}


function handleGetAllButton() {
    let url = 'http://localhost:3000/performances/';
    let output = document.getElementById("div_output");
    makeElementEmpty(output);

    fetch(url)
        .then((response)=> {
            if (response.status ===200){
                return response.json();
            } else {
                throw `error with status ${response.status} `;
            }
        })
        .then((performances) =>{
            let data = [];
            for (let performance of performances){
                data.push([performance.id, performance.name,performance.play_date,performance.description])
            }
            let table = makeTable(data);
            output.appendChild(table);
        })
        .catch((error)=>{
            output.appendChild(document.createTextNode(error));
        })

}

function handleGetByDateButton() {
    let url = 'http://localhost:3000/performances/';
    let output = document.getElementById("div_output");
    let dateStr = document.getElementById("get_by_date").value;


    let dateParts = dateStr.split('/');
    //let date =new Date(+dateParts[2],dateParts[1]-1,+dateParts[0]);
    let date = dateParts[2] + "-"+ dateParts[1] + "-" + dateParts[0];
    console.log(date);

    makeElementEmpty(output);

    if(dateStr !== ''){
        fetch(url + '?play_date=' + date)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();

                } else {
                    throw `error with status ${response.status}`;
                }
            })
            .then((performances)=>{
                let data = [];
                for (let performance of performances){
                    data.push([performance.id, performance.name,performance.play_date,performance.description]);
                }
                let table = makeTable(data);
                output.appendChild(table);
            })
            .catch((error) => {
                output.appendChild(document.createTextNode(error));
            });

    } else {output.appendChild(document.createTextNode("No date"));}
}

function handleGetByIdButton() {
    let url = 'http://localhost:3000/performances/';
    let output = document.getElementById("div_output");
    let id = document.getElementById("performance_id").value;
    makeElementEmpty(output);

    if (id.trim()!==''){
        fetch(url + id)
            .then((response) =>{
                if (response.status === 200){
                    return response.json();
                }else {
                    throw `error with status ${response.status}`;
                }
            })
            .then((performance) => {
                let data = [];
                data.push([performance.id, performance.name,performance.play_date,performance.description]);
                let table =makeTable(data);
                output.appendChild(table);
            })
            .catch((error) => {
                output.appendChild(document.createTextNode(error));
            });
    }
}

function handlePostButton() {
    let url = 'http://localhost:3000/performances/';
    let output = document.getElementById("div_output");
    let name = document.getElementById("post_name").value;

    let dateStr = document.getElementById("post_date").value;
    let dateParts = dateStr.split("/");
    let date = dateParts[2] + "-"+ dateParts[1] + "-" + dateParts[0];

    let description = document.getElementById("post_omschrijving").value;
    let performance = {name: name, play_date: date, description: description};

    makeElementEmpty(output);

    fetch(url,
        {
            method: "POST",
            body: JSON.stringify(performance),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response)=>{
            if (response.status === 201) {
                return response.json();
            } else {
                throw `error with status ${response.status}`;
            }
        })
        .then((performance)=>{
            let data = [];
            data.push([performance.id,performance.name,performance.play_date,performance.description]);
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