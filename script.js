var booksContainer=document.getElementById('booksContainer')
console.log(booksContainer);
async function getBookData(){
    let data=await fetch("https://www.anapioficeandfire.com/api/books?page=1&pageSize=20")
    let res= await data.json()
    //console.log(res)
    //showData(res);

    booksContainer.innerHTML = "";
    res.map((element)=>{
        console.log(element.name)
        var bookdiv = document.createElement('div')
        let bookChar = [];
        if(element.characters.length>5){
            let i=0;

            // FOR PRATIK review
            do{
                var req = new XMLHttpRequest();
                req.open('GET',element.characters[i],false);
                req.send(null);
                var response = JSON.parse(req.responseText);
                //getCharacters(element.characters[i]).then(d => bookChar.push(d))
                if(response.name !== "") bookChar.push(response.name);
                i+=1;
            }while(bookChar.length<=5)
        }
         console.log(bookChar);
        // var itr = bookChar.values();
        // console.log(itr.next().value);
        bookdiv.innerHTML=`
        <div class=" card border-info mb-2" style="max-width: 18rem;">
            <div class="card-header">
                <h5> ${element.name}</h5>
            </div>
            <div class="card-body m-0 bg-secondary">
                <p class="card-text m-0">ISBN: ${element.isbn}</p>
                <p class="card-text m-0">Pages: ${element.numberOfPages}</p>
                <p class="card-text m-0">Authors: ${element.authors}</p>
                <p class="card-text m-0">Publisher: ${element.publisher}</p>
                <p class="card-text m-0">Released: ${element.released}</p>
                <p class="card-text m-0">Character:${bookChar[0]}</p>
                <p class="card-text m-0">Character:${bookChar[1]}</p>
                <p class="card-text m-0">Character:${bookChar[2]}</p>
                <p class="card-text m-0">Character:${bookChar[3]}</p>
                <p class="card-text m-0">Character:${bookChar[4]}</p>
            </div>
       </div>`
    booksContainer.append(bookdiv)
    bookChar = [];
    })
}

async function getCharacters(charURL){
    let charData =await fetch(charURL);
    let charRes = await charData.json();
    //console.log(charRes.name);
    return charRes.name;
}
getBookData()