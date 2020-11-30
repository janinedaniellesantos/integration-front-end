function findData() {

    if (document.getElementById('isbn').value === "" || document.getElementById('isbn').value.length === 0) {
        alert("ERROR: empty request");
        return;
    }

    let isbn = document.getElementById('isbn').value;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("output").innerHTML = CreateTableIsbn(JSON.parse(this.responseText));
        }
        if ( this.status == 404 || this.status == 500 ){
            document.getElementById("output").innerHTML = "<pre>" + this.responseText + "</pre>";
            return;
        }
    };
    xhttp.open("GET", "https://janine-net-backend.herokuapp.com/api/books/" + isbn, true);
    xhttp.send();
}
function findAuthor() {

    if (document.getElementById('author').value === "" || document.getElementById('author').value.length === 0) {
        alert("ERROR: empty request");
        return;

    }
    let author = document.getElementById('author').value;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("output").innerHTML = CreateTableAuthor(JSON.parse(this.responseText));
        }
        if ( this.status == 404 || this.status == 500 ){
            document.getElementById("output").innerHTML = "<pre>" + this.responseText + "</pre>";
            return;
        }
    };
    xhttp.open("GET", "https://janine-net-backend.herokuapp.com/api/books?author=" + author, true);
    xhttp.send();
}
function CreateTableAuthor(data){
    let retVal = "";
    if(data === null || data.length === 0){
        alert("not found");
        return;
    }
    retVal =
        '<table class="table table-bordered table-hover"> \n' +
        '	<thead> \n' +
        '		<tr> \n' +
        '			<th scope="col">Title</th> \n' +
        '			<th scope="col">Author</th> \n' +
        '			<th scope="col">isbn</th> \n' +
        '			<th scope="col">Price</th> \n' +
        '		</tr> \n' +
        '	</thead> \n' +
        '	<tbody> \n';

    for (let book in data){
        retVal +=
            '<tr> \n' +
            '	<td>' + data[book]["name"] + '</td> \n' +
            '	<td>' + data[book]["author"] + '</td> \n' +
            '	<td>' + data[book]["isbn"] + '</td> \n' +
            '	<td>' + "$" + data[book]["price"] + '</td> \n' +
            '</tr> \n';
    }

    retVal +=
        '</tbody> \n' +
        '</table> \n' +
        '</div> \n ' ;
    return retVal;
}

function CreateTableIsbn(data){
    let retVal = "";
    retVal =
        '<table class="table table-bordered table-hover"> \n' +
        '	<thead> \n' +
        '		<tr> \n' +
        '			<th scope="col">Title</th> \n' +
        '			<th scope="col">Author</th> \n' +
        '			<th scope="col">isbn</th> \n' +
        '			<th scope="col">Price</th> \n' +
        '		</tr> \n' +
        '	</thead> \n' +
        '	<tbody> \n';

    // for (let book in data){
    retVal +=
        '<tr> \n' +
        '	<td>' + data["name"] + '</td> \n' +
        '	<td>' + data["author"] + '</td> \n' +
        '	<td>' + data["isbn"] + '</td> \n' +
        '	<td>' + "$" + data["price"] + '</td> \n' +
        '</tr> \n';
    // }

    retVal +=
        '</tbody> \n' +
        '</table> \n' +
        '</div> \n ' ;
    return retVal;
}