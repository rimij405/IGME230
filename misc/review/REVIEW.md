# Review Questions #

*This document contains review questions for the midterm and for the web application assignments.*

Hotlinks:
- [Midterm Review](#topics)
- [Web Application Review](#intro-to-web-applications)

*****

# Exam Format #
*The exam will follow this format:*
- Multiple Choice
- True/False
- Short Answer
- Short 'Coding' Questions:
    - HTML/CSS
    - JavaScript

*****

# Topics #
*A non-exhaustive list of topics covered as well as terms and questions associated with these topics.*

- [HTTP Protocol](#http-protocol)
- [FTP](#ftp)
- [Intro to Web](#intro-to-web)
- [Basic HTML](#basic-html)
- [Basic CSS](#basic-css)
- [CSS Rollovers](#css-rollovers)
- [Markdown](#markdown)
- [Web Publishing](#web-publishing)
- [Website Design Process](#website-design-process)
- [Intro to Web Applications](#intro-to-web-applications)

***

## HTTP Protocol ##
*HTTP Protocol is how the web is run.*
*Below are some review questions*

### Question 1 ###
**Who (the client or the server) sends *request headers*?**

*Request headers is an HTTP header sent by the client, containing information about the client, or information about resources to be fetched from the server.*

*These usually follow a request which is an actionable command like `GET`,*

```
GET /home.html HTTP/1.1
Host: developer.mozilla.org
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: https://developer.mozilla.org/testpage.html
Connection: keep-alive
Upgrade-Insecure-Requests: 1
If-Modified-Since: Mon, 18 Jul 2016 02:36:04 GMT
If-None-Match: "c561c68d0ba92bbeb8b0fff2a9199f722e3a621a"
Cache-Control: max-age=0
```

*or `POST`:*

```
POST /myform.html HTTP/1.1
Host: developer.mozilla.org
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
```

### Question 2 ###
**Who (the client or the server) sends *response headers*?**

*Response headers is an HTTP header sent by the server, containing information about the server itself, and additional information about a resource requested by a client (via request header).*

### Question 3 ###
**Who (the client or the server) sends *status codes*?**

*The server sends a status code in response to a request header sent to a client.*

### Question 4 ###
**What does the `403` status code mean?**

*`403 Forbidden` means the client does not have access rights to the content (eg. unauthorized), and the client's identity is known by the server.*

### Question 5 ###
**What does the `404` status code mean?**

*`404 Not Found` means the server cannot find the requested resource.*

### Question 6 ###
**What does the `301` status code mean?**

*`301 Moved Permanently` means the URI (Uniform Resource Identifier) of the requested resource has changed.*

### Question 7 ###
**Why is the `HOST` request header required?**

*`HOST` specifies the domain name of the server - without it you can't contact anything.*

### Question 8 ###
**Who (the client? the server? both?) can send text and/or images?**

*Both the client and server can send and receive text and images, albeit, utilizing different requests (resulting in different pairs of request and response headers).*

### Question 9 ###
**Give two ways to verify that we have successfully "turned off" banjo's PageSpeed module.**

*Pagespeed can strip spaces out of our code, minifying our CSS and JavaScript when we don't need it. We can check the page source of an uploaded file to see if it has had the identation and whitespace removed. For the other way of checking, the Pagespeed module convieniently has a response header named `X-Mod-Pagespeed`, which provides the version number of the module. If a response header contains this information, it is still active.*

### Question 10 ###
**How many .htaccess files can you have in a single folder?**

*Only one file will be read; they can't be merged. Although, you can theoretically upload as many as you wish.*

### Question 11 ###
**Suppose you upload a `.htaccess` file containing directives into your `www` folder. Which folder(s) would be affected by the file?**

*The current directory and any sub-directories. Other `.htaccess` files in the sub-directories will cascade applied settings upward through the tree.*

### Question 12 ###
***Clients* make requests to *servers*. Give an example of a typical HTTP *client*.**

*The browser.*

### Question 13 ###
**Between the Web browser and the server, numerous computers and machines relay the HTTP messages. Many of these operate at a lower layer in the [TCP/IP "stack"](https://en.wikipedia.org/wiki/Internet_protocol_suite) and are thus invisible to the client. What are these computers and machines called?**

*The Network, Internet, Transport and Application Layers consist of those machines and relays.*

### Question 14 ###
**[HTTP requests consist of the following](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview):**
- **an HTTP method such as ....**
- **the path of the desired ....**
- **the version of the ....**
- **optional headers that ....**
- **optionally a message body which could (for example) be an image to be uploaded**

- *...`GET`, `POST`, or `HEAD`, defining the operation the client wants to perform.*
- *...resource to fetch from the server, in the form of a URI/URL.*
- *...HTTP protocol.*
- *...convey additional information for the servers.*

### Question 15 ###
**[HTTP requests consist of the following](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview):**
- **The version of the HTTP protocol they follow**
- **A .... , indicating if the request has been successful, or not, and why.**
- **A ....**
- **HTTP headers, like those for requests.**
- **Optionally, a message body containing the fetched resource (ex. an HTML file).**

- *...status code...*
- *...status message describing the status code.*

***

## FTP ##
*FTP stands for File Transfer Protocol.*
*Below are some review questions*

### Question 1 ###
**Give the name (address) of the `http://people.rit.edu` web server (that you FTP files to).**

*[banjo.rit.edu](https://banjo.rit.edu)*

### Question 2 ###
**What are the numeric permissions that are required for web viewable *directories*?**

*`chmod 755`*

### Question 3 ###
**What are the numeric permissions that are required for web viewable *files*?**

*`chmod 644`*

***

## Intro to Web ##
*An introduction to web development and design workflows.*
*Below are some review questions*

### Question 1 ###
**Describe the 4 *layers* (or *pillars*) of web design.**

*Content - The raw data being presented: the text, the images, the sound, the video, other resources.*

*Structure - The `HTML` structures that raw data."

*Presentation - The `CSS` designs and formats the structured content."

*Behavior - The last layer adds functionality to the webpage, like with `JavaScript`."

### Question 2 ###
**What language do we use to add *structure* to a web page?**

*`HTML`*

### Question 3 ###
**Which layer of web design is responsible for how web pages look?**

*Presentation*

### Question 4 ###
**How can we add *behavior* to a web page?**

*Using `JavaScript` and the browser's JavaScript engine. (eg. V8 for Chrome)*

***

## Basic HTML ##
*Basic Hypertext Markup Language tenets.*
*Below are some review questions*

### Question 1 ###
**Give examples of HTML *semantic* elements (tags).**

*`<p>`*

### Question 2 ###
**Give examples of HTML5 *structural* elements.**

*`<div>`*

### Question 3 ###
**Give examples of *standalone* (or empty) elements.**

*`<link>`, `<img>`*

### Question 4 ###
**Give examples of *container* (or non-empty) elements.**

*`<section>`, `<p>`*

### Question 5 ###
**Give an example of an *absolute* file path.**

*`https://domain.com/examples/resource.jpg`*

### Question 6 ###
**Give an example of a *relative* file path**

*`../examples/resource.jpg`*

### Question 7 ###
**What kind of content are HTML tables appropriate for?**

*Data that needs to be presented in a scientific table/chart.*

***

## Basic CSS ##
*Basic Cascading Style Sheets tenets.*
*Below are some review questions*

### Question 1 ###
**What does CSS stand for?**

*Cascading Style Sheets*

### Question 2 ###
**Give an example of a CSS `type` selector.**

*`[src]`*

### Question 3 ###
**Give an example of a CSS `class` selector.**

*`.class`*

### Question 4 ###
**Give an example of a CSS `id` selector.**

*`#id`*

### Question 5 ###
**Give an an example of a style rule that utilizes the CSS `universal` selector?**

*The `universal` selector is the `*` wildcard.*

```
* {
    /* Center everything. */
    margin: 0px auto;
}
```

### Question 6 ###
**Give an example of a CSS `descendant` selector (aka descendant combinator)**

*`div p`*

### Question 7 ###
**What does `display:block` do?**

*Turns the selected element will turn into a block element.*

### Question 8 ###
**What does `display:inline` do?**

*Turns the selected element to become an inline element. Inline elements cannot be styled..*

### Question 9 ###
**What does `display:inline-block` do?**

*Turns element into an inline element that can have specified width and heights.*

### Question 10 ###
**What does `float:left` do?**

*Floats an element to the left, letting elements after it flow around it (if not `clear`).*

### Question 11 ###
**Define `inline`, `internal`, and `external` style sheets.**

*Inline styles happen in the HTML tags, internal takes place within a `<style>` element in the HTML, and an external CSS is used via a `<link>` tag.*

### Question 12 ###
**If these 3 types of styles conflict, which one usually "wins"?**

*`inline` styling.*

### Question 13 ###
**Imagine we write a CSS rule that effects the `color` of elements in the `<body>` tag - which elements on the page will `inherit` the value of this property?**

*All its children.*

### Question 14 ###
**Which CSS properties are commonly NOT inherited?**

*`background`, `border`, `clear`, `width`, `height`, `overflow`, `padding`, and `margin`.*

### Question 15 ###
**How large is a CSS *point* unit?**

*1pt = 1/72 of 1 inch.*

### Question 16 ###
**How large is a CSS *pixel* unit?**

*1px according to the dpi of the device. (96 dpi would make a pixel 1/96 of 1 inch).*

### Question 17 ###
**How large is an CSS *em* unit?**

*Relative to the font-size of the direct parent.*

### Question 18 ###
**How large is an CSS *ex* unit?**

*Relative to the x-height of the current font.*

### Question 19 ###
**Specify the CSS colors `red`, `green`, `blue`, `black`, and `white` in hexadecimal notation.**

- *Red: `#ff0000`*
- *Green: `#00ff00`*
- *Blue: `#0000ff`*
- *Black: `#000000`*
- *White: `#ffffff`*

### Question 20 ###
**Why is it a good idea to specify more than 1 font name in your CSS `font` rules?**

*Fallbacks.*

### Question 21 ###
**Once you set `position:absolute`, what are the other two CSS properties you will usually need to set?**

*`top` and `left`.*

### Question 22 ###
**What is the CSS property used to set the stacking order of HTML elements?**

*`z-index`.*

### Question 23 ###
**Describe the CSS box model.**

*Everything is a box! Things exist within other boxes. Define their dimensions!*

### Question 24 ###
**Describe the difference between `margin` and `padding`.**

*Margin is spacing outside the box; padding affects inside the box.*

### Question 25 ###
**Give at least 3 properties of the "box" that we can set (other than margin and padding).**

*`border`, `content`, `outline`, and `position`.*

### Question 26 ###
**What is the HTML tag used to connect to an external CSS file or an embedded font?**

*`<link>`*

### Question 27 ###
**What is the CSS property we use to define whether/how quickly a property will animate when changed?**

*`transition`*

***

## CSS Rollovers ##
*Interaction via CSS.*
*Below are some review questions*

### Question 1 ###
**Give the 4 CSS `pseudo selectors` that are used to create CSS rollover effects.**

*`:hover`, `:active`, `:focus`, and `:visited`.*

***

## Markdown ##
*Writing markdown.*
*Below are some review questions*

### Question 1 ###
**What is the syntax you would use for *headings*?**

*`# Headings are written with these tags. #`*

### Question 2 ###
**What is the syntax you would use for *lists*?**

```
- Lists are written like this.
- Okay.
```

### Question 3 ###
**What is the syntax you would use for *links*?**

*`[Link Text](href)`.*

### Question 4 ###
**What is the syntax you would use for *emphasis*?**

*`**surround with two asterisks**`*

### Question 5 ###
**What is the syntax you would use for *italics*?**

*`*surround with just one set of asterisks*`*

***

## Web Publishing ##
*Publishing websites.*
*Below are some review questions*

### Question 1 ###
**What is the difference between `serif` and `sans-serif` fonts?**

*`serif` fonts have the tail end while the other does not.*

### Question 2 ###
**What are decorative fonts and what are they good for?**

*Good for decoration; bad for body content.*

### Question 3 ###
**Which is generally more legible on-screen? (Hint: it's not serif)**

*`sans-serif`;Tails are harder to read en masse.*

### Question 4 ###
**Why do you need to worry about license restrictions with fonts?**

*Any font you use can technically be downloaded through the website.*

### Question 5 ###
**What image file format(s) should generally be used for photographs?**

*`.jpg` for photographs; `.png` for transparent images; `.gif` for animated frames.*

### Question 6 ###
**What image file format(s) should generally be used for web graphics such as logos and banners?**

*`.jpg` and `.gif`: they're pretty optimized for this.*

### Question 7 ###
**What are the 2 questions every navigation system should answer?**

*Where am I and where can I go?*

### Question 8 ###
**What does CRAP stand for?**

*Contrast, Reptition, Alignment, Proximity.*

### Question 9 ###
**Give a short summary of each CRAP principle.**

*TBD - Answer under construction.*

### Question 10 ###
**What does the "above the fold" design principle mean?**

*Content visible on initial page load.*

### Question 11 ###
**What is the *Rule of Thirds* and how does it apply to web pages?**

*Ways to format elements to be more enticing to users; aesthetic.*

### Question 12 ###
**Define *Responsive Design*.**

*Responsive design is all about developing for multiple end devices with different screens and interaction capabilities.*

### Question 13 ###
**What is the `name` of the `<meta>` tag you will need to add to all of your responsive (and mobile friendly) web pages?**

*`name=viewport`*

### Question 14 ###
**What properties of the browser does a media query commonly "test" for?**

*Screen height, width, orientation, and device type (eg. `screen`, `handheld`, and `tv`).*

***

## Website Design Process ##
*Summary of topic goes here*
*There were no questions provided for web design. Here are some notes, instead.*

### Phases of the Design Process  ###
*The overall process for designing a website consists of the following phases:*

1. Define the purpose.
2. Consider the audience.
3. Gather Ideas
4. Organize the Ideas
5. Write the Content
6. Organize the Content
7. Determine the Navigation
8. Sketch the Pages
9. Start up your computer!
10. Build Pages
11. Test
12. Iterate
13. Maintain
14. Archive

***

## Intro to Web Applications ##
*This topic deals with all types of web applications developed to run in a web browser, typically with the use of JavaScript.*
*Below are questions related to each section.*

Review Questions:
- [Introduction to Web Applications](#web-application-1)
- [Introduction to JavaScript](#web-application-2)
- [Introduction to Web Browser DOM](#web-application-3)
- [More Web Browswer DOM Methods](#web-application-4)
- [JavaScript Functions](#web-application-5)

### Web Application 1 ###
**Introduction to Web Applications**

#### Question 1 ####
**What is a *Web App*?**

*A computer program in which a client runs in a web browser.*

#### Question 2 ####
**What are the 3 major components of a web browser that can be scripted/controlled by a web developer?**

*The web layout engine, JavaScript engine, and Web Browser API's.*

#### Question 3 ####
**What languages are commonly used to "program" the** Web Layout Engine**?**

*HTML and CSS.*

#### Question 4 ####
**How are new web browser features proposed?**

*The browser vendors each attempt to implement new and experimental features which would then get reviewed by the other vendors and standard bodies.*

#### Question 5 ####
**Who is in charge of web standards - the standards bodies or the browser vendors?**

*Both - browser vendors implement new features and the standard bodies monitor usage before deciding on a standard to employ, based on the usage of features in the by the browser vendors.*

#### Question 6 ####
**List 3 places a web developer can find "web app" documentation.**
- *Mozilla's Developer Guide.*
- *WHATWG's specs and standards.*
- *W3C's W3Schools documentation site.*

***

### Web Application 2 ###
**Introduction to JavaScript**

#### Question 1 ####
**Which versions of JavaScript will we be covering in this course?**

*ES5 (ECMAScript 5) and ES6 (ECMAScript 6).*

#### Question 2 ####
**Which JavaScript keyword declares *variables*?**

*`let`*

#### Question 3 ####
**Which JavaScript keyword declares *constants*?**

*`const`*

#### Question 4 ####
**What happens when you try to change the value of a previously declared *constant value*?**

*The program will throw a `TypeError` due to attempted assignment to a constant.*

#### Question 5 ####
**What are the 5 built-in JavaScript "primitive" data types?**

*They are `undefined`, `null`, `boolean`, `string`, and `number`.*

#### Question 6 ####
**What kinds of values can a `Number` type hold?**

*All numbers are always 64-bit double precision floating point values.*

***

### Web Application 3 ###
**Introduction to Web Browser DOM**

#### Question 1 ####
**What does "CRUD" stand for?**

*Create, Retrieve, Update, and Delete.*

#### Question 2 ####
**What happens when we try to use JavaScript DOM methods to access the contents of a page before it has loaded?**

*Elements, before the page loading, aren't initialized or even declared. JavaScript will not have references to these elements in this event.*

#### Question 3 ####
**What is the name of the DOM method that will return the first element that matches the given selector?**

*`querySelector()`*

#### Question 4 ####
**What is the name of the DOM method that will return** all **elements that match the given selector?**

*`querySelectorALL()`*

#### Question 5 ####
**Which property is used to get and set the text and HTML contents of an HTML element?**

*`innerHTML`*

#### Question 6 ####
**Which property is used to get and set the CSS styles of an HTML element?**

*`style`*

#### Question 7 ####
**Write a line of JavaScript that sets the `background-position` style property of an element to the value of `"top"`.**
*`querySelector("#example").style.backgroundPosition = "top";`*

#### Question 8 ####
**Give 2 ways to loop through an array.**
- *The `for...in` loop. Loops through the array's names.*
- *The `for...of` loop. Loops through the values of iterable objects in the array.*

#### Question 9 ####
**Compare and contrast "View Source" versus the capabilities of the Web Inspector. Which method gives the developer a "live" view of the current HTML and CSS of a page?**

*The Developer Console (Web Inspector) provides a 'live' view of the HTML and CSS on a page, including reflections of any edits made to the page.*

#### Question 10 ####
**How can we add breakpoints to our code in the debugger, and inspect the values of variables?**

*Breakpoints can be added via the `debugger;` call, or, if you are using Chrome, through the Developer Console's UI options. The Dev. Console can also handle placing breakpoints on DOM elements, given a trigger for modification of the element itself.*

#### Question 11 ####
**What does the `debugger;` statement do?**

*The `dubuggger;` statement will stop code execution of the following line, and, if possible, call a debugging function. This only occurs when debugging is enabled.*

***

### Web Application 4 ###
**More Web Browser DOM Methods**

#### Question 1 ####
**Exactly how many *parent* elements can an element on a web page have?**

*Every element can have exactly one parent.*

#### Question 2 ####
**What are the *child* elements of the `<ul>` tag in `more-dom-4.html`?**

*The `<li>` elements containing anchors (`<a>` elements).*

#### Question 3 ####
**What is the *first-child* of the `<ul>` tag in `more-dom-4.html`?**

*The Apple `<li>` element.*

#### Question 4 ####
**What is the *last-child* of the `<ul>` tag in `more-dom-4.html`?**

*The Google `<li>` element.*

#### Question 5 ####
**What is the *next-sibling* of the "Google" `<li>` tag in `more-dom-4.html`?**

*Nothing, there is no sibling after this element.*

#### Question 6 ####
**What is the *previous-sibling* of the "Google" `<li>` tag in `more-dom-4.html`?**

*It would technically be Apple, but, there is no previous-sibling preprocessor command in CSS.*

#### Question 7 ####
**What is the *first-child* of the "Google" `<li>` tag in `more-dom-4.html`?**

*The `<a>` element containing, "Google," display text.*

#### Question 8 ####
**What is the *parent* of the "Google" `<li>` tag in `more-dom-4.html`?**

*The `<ul>` element.*

***

### Web Application 5 ###
**JavaScript Functions**

#### Question 1 ####
**What is a *block*?**

*A block is an area of code contained within a set of curly braces.*
```
{ // This is a block. By themselves, they don't introduce a scope. }
```
*It is used to group code statements together.*

#### Question 2 ####
**Define *scope*?**

*Scope is the accessibility and visibility of the variables inside of it. Of note, there are two important scopes: local and global scope. A scope is usually introduced with a named scope - functions.*

#### Question 3 ####
**Declaring a variable with `let` or `const` at the top level of the `<script>` tag (outside of any other blocks or functions) gives it what kind of *scope*?**

*Global scope.*

#### Question 4 ####
**Declaring a variable with `let` or `const` inside of a `for` loop of a function gives it what kind of *scope*?**

*Block scope, scoped to the block the for loop is created with.*

#### Question 5 ####
**What does the `debugger;` statement do?**

*The `dubuggger;` statement will stop code execution of the following line, and, if possible, call a debugging function. This only occurs when debugging is enabled.*

#### Question 6 ####
**What does D.R.Y stand for and *mean*?**

*Don't Repeat Yourself: algorithms and functionality should be defined only once in a code. (You can implement/use a function as many times as you wish, but, you shouldn't have multiple versions of the same algorithm). We do this because we don't want to have to update each instance of the algorithm whenever we make some kind of changes; having it in one place simplifies our jobs.*

***

### Web Application 6 ###
**JavaScript Events**

#### Question 1 ####
**Give 2 advantages to using *event listeners* instead of *event handlers***.

1. *Event listeners can easily be removed making event handling modular.*
2. *Event listeners allow elements to keep track of multiple events and call multiple functions for one event, instead of just one."

#### Question 2 ####
**Give a situation where you might use an *event handler* anyway.**

*You want to ensure elements only have one event and just that one event to be handled.*

#### Question 3 ####
**What does an event handler (or event listener) "point" at?**

*Points to function references that can be called back at a later point in time.*

#### Question 4 ####
**What are the two advantages of using arrow functions?**

*Shorter syntax and ability to call top-level functions since it doesn't bind this to the element, and, this is bound to the execution element (in some cases, window).*

***

### Web Application 7 ###
**JavaScript Object Literals**

#### Question 1 ####
**In programming, what is a literal value?**

*A representation for a fixed value, interpreted in the exact way it is written.*

#### Question 2 ####
**How do you iterate over the keys and values of an object?**

*By using the for...in or for...of loops, we can go through the keys (object properties) or their values.*

#### Question 3 ####
**What is the difference between for...in and for...of? (You don't want to get these 2 mixed up!)**

*For...in loops over object properties (a.k.a. keys) and for...of iterates over the object's values.*

#### Question 4 ####
**List 3 JavaScript value types.**

*Number, String, and Boolean*

#### Question 5 ####
**List 3 JavaScript reference types.**

*Array, Function, and Object.*

#### Question 6 ####
**What does Object.seal() do?**

*Object.seal() prevents new properities from being added, but, keeps existing properties editable.*

#### Question 7 ####
**What does Object.freeze() do?**

*Object.freeze() prevents the addition (and removal) of properties to the sealed object, and makes existing properties immutable.*

#### Question 8 ####
**What is wrong with the following code?**

```
var ship = {
    x: 0,
    y: 0,
    speed: 10,
    move: function() {
            x += speed;
            y += speed;
        }
}
```

*The x, y, and speed values should have a 'this' reference in order to be modified.*

***

### Web Application 8 ###
**JavaScript Arrays**

#### Question 1 ####
**True or False. JavaScript Arrays may hold only a single *type* of value.**

*False. JavaScript Arrays are not strongly typed.*

#### Question 2 ####
**Which array operation adds an item to the end of an array?**

*`Array.push()`.*

#### Question 3 ####
**Which array method can be used to *remove* items from an array?**

*`Array.pop()` and `Array.shift()`*

#### Question 4 ####
**Which array method can be used to *copy* items to a new array?**

*`Array.slice()`.*

#### Question 5 ####
**Describe 3 ways to loop through a JavaScript array.**

*The classic `for` loop, the `for...of` loop (directly accessing values), and the `Array.forEach()` function, calling a function on each member of the array, although, this one can't be broken out of.*

#### Question 6 ####
**Does `Array.filter()` modify the old array (the one it is called on), or create a new array?**

*Creates a new array of elements.*

#### Question 7 ####
**What is the type of the object that is returned by `document.querySelectorAll()`?**

*A `NodeList`.*

#### Question 8 ####
**Using *method chaining* (at least 2 methods) and `Math` and `Number` methods, write code that produces a random number with only 2 digits past the decimal point.**

*`Math.random().toFixed(2);`.*

#### Question 9 ####
**Define *Fluent interface*.**

*JavaScript libraries that can be read like an ordinary written language.*

***

### Web Application 9 ###
**Web Storage**

#### Question 1 ####
**What is a limitation of using localStorage on a shared domain like people.rit.edu? What is a workaround that will mitigate this issue?**

*When sharing group space (rit.edu), each localStorage key can be overwritten if multiple students use the same one. Using a unique prefix will ensure the keys never conflict.*

#### Question 2 ####
**What is the difference between local and session storage?**

*Local storage persists, even when the browser is closed and reopened.*

#### Question 3 ####
**If the user opens up the demo page in a different web browswer on the same machine, will their chosen preferences still be visible? Why or why not?**

*No. Local storage is assigned on a per-browser basis. Firefox will not access the same storage as Chrome.*

#### Question 4 ####
**Define *serialization*.**

*Serialization is the act of formating data in some way, for transport, to be translated back into the original data structure, at some point, later on in the process.*

#### Question 5 ####
**What does `JSON.stringify()` do?**

*`JSON.stringify()` serializes a data object in JavaScript Object Notation, into a string, for storage.*

#### Question 6 ####
**What does `JSON.parse()` do?**

*`JSON.parse()` takes a serialized string, and deserializes it, returning an array in JavaScript Object Notation.*

#### Question 7 ####
**One big issue with the applications we have written this semester is that reloading the page will wipe out all of the user's work (for example the poem they created in *Magnetic Poetry*, or, their pixel art creation in *Pixel Artist*). Think about the various HW assignments that we have worked on for this Web Apps unit - pick two of them - and describe how they could be improved by utilizing web storage.**

*Save favorites from the random phrases generator, or, keep a highscore for the chibi matching game.*

*****

*[Back to Top](#review-questions)*