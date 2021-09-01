
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
    if (parseInt(books.length) === 0) {
        errorDiv.style.display = 'block';
        errorDiv.innerText = 'no result found';

    }
    else {
        books.length ? errorDiv.style.display = 'none' : '';
        const bookContainer = document.getElementById('book-container');
        bookContainer.textContent = '';
        books.forEach(book => {
            let author = '';
            let bookPublisher = '';
            const div = document.createElement('div');
            div.classList.add('col');
            book.author_name ? author = book.author_name[0] : '';
            book.publisher ? bookPublisher = book.publisher[0] : '';
            div.innerHTML = `
             <img src='https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg'/>
             <h4>${book.title}</h4>
             <p>author: ${author}</p>
             <p>publiser: ${bookPublisher}</p>
             <p>frist publist: ${book.first_publish_year}</p>
             
        `;
            bookContainer.appendChild(div);
        });
    }
};

