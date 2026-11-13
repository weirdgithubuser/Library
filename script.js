const myLibrary = [];
const addBookBtn = document.querySelector(".add-book-btn");
const addBookBtnFinal = document.querySelector(".add-book-btn-final")
const titleBox = document.querySelector("#title");
const authorBox = document.querySelector("#author");
const pagesBox = document.querySelector("#pages");
const displayCards = document.querySelector(".display-cards");

function Book(id, title, author, pages, read){
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.ReadToggle = function(){
    this.read = !this.read;
}

addBookBtn.addEventListener('click', () => {
    addBookForm = document.querySelector('.addbookform');
    addBookForm.style.display = 'flex';
})

addBookBtnFinal.addEventListener('click', (event) => {
    event.preventDefault();
    let title = titleBox.value;
    let author = authorBox.value;
    let pages = pagesBox.value;
    let readStatus = document.querySelector("input[name='choice']:checked").id;
    readStatus === 'read' ? readStatus = true : readStatus = false;
    while(displayCards.firstChild){
        displayCards.removeChild(displayCards.firstChild);
    }
    addToLibrary(title, author, pages, readStatus);
    titleBox.value = "";
    authorBox.value = "";
    pagesBox.value = "";
    addBookForm.style.display = 'none';
})

function addToLibrary(title, author, pages, readStatus){
    let book = new Book(crypto.randomUUID(), title, author, pages, readStatus);
    myLibrary.push(book);
    displayCardsOnPage();
}

function displayCardsOnPage(){
    for(let book of myLibrary){
        let readMsg;
        (book.read) ? readMsg = "read" : readMsg = "unread";
        let displayDivCard = displayCards.appendChild(document.createElement("div"));
        displayCards.style.display = "flex";
        displayCards.style["flex-flow"] = "column no-wrap";
        displayDivCard.classList.add("card");
        const cardTitle = displayDivCard.appendChild(document.createElement("span"));
        cardTitle.textContent = `${book.title}`;
        cardTitle.style.fontWeight = "Bold";
        const cardContent = displayDivCard.appendChild(document.createElement("div"));
        cardContent.style.whiteSpace = "pre-line"; // to make \n work
        cardContent.textContent = `Author: ${book.author}\nNumber of Pages: ${book.pages}\nStatus: ${readMsg}`;
        cardContent.style.paddingBottom = "40px";
        const readToggle = displayDivCard.appendChild(document.createElement("button"));
        readToggle.classList.add("read-toggle");
        if(book.read == "read"){
            readToggle.textContent = "Mark as Unread";
        }else{
            readToggle.textContent = "Mark as Read";
        }

        readToggle.addEventListener("click", ()=>{
            if(book.read){
                book.ReadToggle();
                readMsg = "unread"
                readToggle.textContent = "Mark as Read";
                cardContent.textContent = `Author: ${book.author}\nNumber of Pages: ${book.pages}\nStatus: ${readMsg}`;

            }else{
                book.ReadToggle();
                readMsg = "read"
                readToggle.textContent = "Mark as Unread";
                cardContent.textContent = `Author: ${book.author}\nNumber of Pages: ${book.pages}\nStatus: ${readMsg}`;
            }
        })

        const removeBookBtn = displayDivCard.appendChild(document.createElement("button"));
        removeBookBtn.textContent = "Remove";
        removeBookBtn.classList.add("remove-book-btn");

        removeBookBtn.addEventListener("click", () => {
            myLibrary.splice(myLibrary.indexOf(book),1);
            displayCards.removeChild(displayDivCard);
        })
        }
}