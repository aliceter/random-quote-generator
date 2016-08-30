// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

var quotes = [
    {
        quote: "Never let your sense of morals prevent you from doing what is right.",
        source: "Isaac Asimov",
        citation: "Foundation",
        year: "1944",
        tags: ["fiction", "moral"],
    },
    {
        quote: "Any fool can know. The point is to understand.",
        source: "Albert Einstein",
    },
    {
        quote: "It is amazing how complete is the delusion that beauty is goodness.",
        source: "Leo Tolstoy",
        citation: "The Kreutzer Sonata",
        tags: ["delusion", "wisdom", "beauty"]
    },
    {
        quote: "Knowing others is intelligence, knowing yourself is true wisdom. Mastering others is strength, mastering yourself is true power.",
        source: "Lao Tzu",
        citation: "Tao Te Ching",
        tags: ["wisdom", "philosophy"]
    },
    {
        quote: "I'm not young enough to know everything.",
        source: "J.M. Barrie",
        citation: "The Admirable Crichton",
        tags: ["wisdom"]
    },
    {
        quote: "The older I grow, the more I distrust the familiar doctrine that age brings wisdom.",
        source: "H.L. Mencken",
        tags: ["humor", "wisdom"]
    }
];


// Collects the indices of the unshown quotes
function getUnshownQuotes() {
    var unshownQuotes = [];
    
    // Traverses the quotes array in search for quotes that are not yet shown
    // and pushes then to an array that will be returned
    for (var i = 0; i < quotes.length; i++) {
        if (! quotes[i].hasOwnProperty("shown") || quotes[i].shown === false) {
            unshownQuotes.push(i);
        }
    }
   
    // Returns the not yet shown quotes 
    return unshownQuotes;
}

// Resets the shown quotes to unshown 
function resetQuotes() {
    // After each quote has been shown we need put each quote's shown property
    // false, therefore the traversing
    for (var i = 0; i < quotes.length; i++) {
        quotes[i].shown = false;
    } 
}

// Selects a random quote object from the quotes array
function getRandomQuote() {
    // Get the quotes that aren't yet shown
    var unshownQuotes = getUnshownQuotes();
    
    // If there aren't any unshown quotes, reset the quotes and get all the
    // quotes
    if (unshownQuotes.length === 0) {
        resetQuotes();
        unshownQuotes = getUnshownQuotes();
    }

    // Get a random number from the index array
    // Math.floor(Math.random() * (max - min + 1)) + min
    // max: unshownQuotes.length - 1, min: 0
    var randomNumber = Math.floor(Math.random() * unshownQuotes.length);

    // Get the actual quote 
    var quote = quotes[unshownQuotes[randomNumber]];

    // Mark the quote as shown
    quote.shown = true;
    // Returns the randomly selected quote object
    return quote;
}

// Prints the quote to the page 
function printQuote() {
    // Gets the random quote
    var quote = getRandomQuote();

    var html = '<p class="quote">';
    html += quote.quote;
    html += '</p> <p class="source">';
    html += quote.source;

    // If there's a citation field in the quote it's added to the html
    if (quote.hasOwnProperty("citation")) {
        html += '<span class="citation">';
        html += quote.citation;
        html += '</span>';
    }
     
    // If there's a year field in the quote it's added to the html
    if (quote.hasOwnProperty("year")) {
        html += '<span class="year">';
        html += quote.year;
        html += '</span>';
    }
    html += '</p>';

    // If there are tags they are traversed and added to the html 
    if (quote.hasOwnProperty("tags")) {
        html += '<p class="tags">Tags: ';
        for (var i = 0; i < quote["tags"].length; i++) {
            html += '<span class="tag">';
            html += quote.tags[i];
            html += '</span>';
        }
        html += '</p>';
    }

    // The html is placed in the 'quote-box'
    document.getElementById("quote-box").innerHTML = html;
}
