# Tech Educators Bootcamp Week 02 Assignment

## Build a Cookie Clicker

### Task

Create a simple interactive game as a fun distraction for the visitors to a company website.

<br>
<br>
### Areas to cover

- Create the HTML, CSS structure and layout
- Positioning elements on the page
- Adding event listeners to elements
- Using JavaScript to manipulate the Document Object Model
- Saving and retrieving data in local storage
- Follow the supplied design notes and example
<br>

### Design notes, additions and changes

User stories were produced as a definition as to the scope of the project (see user stories folder)

A basic wireframe was created and utilised to plan the layout (see design assets folder)

The example website was followed as a guide, but with the bonus values were adjusted downwards to slow the time it takes to amass large numbers of cookies.

Uses local data storage to save and retrieve game data. It was found that only item totals, cookie count and cookies per click were necessary items to store in an object.

I created a cookie image with a transparent background for the main user input clicks. 

When hovering the mouse over buttons , the colour of the background changes with a gradual transition.  

Animation was added to make the cookie move when clicked.

When an item is purchased, the number of current items of that type is animated to highlight the increase.

When an item purchase is unsuccessful, the page responds with a random message to the user to indicate that insufficient cookies are owned to purchase the item. This message is cleared after a short timeframe.

Uses CSS grid functionality to display the inventory of items and statistics.

Uses classes to abstract away the statistics and operation of the user inventory and purchasing functionality. Also to separate the functionality for updating the DOM. This was done to separate concerns and reduce complexity.

Numbers on screen are formatted with commas as thousand separators

Utilised an open source font (Roboto).

Added some subtle letter spacing to improve the design. 

Timers are utilised for:

- Handling cookie numbers and cookies per click updates - every elapsed second
- Removing elapsed user messages
- Launching temporary time-based animation events

Event listeners are utilised for:

- Monitoring buy buttons for clicks
- Monitoring if the reset button is clicked
- Monitoring if the cookie button has been clicked


### Stretch goals

The following stretch goals were implemented

- Styling: Includes a custom layout, better looking than the orginal, using a theme based on cookie colours

- Styling: Implemented a cookie animation on click

- Upgrades: Added an extra item for purchasing, namely a 'Big Factory'


