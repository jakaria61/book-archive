
const errorDiv = document.getElementById('error');
errorDiv.style.display = 'none';


const searchBook = () => {
    const inputValue = document.getElementById('input-filed');
    const searchText = inputValue.value;

    if (searchText === '') {
        errorDiv.style.display = 'block';
    }
    else {
        const url = `http://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => showBook(data.docs))
    }

};

const showBook = (books) => {
    console.log(books.length);
    if (books.length === 0) {
        errorDiv.innerHTML = `<h1>No Result Found</h1>`;

    }
    else {
        books.length ? errorDiv.style.display = 'none' : '';
        const bookContainer = document.getElementById('book-container');
        bookContainer.textContent = '';
        books.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
             <img src='https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg'/>
             <h4>${book.title}</h4>
             <p>author: ${book.author_name[0]}</p>
             <p>publiser: ${book.publisher[0]}</p>
             <p>frist publist: ${book.first_publish_year}</p>
             
        `;
            bookContainer.appendChild(div);
        });
    }
};

