# These are apparently my 260 notes

Even though I have my notes in a separate doc. Maybe someday I'll switch over.

Anyone curious about my startup should checkout the [README](README.md)

#IP for the startup
http://35.171.205.9/

#SSH
ssh -i ~/keys/production.pem ubuntu@35.171.205.9

#Copy files
scp -i ~/keys/production.pem [file to be copied] ubuntu@35.171.205.9:/public_html/[file to be copied]

#Deploy (simon or startup) (run in directory of what you want copied)
./deployFiles.sh -k ~/keys/production.pem -h tinyproject.click -s simon
./deployFiles.sh -k ~/keys/production.pem -h tinyproject.click -s startup

./deployService.sh -k ~/keys/production.pem -h tinyproject.click -s simon
./deployService.sh -k ~/keys/production.pem -h tinyproject.click -s startup

Startup Features:
-Random joke
-Drink pointer (randomized arrow that says where to put your drink)
-Bag Puller (select box to automagically removes curse tokens) (Noise when pulling?)
-Last played time and date (DB)
-Arkham Jokes/Memes
-Randomly select location/Item
-Campaign log
    -Memorable Moments at the end of each mission (Autofailed the shotgun blast)
-Notepad
    -"Remember that you..." prompts
    -New Deck ideas/Names
    -Add/Remove notepad buttons
    -Way to change notepad name
-Deckbuilding eventually (stealing DB from someone who has scanned all 2,000 cards)

TODO:
-Add all images for themes (make hand images smaller, get color tentacle)
-Make cursor change for theme
-Get a better favicon (crop CthulhuBusiness? Have Phoenix or I draw one?)
-Find new font family
-Make the active page darker on nav bar
(JS)
-(Campaign Log) Switch to new campaign when creating new campaign
-(Campaign Log) Save when hitting enter
-(Campaign Log) Modal checks if investigator name is legal
-(Campaign Log) Fix adding more than 1 duplicate campaign breaks things
-(Campaign Log) Add "remove campaign" functionality
-(Drink Pointer) Protect the spin from being spammed. Generated a 0 and that causes crashes?
-(Chaos Bag) Make Adding token not jumpy when it doesn't exist (Make it invisible?)
-(Index) Theme change (local cache save theme name and then manually change every src to use that folder)
-(Notes) Char limit to renaming note pads
-(Notes) Connect clear and save buttons to database
-(Notes) Fix adding more than 1 duplicate notepad name breaks things

DB should store campaign log and chaos bag in Campaign folder. Last played date and time and notepad should be per player.


> "You cast the spell, that makes you the witch" -Frida

> "Experience is not what happens to a man. It is what a man does with what happens to him." -Aldous Huxley

### Midterm Review "Study" guide
In the following code, what does the link element do?
    
    Connects html to other documents <link rel="stylesheet" href="styles.css">

In the following code,  what does a div tag do?

    Creates a block element

In the following code, what is the difference between the #title and .grid selector?

    .grid is a class, #title is ID tag

In the following code, what is the difference between padding and margin?

    Padding inherits background color, margin is external to the box
![Alt text](Assets/Midterm%20Review/cssBoxModel.jpg)

Given this HTML and this CSS how will the images be displayed using flex?

    Flex displays its children in a flexible orientation.
    display: flex;
    flex-direction: row;

What does the following padding CSS do?

    Makes something bigger

What does the following code using arrow syntax function declaration do?

    Creates an unnamed function

What does the following code using map with an array output?

    Applies function to every member of the array
    const a = [1, 2, 3];
    console.log(a.map((i) => i + i));
    // OUTPUT: [2,4,6]
    console.log(a.reduce((v1, v2) => v1 + v2));
    // OUTPUT: 6
    console.log(a.sort((v1, v2) => v2 - v1));
    // OUTPUT: [3,2,1]

    a.push(4);
    console.log(a.length);
    // OUTPUT: 4
    #First value, p is accumulator (can set default) and c is current value (like Fibonacci)
    console.log(
        'reduce',
        numbers.reduce((p, c) => p + c)
    );

    #Returns all items in the list where it returns T or 1
    Whenever the function is 
    console.log(
        'filter',
        numbers.filter((n) => n % 2)
    );

    #Returns if at least one item in n is >= 5
    console.log(
        'some',
        numbers.some((n) => n > 5)
    );


