async function getBookData() {
    let data = await fetch("https://www.anapioficeandfire.com/api/books?page=1&pageSize=20")
    let res = await data.json()
    return res;
}

async function getCharactersData(book) {
    let charData = [];
    for (let i = 0; i < 5; i++) {
        let data = await fetch(book.characters[i])
        let res = await data.json()
        charData.push(res.name==="" ? "unknown" : res.name);
    }
    return charData;
}

var booksContainer = document.getElementById('booksContainer')
async function showData() {
    let books = await getBookData();
    console.log(books);
    let characters = [];
    booksContainer.innerHTML = "";
    for (let i = 0; i < books.length; i++) {
        characters = await getCharactersData(books[i]);
        var bookdiv = document.createElement('div')
        bookdiv.innerHTML = `
        <div class=" card border-info mb-2" style="max-width: 18rem;">
            <div class="card-header">
                <h5> ${books[i].name}</h5>
            </div>
            <div class="card-body m-0 bg-secondary">
                <p class="card-text m-0">ISBN: ${books[i].isbn}</p>
                <p class="card-text m-0">Pages: ${books[i].numberOfPages}</p>
                <p class="card-text m-0">Authors: ${books[i].authors}</p>
                <p class="card-text m-0">Publisher: ${books[i].publisher}</p>
                <p class="card-text m-0">Released: ${books[i].released}</p>
                <p class="card-text m-0">Character:${characters[0]}</p>
                <p class="card-text m-0">Character:${characters[1]}</p>
                <p class="card-text m-0">Character:${characters[2]}</p>
                <p class="card-text m-0">Character:${characters[3]}</p>
                <p class="card-text m-0">Character:${characters[4]}</p>
            </div>
       </div>`
        booksContainer.append(bookdiv)
    }




}

showData();