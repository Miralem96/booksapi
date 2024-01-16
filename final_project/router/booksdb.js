let books = [
    {id: 1, "author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {} },
    {id: 2,"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {} },
    {id: 3,"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {} },
    {id: 4,"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
    {id: 5,"author": "Unknown","title": "The Book Of Job", "reviews": {} },
    {id: 6,"author": "Unknown","title": "One Thousand and One Nights", "reviews": {} },
    {id: 7,"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {} },
    {id: 8,"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {} },
    {id: 9,"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {} },
    {id: 10,"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
    ];
    
    function getAllBooks() {
      return Object.values(books);
    }

    module.exports = {
      getAllBooks
    };

    function getAllBooksAsync(callback) {
      // Simulating an asynchronous operation (fetching data from a database)
      setTimeout(() => {
        const bookList = Object.values(books);
        callback(null, bookList);
      }, 1000); // Delay of 1 second
    }
    
    module.exports = {
      getAllBooksAsync,
    };


    function getBookByISBN(isbn) {
      return new Promise((resolve, reject) => {
        // Simulating an asynchronous operation (fetching data from a database)
        setTimeout(() => {
          const book = books.find((book) => book.id === parseInt(isbn));
    
          if (book) {
            resolve(book);
          } else {
            reject(new Error(`Book with ISBN ${isbn} not found`));
          }
        }, 1000); 
      });
    }
    
    module.exports = {
      getBookByISBN,
    };


    function getBooksByAuthor(author) {
      return new Promise((resolve, reject) => {
        // Simulating an asynchronous operation (fetching data from a database)
        setTimeout(() => {
          const booksByAuthor = books.filter((book) => book.author === author);
    
          if (booksByAuthor.length > 0) {
            resolve(booksByAuthor);
          } else {
            reject(new Error(`No books found by ${author}`));
          }
        }, 1000); // Delay of 1 second 
      });
    }
    
    module.exports = {
      getBooksByAuthor,
    };

    function getBooksByTitle(title) {
      return new Promise((resolve, reject) => {
        // Simulating an asynchronous operation (fetching data from a database)
        setTimeout(() => {
          const booksByTitle = books.filter((book) => book.title.toLowerCase().includes(title.toLowerCase()));
    
          if (booksByTitle.length > 0) {
            resolve(booksByTitle);
          } else {
            reject(new Error(`No books found with title ${title}`));
          }
        }, 1000); // Delay of 1 second 
      });
    }
    
    module.exports = {
      getBooksByTitle,
    };
    