What does the following code output using getElementByID and addEventListener?

    onclick=’alert(“clicked”)’
    Const submitDatEl = document.querySelector(‘#t’);
    submit.DataEL.addEventListener(‘click”, function (event) { console.log(‘clicked’) }
    Outputs something if the selected element is clicked.


What does the following line of Javascript do using a # selector?

    Selects an ID
    <div id="foo\bar"></div>
    <div id="foo:bar"></div>

    <script>
        console.log("#foo\bar"); // "#fooar" (\b is the backspace control character)
        document.querySelector("#foo\bar"); // Does not match anything

        console.log("#foo\\bar"); // "#foo\bar"
        console.log("#foo\\\\bar"); // "#foo\\bar"
        document.querySelector("#foo\\\\bar"); // Match the first div

        document.querySelector("#foo:bar"); // Does not match anything
        document.querySelector("#foo\\:bar"); // Match the second div
    </script>

Which of the following are true? (mark all that are true about the DOM)

    
    Can edit anything in the DOM with JS
    Function displayElement(el) {
        console.log(el.tagname);
        For (const child of el.children) {
            Display Element(child);
        }
    }

    displayElement(document);
    #Prints all elements of the DOM using recursion

    Const listElement = document.querySelctorAll(‘p’);
    #Grabs all p tag elements

    Const listListelements = document.querySelector(“#id”)
    #Finds everything with an ID of t

    Function insertChild(selector, text) {
        Const newChild = document.createElement(‘div’);
    newChild.textContent = text;

    Const ParentElement = document.querySelector(selector);
    parentElement.append(newChild);
    }


By default, the HTML span element has a default CSS display property value of: 

    display: inline;

How would you use CSS to change all the div elements to have a background color of red?

    div {
        background-color: red;
    }

How would you display an image with a hyperlink in HTML?

    <a href="#">
        <img src="image.png">
    </a>

In the CSS box model, what is the ordering of the box layers starting at the inside and working out?

    See above

Given the following HTML, what CSS would you use to set the text "troubl" to green and leave the "double" text unaffected?

    div.troubl {}

What will the following code output when executed using a for loop and console.log?

    Not sure

How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?

    const elem = document.getElementById("para");
    elem.style.color = newColor;

What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?

    <p>
    <ol>
    <ul>
    <h2>
    <h1>
    <h3>

How do you declare the document type to be html?

    <!DOCTYPE html>
    <html lang="en">    

What is valid javascript syntax for if, else, for, while, switch statements?

    function connectDatabase() {
        throw new Error('connection error');
    }

    try {
        connectDatabase();
        console.log('never executed');
    } catch (err) {
        console.log(err);
    } finally {
        console.log('always executed');
    }

    if (condition1) {
        //  block of code to be executed if condition1 is true
    } else if (condition2) {
        //  block of code to be executed if the condition1 is false and condition2 is true
    } else {
        //  block of code to be executed if the condition1 is false and condition2 is false
    }

    switch (new Date().getDay()) {
        case 4:
        case 5:
        text = "Soon it is Weekend";
        break;
    case 0:
    case 6:
        text = "It is Weekend";
        break;
    default:
        text = "Looking forward to the Weekend";
    }

    for (let i = 0; i < 5; i++) {
        text += "The number is " + i + "<br>";
    }

    while (i < 10) {
        text += "The number is " + i;
        i++;
    }

What is the correct syntax for creating a javascript object?

    const person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
    const person = new Object();
    person.firstName = "John";
    person.lastName = "Doe";
    person.age = 50;
    person.eyeColor = "blue";

Is is possible to add new properties to javascript objects?

    Unfortunately yes.

If you want to include JavaScript on an HTML page, which tag do you use?

    <script src="myScript.js"></script>

Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?

    const text = 'Both cats and dogs are pets, but not rocks.';

    const objRegex = new RegExp('cat?', 'i');
    const literalRegex = /cat?/i;
    console.log(text.match(literalRegex));

    const petRegex = /(dog)|(cat)|(bird)/gim;

    console.log(text.match(petRegex));
    console.log(text.replace(petRegex, 'animal'));
    console.log(petRegex.test(text));

    return arrays;

Which of the following correctly describes JSON?

    Lightweight format for storing and transporting data (esp server to browser)

What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo  do?

    chmod changes permissions
    pwd prints where you are (directory)
    cd moves directories
    ls lists files
    vim, nano console editor
    mkdir makes director
    mv moves/renames file
    rm deletes
    man shows docs of command
    ssh remotely connects to comething
    ps display a list of your processes that are currently running and obtain additional information about those processes
    wget downloads files from internet
    sudo runs as super user

Which of the following console command creates a remote shell session?

    ssh

Which of the following is true when the -la parameter is specified for the ls console command?
   
    -a shows all files (including .), -l shows long listing format

Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?

    TLD .click
    Root Domain banana
    Subdomains fruit, bozo



Is a web certificate is necessary to use HTTPS?

    Yes. Server sends a public key encrypted by certificate service that we decrypt.

Can a DNS A record can point to an IP address or another A record?

    Points to IP Address (or a URL for that IP Address).

Port 443, 80, 22 is reserved for which protocol?

    443: HTTPS
    80: HTTP
    22: SSH

What will the following code using Promises output when executed?

    To create a promise:
    const tossCoin = new Promise((resolve, reject) => {
        set timeout() => ...function

    })
    Promise Syntax
    ```javascript
    tossCoin
    .then (Returned value once it's done)
    .catch (error)
    .finally()
    
    ```
    
    Async/Await syntax
    ```
    try {
        const result = await tossCoin;
    } catch (err) {

    } finally (always resolved) {

    ```
    
    }