'use strict'
/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Book = db.model('book');
var Publisher = db.model('publisher');
var Author = db.model('author');
var Address = db.model('address');
var PaymentMethod = db.model('payment_method')
var BookType = db.model('book_type')
var Invoice = db.model('invoice')
var User_Payment = db.model('user_payment')
var Line_Item = db.model('line_item')
var Collection = db.model('collection')



var Promise = require('sequelize').Promise;


let reviews = [
    { stars: 5, comments: "luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis" },
    { stars: 3, comments: "in sapien iaculis congue vivamus metus arcu adipiscing" },
    { stars: 1, comments: "viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est" },
    { stars: 1, comments: "sem fusce consequat nulla nisl nunc" },
    { stars: 5, comments: "nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis" },
    { stars: 5, comments: "donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel" },
    { stars: 3, comments: "pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit" },
    { stars: 3, comments: "quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra" }
]

var seedUsers = function() {

    var users = [
        { "first_name": "Aaron", "last_name": "Cooke", "email": "sed@Aliquam.org", "password": "KVT01TVO4NU" },
        { "first_name": "Lane", "last_name": "Everett", "email": "Cras@ridiculus.co.uk", "password": "CBX97OHM9XC" },
        { "first_name": "Ray", "last_name": "Holloway", "email": "commodo.at@enimnislelementum.org", "password": "TQL39ZPV8EB" },
        { "first_name": "Bradley", "last_name": "Duke", "email": "Donec.porttitor@idliberoDonec.com", "password": "YML02LUN0GY" },
        { "first_name": "Hollee", "last_name": "Valdez", "email": "lorem@scelerisqueneque.org", "password": "CDY27ACW4FZ" },
        { "first_name": "Robert", "last_name": "Sykes", "email": "auctor.odio.a@Nullamvelitdui.ca", "password": "ZYD37VLQ0OC" },
        { "first_name": "Shelley", "last_name": "Mcdaniel", "email": "arcu.Morbi@metusurnaconvallis.com", "password": "TPA99AHH6KJ" },
        { "first_name": "Katell", "last_name": "Osborn", "email": "sollicitudin.orci@malesuada.co.uk", "password": "BUE42HHD4IF" },
        { "first_name": "Ina", "last_name": "Gilmore", "email": "montes.nascetur@maurisrhoncus.co.uk", "password": "ZZD28JBE7DK" },
        { "first_name": "Sarah", "last_name": "Bond", "email": "lorem@maurisMorbi.edu", "password": "QCV28CKR1IV" },
        { "first_name": "Garrett", "last_name": "Briggs", "email": "nec@Curabitursed.co.uk", "password": "LUI38SCQ6OY" },
        { "first_name": "Emma", "last_name": "Tran", "email": "rutrum@quam.co.uk", "password": "EUY85ZHJ1UJ" },
        { "first_name": "Zena", "last_name": "Mcgowan", "email": "velit@purus.edu", "password": "YVF68UJC0PG" },
        { "first_name": "Molly", "last_name": "Owen", "email": "posuere.enim@Aliquam.org", "password": "GLD93TFN3LK" },
        { "first_name": "Lydia", "last_name": "Vance", "email": "netus.et.malesuada@fermentumconvallis.ca", "password": "ZRC45YZO5MI" },
        { "first_name": "Illana", "last_name": "Weeks", "email": "et.magnis.dis@felisullamcorper.edu", "password": "WVP89WZJ1VM" },
        { "first_name": "Zeke", "last_name": "Nierenberg", "email": "zeke@zeke.zeke", "password": "123", isAdmin: true },
        { "first_name": "Chris", "last_name": "LoneWolf", "email": "chris@chris.chris", "password": "123" },
        { "first_name": "Jessica", "last_name": "NormalWolf", "email": "jessica@jessica.jessica", "password": "123" }
    ]


    var creatingUsers = users.map(function(userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};


var seedAuthors = function() {

    var authors = [
        { "first_name": "Hamish", "last_name": "Sanchez", "middle_initial": "F", "picture_url": "http://placehold.it/150x250" },
        { "first_name": "Kelsey", "last_name": "Emerson", "middle_initial": "F", "picture_url": "http://placehold.it/150x250" },
        { "first_name": "Camden", "last_name": "Franks", "middle_initial": "C", "picture_url": "http://placehold.it/150x250" },
        { "first_name": "Boris", "last_name": "Travis", "middle_initial": "C", "picture_url": "http://placehold.it/150x250" },
        { "first_name": "Noelle", "last_name": "Browning", "middle_initial": "B", "picture_url": "http://placehold.it/150x250" },
        { "first_name": "Zia", "last_name": "Russo", "middle_initial": "A", "picture_url": "http://placehold.it/150x250" },
        { "first_name": "Chaney", "last_name": "Hale", "middle_initial": "G", "picture_url": "http://placehold.it/150x250" },
        { "first_name": "Martena", "last_name": "Hickman", "middle_initial": "E", "picture_url": "http://placehold.it/150x250" },
        { "first_name": "Scott", "last_name": "Ray", "middle_initial": "C", "picture_url": "http://placehold.it/150x250" },
        { "first_name": "Karina", "last_name": "Wooten", "middle_initial": "F", "picture_url": "http://placehold.it/150x250" },
        { "first_name": "Ethan", "last_name": "Baxter", "middle_initial": "D", "picture_url": "http://placehold.it/150x250" }
    ]


    var creatingAuthors = authors.map(function(authorObj) {
        return Author.create(authorObj);
    });

    return Promise.all(creatingAuthors);

};


var seedPayments = function() {

    var payments = [
        { "token": "IIU09GNR6MU" },
        { "token": "DHJ13RSR8RU" },
        { "token": "FYY53LZK7OD" },
        { "token": "INX95FKJ1GI" },
        { "token": "SBJ88YLH6HZ" },
        { "token": "KUK84RJN8VW" },
        { "token": "KZT20EXL5KP" },
        { "token": "ZID57NVL8VB" },
        { "token": "UEL27GIK5ZV" },
        { "token": "FCU13VCN5YY" },
        { "token": "TES55AAX4JH" },
        { "token": "RUL64MUO7HD" },
        { "token": "IGA22SHB4GF" },
        { "token": "MPT60UJJ7UP" },
        { "token": "SXK18TVZ7KJ" },
        { "token": "PDH13BVY6IO" },
        { "token": "MHK91WHM8JA" },
        { "token": "DUM42ZTN6YZ" },
        { "token": "AFZ58EOB5ZK" },
        { "token": "RPN52INC2VP" },
        { "token": "OSB54FWS0IH" },
        { "token": "SAV40YLN4WH" },
        { "token": "UFD56JUW8JN" },
        { "token": "LCQ90AZP7TY" }
    ];

    return Promise.all(payments.map(function(paymentObj) {
        return PaymentMethod.create(paymentObj);
    }))

};

var seedPublishers = function() {

    var publishers = [
        { name: 'Publishing By Publish' },
        { name: 'Fullstack By Publishing' },
        { name: 'StackFull Publishing' },
        { name: 'Fulling Stackpub' },
        { name: 'Pubstack By Fublishing' },
        { name: 'Fullstack and Sons Publishers' },
        { name: 'Publishers Clearing House' },
        { name: 'Enjoying a Guinness at the Publisher' },
        { name: 'StackPub by LishFuller' },
        { name: 'Pubbing and Lishing' },
        { name: 'Publers and Fullstack' },
        { name: 'Stack Publishing and Sons' },
        { name: 'Fullstack and Daughters' },
        { name: 'Finna Publish That Publishing' }
    ];

    var creatingPublishers = publishers.map(function(publisherObj) {
        return Publisher.create(publisherObj);
    });

    return Promise.all(creatingPublishers);

};

var seedBookTypes = function() {

    var bookTypes = [
        { "type": "hardcover", "price": 16.50, "quantity": 14, "num_pages": 246 },
        { "type": "ebook", "price": 17.95, "quantity": null, "num_pages": 250 },
        { "type": "paperback", "price": 13.75, "quantity": 3, "num_pages": 224 },
        { "type": "leatherbound", "price": 42.00, "quantity": 15, "num_pages": 364 }
    ]
    return Promise.all(bookTypes.map(function(bookObj) {
        return BookType.create(bookObj);
    }))



};


var seedCollections = function() {

    var collections = [
        { "name": "Best Sellers - The New York Times"},
        { "name": "Recommended"},
        { "name": "Random Suggestions"},
        { "name": "Good Reads"},
        { "name": "Harry Potter Series"}
    ]
    return Promise.all(collections.map(function(collectionObj) {
        return Collection.create(collectionObj);
    }))

};

var seedInvoices = function() {

    var invoices = [
        { "total": 56.32, "comment": "" },
        { "total": 25.00, "comment": "Good guy" },
        { "total": 34.99, "comment": "" },
        { "total": 34.34, "comment": "" },
        { "total": 7.00, "comment": "customer made a really funny joke" },
        { "total": 56, "comment": "" },
        { "total": 26.32, "comment": "" },
        { "total": 26, "comment": "Great guy" },
        { "total": 39.99, "comment": "" },
        { "total": 36.34, "comment": "" },
        { "total": 72.00, "comment": "customer is happy with our prices" },
        { "total": 56, "comment": "" }
    ]
    return Promise.all(invoices.map(function(invoiceObj) {
        return Invoice.create(invoiceObj);
    }))

};

var seedBooks = function() {

    var books = [
        { "title": "The Hobbit", "genre": "Fiction", "book_score": "80", cover_url:"https://cdn.pastemagazine.com/www/system/images/photo_albums/hobbit-book-covers/large/photo_5653_0-8.jpg?1384968217" },
        { "title": "The Fellowship of the Ring", "genre": "Fiction","book_score": "80", cover_url: "http://www.councilofelrond.com/wp-content/uploads/modules/My_eGallery/gallery/covers/books/NenyaGoldFotRBookCoverCoE.jpg"},
        { "title": "Harry Potter and the Sorcer Stone", "genre": "Fiction", "book_score": "80", cover_url: "https://img.buzzfeed.com/buzzfeed-static/static/enhanced/webdr06/2013/7/30/18/grid-cell-14969-1375222023-8.jpg"},
        { "title": "Harry Potter and the Chamber of Secrets", "genre": "Fiction","book_score": "80", cover_url: "https://dolmv3q9e9skh.cloudfront.net/productImage/?sku=lens-harry_potter_and_the_chamber_of_secrets&w=150"},
        { "title": "Harry Potter and Prisoner of Azkaban", "genre": "Fiction", "book_score": "80", cover_url: "https://upload.wikimedia.org/wikipedia/en/b/b4/Harry_Potter_and_the_Prisoner_of_Azkaban_(US_cover).jpg"},
        { "title": "Harry Potter and the Goblet of Fire", "genre": "Fiction", "book_score": "80", cover_url: "https://i.infopls.com/images/HPusa4_TV.jpg"},
        { "title": "Harry Potter and the Order of the Phoenix", "genre": "Fiction", "book_score": "80", cover_url: "http://harrypotterfanzone.com/wp-content/2009/06/ootp-us-jacket-art.jpg"},
        { "title": "Harry Potter and the Half Blood Prince", "genre": "Fiction", "book_score": "80", cover_url: "http://vignette3.wikia.nocookie.net/harrypotter/images/c/c6/Harry_potter_HBP_Scholastic_edition.jpg/revision/latest?cb=20051228060531"},
        { "title": "Harry Potter and the Deathly Hallows", "genre": "Fiction", "book_score": "80", cover_url: "http://harrypotterfanzone.com/wp-content/2009/06/dh-us-jacket-art.jpg"},
        { "title": "Of Mice and Men", "genre": "Fiction", "book_score": "80", cover_url: "https://images-na.ssl-images-amazon.com/images/I/51wuHv30-ML._SY344_BO1,204,203,200_.jpg"},
        { "title": "Hitchhiker's Guide to the Galaxy", "genre": "Fiction", "book_score": "70", cover_url: "http://www.thealmightyguru.com/Reviews/Hitchhiker/Images/HHGG-Ultimate-Soft.jpg" },
        { "title": "APPRENTICE IN DEATH", "genre": "Non-fiction", "book_score": "60",cover_url:"https://s1.nyt.com/du/books/images/9781101987971.jpg" },
        { "title": "Girl on a Train", "genre": "Non-fiction", "book_score": "60",cover_url:"https://s1.nyt.com/du/books/images/9781594633669.jpg" },
        { "title": "Mauris quis turpis Vitae Purus Gravida", "genre": "Realistic fiction", "book_score": "49",cover_url:"http://blog.hrc.utexas.edu/files/2012/12/poecover.jpg" },
        { "title": "laoreet ipsum. Curabitur consequat", "genre": "Drama", "book_score": "60",cover_url:"http://blog.hrc.utexas.edu/files/2012/12/poecover.jpg" },
        { "title": "Molestie in, Tempus eu, Ligula", "genre": "Realistic fiction", "book_score": "60",cover_url:"http://blog.hrc.utexas.edu/files/2012/12/poecover.jpg" },
        { "title": "Nullam lobortis quam", "genre": "Realistic fiction", "book_score": "60",cover_url:"http://blog.hrc.utexas.edu/files/2012/12/poecover.jpg" },
        { "title": "Nulla vulputate Dui, Nec Tempus", "genre": "Drama", "book_score": "50",cover_url:"http://blog.hrc.utexas.edu/files/2012/12/poecover.jpg" },
        { "title": "Sit amet Ultricies Sem Magna", "genre": "Tragedy", "book_score": "49",cover_url:"http://blog.hrc.utexas.edu/files/2012/12/poecover.jpg" },
        { "title": "Augue eu Tellus", "genre": "Romance novel", "book_score": "50",cover_url:"http://blog.hrc.utexas.edu/files/2012/12/poecover.jpg" },
        { "title": "Praesent eu dui. Cum sociis", "genre": "Drama", "book_score": "39",cover_url:"http://blog.hrc.utexas.edu/files/2012/12/poecover.jpg" },
        { "title": "Velit. Pellentesque ultricies dignissim lacus. Aliquam", "genre": "Satire", "book_score": "49",cover_url:"http://blog.hrc.utexas.edu/files/2012/12/poecover.jpg" },
        { "title": "Commodo ipsum. Suspendisse non leo", "genre": "Romance novel", "book_score": "50",cover_url:"http://blog.hrc.utexas.edu/files/2012/12/poecover.jpg" },
        { "title": "Eu neque pellentesque massa lobortis ultrices", "genre": "Satire", "book_score": "51",cover_url:"http://blog.hrc.utexas.edu/files/2012/12/poecover.jpg" },
        { "title": "Lacus. Quisque purus sapien, gravida non", "genre": "Horror", "book_score": "50",cover_url:"http://blog.hrc.utexas.edu/files/2012/12/poecover.jpg" },
        { "title": "Dolor sit amet", "genre": "Non-fiction", "book_score": "50",cover_url:"http://blog.hrc.utexas.edu/files/2012/12/poecover.jpg" },
        { "title": "Nunc sollicitudin commodo ipsum. Suspendisse non", "genre": "Drama", "book_score": "50",cover_url:"http://blog.hrc.utexas.edu/files/2012/12/poecover.jpg" },
        { "title": "Nulla eu neque", "genre": "Tragedy", "book_score": "50",cover_url:"http://blog.hrc.utexas.edu/files/2012/12/poecover.jpg" },
        { "title": "Montes, Nascetur Ridiculus Mus. Donec", "genre": "Horror", "book_score": "49",cover_url:"http://blog.hrc.utexas.edu/files/2012/12/poecover.jpg" },
        { "title": "Sem ut Dolor Dapibus Gravida", "genre": "Tragedy", "book_score": "50",cover_url:"http://blog.hrc.utexas.edu/files/2012/12/poecover.jpg" },
        { "title": "Phasellus elit pede, malesuada vel, venenatis vel", "genre": "Comedy", "book_score": "55",cover_url:"http://blog.hrc.utexas.edu/files/2012/12/poecover.jpg" },
        { "title": "Tortor: Integer Aliquam Adipiscing Lacus. Ut nec", "genre": "Satire", "book_score": "44",cover_url:"http://blog.hrc.utexas.edu/files/2012/12/poecover.jpg" },
    ]


    var creatingBooks = books.map(function(bookObj) {
        return Book.create(bookObj);
    });

    return Promise.all(creatingBooks);

};

var seedAddresses = function() {

    var addresses = [
        { "address_line_one": "6545 Magna. Rd.", "city": "New Galloway", "state": "KK", "zip": "54441" },
        { "address_line_one": "141-7872 Facilisi. St.", "city": "Galvarino", "state": "Araucanía", "zip": "69399" },
        { "address_line_one": "Ap #339-3307 Ultricies Av.", "city": "Thorold", "state": "Ontario", "zip": "29528" },
        { "address_line_one": "8666 Augue Road", "city": "Rzeszów", "state": "PK", "zip": "77460" },
        { "address_line_one": "761-2853 Sed Rd.", "city": "Hartford", "state": "CT", "zip": "51238" },
        { "address_line_one": "P.O. Box 759, 8163 Molestie. Av.", "city": "Boston", "state": "Massachusetts", "zip": "68340" },
        { "address_line_one": "891-7599 Amet St.", "city": "San Damiano al Colle", "state": "Lombardia", "zip": "62661" },
        { "address_line_one": "Ap #981-2907 Aenean Avenue", "city": "Joliet", "state": "Illinois", "zip": "92098" },
        { "address_line_one": "9674 Pulvinar Rd.", "city": "Palencia", "state": "CL", "zip": "68434" },
        { "address_line_one": "Ap #558-9584 Suscipit Rd.", "city": "Yumbel", "state": "Biobío", "zip": "89577" },
        { "address_line_one": "P.O. Box 966, 5905 Mus. Ave", "city": "Burlington", "state": "ON", "zip": "44130" },
        { "address_line_one": "P.O. Box 667, 6159 Pede, Avenue", "city": "São José dos Pinhais", "state": "PR", "zip": "30633" },
        { "address_line_one": "1175 Tincidunt Road", "city": "Mataró", "state": "CA", "zip": "23606" },
        { "address_line_one": "P.O. Box 521, 3798 Urna. Road", "city": "Stargard Szczeciński", "state": "ZP", "zip": "80023" },
        { "address_line_one": "Ap #298-6847 Pede, St.", "city": "Vienna", "state": "Vienna", "zip": "35212" },
        { "address_line_one": "P.O. Box 891, 3914 Cursus St.", "city": "Aylmer", "state": "Quebec", "zip": "48601" },
        { "address_line_one": "Ap #966-2780 Dapibus Road", "city": "Pudukkottai", "state": "Tamil Nadu", "zip": "27540" },
        { "address_line_one": "Ap #596-3095 Malesuada St.", "city": "Camaragibe", "state": "Pernambuco", "zip": "57196" },
        { "address_line_one": "8828 Nunc Rd.", "city": "Biała Podlaska", "state": "Lubelskie", "zip": "12731" },
        { "address_line_one": "P.O. Box 776, 8197 Nulla St.", "city": "L'Hospitalet de Llobregat", "state": "Catalunya", "zip": "90566" },
        { "address_line_one": "P.O. Box 963, 3896 In Avenue", "city": "Hilversum", "state": "Noord Holland", "zip": "38727" },
        { "address_line_one": "P.O. Box 608, 5140 Nunc Street", "city": "Rouyn-Noranda", "state": "Quebec", "zip": "04874" },
        { "address_line_one": "818-4759 Lorem Avenue", "city": "Suruç", "state": "Şan", "zip": "86897" },
        { "address_line_one": "P.O. Box 633, 2361 Mauris Street", "city": "Goes", "state": "Zl", "zip": "88304" }
    ]


    var creatingAddresses = addresses.map(function(addressObj) {
        return Address.create(addressObj);
    });

    return Promise.all(creatingAddresses);

};


function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}
let hpCounter = 0;
function harrySeriesCounter(){
    hpCounter++;
    return hpCounter
}


let users, publishers, authors, books, addresses, paymentMethods,
    bookTypes, invoices, collections;


db.sync({ force: true })
    .then(function() {
        return seedUsers();
    })
    .then(function(finUsers) {
        users = finUsers;
        return seedCollections()
    })
    .then(function(finCollections) {
        collections = finCollections
        return seedInvoices();
    })
    .then(function(_invoices) {
        invoices = _invoices
        return seedBookTypes()
    })
    .then(function(finBookTypes) {
        bookTypes = finBookTypes;
        return seedPayments();
    })
    .then(function(finPayments) {
        paymentMethods = finPayments;
        return seedAddresses();
    })
    .then(function(finAddresses) {
        addresses = finAddresses;
        return seedPublishers();
    })
    .then(function(finPublishers) {
        publishers = finPublishers;
        return seedAuthors();
    })
    .then(function(finAuthors) {
        authors = finAuthors;
        return seedBooks();
    })
    .then(function(finBooks) {
        books = finBooks;
        // Book.belongsToMany(Author, {through: 'book_author'});
        return Promise.all(books.map(function(book){
            book.addAuthor(authors[Math.floor(Math.random() * authors.length)])
        }))

    })
    .then(function() {
        var bookTypes = [
            { "type": "hardcover", "price": 16.50, "quantity": 14, "num_pages": 246 },
            { "type": "ebook", "price": 17.95, "quantity": null, "num_pages": 250 },
            { "type": "paperback", "price": 13.75, "quantity": 3, "num_pages": 224 },
            { "type": "leatherbound", "price": 42.00, "quantity": 15, "num_pages": 364 }
        ]
        return Promise.all(

            books.map(function(book){
                return bookTypes.map(function(bT){
                    return BookType.create(bT)
                        .then(function(_bT){
                            return _bT.setBook(book)
                        })
                })
            })
        )
    })
    .then(function() {
        // User.belongsToMany(Address, {through: User_Address});
        function getRandomAddress() {
            return addresses[Math.floor(Math.random() * addresses.length)]
        }

        function getRandomType() {
            return ['billing', 'shipping'][Math.floor(Math.random() * 2)]
        }
        return Promise.all(users.map(function(user){user.addAddress(getRandomAddress(), { type: getRandomType() })
        }))
    })
    .then(function() {
        return Promise.all(users.map(function(user, idx){user.addBook(getRandom(books), getRandom(reviews))
        }))
    })
    .then(function() {
        // Book.belongsTo(Publisher);
        return Promise.all(books.map(function(book){book.setPublisher(publishers[Math.floor(Math.random() * publishers.length)])
        }))
    })
    .then(function() {
        // User.belongsToMany(Book_Type, {through: Line_Item});
        function getRandomBook_Type() {
            return bookTypes[Math.floor(Math.random() * bookTypes.length)]
        }

        function getRandomStatus() {
            return ['viewed', 'cart', 'purchased'][Math.floor(Math.random() * 3)]
        }
        return Promise.all(users.map(function(user, idx){
            user.addBook_type(getRandomBook_Type(), { status: getRandomStatus() })
        }))

    })
    .then(function() {
        // Book.belongsToMany(Collection, {through: Book_Collection});
        
        return Promise.all(books
            .filter(function(book, idx){
                if (book.book_score > 50) return true
            })
            .map(function(book, idx){
                if ( book.title.split(...)[0] === 'Harry') {
                    let potterCollection = collections.filter(function(col){
                        return col.name.split(' ')[0] === 'Harry';
                    })[0]
                    return book.addCollection(potterCollection, { place_in_series: harrySeriesCounter() })
                } else {
                return book.addCollection(getRandom(collections), { place_in_series: getRandom([1, 2, 3]) })
                }
            }))
    })
    .then(function() {
        // still need to add purchased and returned functionality
        // User.belongsToMany(PaymentMethod, {through: 'user_payment'});
        function getRandomPayment() {
            return paymentMethods[Math.floor(Math.random() * paymentMethods.length)]
        }

        function getRandomType() {
            return ['billing', 'shipping'][Math.floor(Math.random() * 2)]
        }
        return Promise.all(users.map(function(user){user.addPayment_method(getRandomPayment())
        }))
    })
    .then(function() {
        // Invoice.belongsTo(User_Payment);
        function getRandomUser() {
            return users[Math.floor(Math.random() * users.length)]
        }
        return Promise.all(invoices.map(function(invoice){
            return User_Payment.findOne({ where: { userId: getRandomUser().id } })
                .then(function(user_payment_instance) {
                    return invoice.setUser_payment(user_payment_instance)
                })
        }))
    })
    .then(function() {
        var line_items
        return Line_Item.findAll({ where: { status: 'purchased' } })
            .then(function(_line_items) {
                line_items = _line_items
                line_items.map(function(line_item){
                    var tempBookTypeId = line_item.bookTypeId;
                    var unit_price = bookTypes.filter(function(bT) {
                        return bT.id === tempBookTypeId;
                    })[0].price
                    line_item.unit_price = unit_price;
                    line_item.quantity = 1;
                    return line_item.save()
                })
                return Promise.all(line_items)
            })
            .then(function(_line_items) {
                function getRandomInvoice() {
                    return invoices[Math.floor(Math.random() * invoices.length)]
                }
                let lineItemPromises = _line_items.map(function(line_item) {
                    return line_item.setInvoice(getRandomInvoice())
                })
                return Promise.all(lineItemPromises)
            })
    })
    .then(function() {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function(err) {
        console.error(err);
        process.exit(1);
    });
