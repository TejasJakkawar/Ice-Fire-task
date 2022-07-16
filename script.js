document.body.innerHTML=
`<nav class="nav-container">
<h1>Ice and Fire API<h1></nav>
<div id="container" class="main-container"></div>`


async function getData(){
    try{
        let response = await fetch("https://www.anapioficeandfire.com/api/books/")
        let data = await response.json()
    
        container.innerHTML=""

        
        var count = 0; 
        await data.forEach((dataObj)=>{
           display(dataObj, count++)
        })
        
    
        var count1=0
        await data.forEach((dataObj)=>{
            charName(dataObj, count1++)
         })
    }catch(error) {
        (error)=>console.log(error);
    }
};
getData()


const display = (obj, id)=>{
    container.innerHTML +=`
    <div id="childContainer+${id}" class="child-container">
    <p><b>Name: ${obj.name}</b></p>
    <p>ISBN: ${obj.isbn}</p>
    <p>pages: ${obj.numberOfPages}</p>
    <p>Authors: ${obj.authors}</p>
    <p>Publisher: ${obj.publisher}</p>
    <p>Released: ${obj.released}</p>
    </div>
    `
}


function charName(obj, id1){
    var charArray = obj.characters.slice(11,16)

    for(let i=0;i<charArray.length;i++){
        
        fetch(charArray[i])
            .then((res)=>res.json())
            .then((data)=> {
                document.getElementById("childContainer+"+id1).innerHTML += 
                `<p id="character">Character: ${data.name}</p>`
        
            })
            .catch((error)=>console.log(error))
    }
}