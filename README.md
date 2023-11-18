# ArkhamHandDB
[Current iteration](https://startup.tinyproject.click/)

## Specifications

### Elevator Pitch
Have you ever wanted an extra hand while playing Fantasy Flight's Arkham Horror: The Card Game? Well, now you've got one. Need someone to point to where you left your drink? ArkhamHand's got you. Need a random token or item? ArkhamHand's got you. Need a log of the last time you played, a place for new deck ideas, a campaign log, or just somewhere to remember which part of the heist you've pulled off? ArkhamHand's got your back. Figuratively. Mostly figuratively. Use ArkhamHand to simplify your Arkham experience.

### Design
Homepage
![Homepage](/Assets/Mockup/Home.png)
Chaos token bag
![Chaos bag](/Assets/Mockup/ChaosBag.png)
Drink finder
![Drink pointer](/Assets/Mockup/DrinkPointer.png)
Campaign Log
![Campaign log](/Assets/Mockup/CampaignLog.png)
Notepad
![Notepad](/Assets/Mockup/Notepad.png)
List randomizer
![List page](/Assets/Mockup/RandomList.png)

### Key Features
- Last played time and date
- Random Arkham joke/meme each login
- Drink pointer outer
- Chaos Bag Puller 
- Campaign Log
- Notepad for new deck ideas and "remember that..." prompts
- Randomly select Location/Item from a list
- Deckbuilding hopefully (Grabbing DB from someone who has scanned all 2,000 cards)

### Technologies Used
**HTML:** Builds the 6 HTML pages needed, with hyperlinks on each page to lead to each other page

**CSS:** Used to display well on different screen sizes, freshens up appearance

**JS:** Allows login, editing chaos bag, campaign log, and notepad

**Authentication:** Users login to access preferences and personal features

**Database data:** User's last played time and date, user's last chaos bag setup, user's last campaign log, and user's notepad are all saved on a database.

**WebSocket:** Sends a notification to other users when someone else logs on

**React:** Used for simpler website building

### HTML Deliverables

For this deliverable I built out the structure of my application using HTML.

**HTML pages:** One page for each function of the website. Home page, 3 randomizers (Chaos bag, drink finder, and random list), and 2 notes pages (Campaign log and notes)

**Links:** The home page links to each other page, the rest have a head that contains a navigation bar.

**Text:** Not a ton of straight text, most of it is contained on the home page

**Images:** Static images for now, but I want to swap them out based on the theme a user has chosen (for example, in Chaos bag)

**Login:** Login is available in the header on each page

**Database:** Database will store last time visited, preferred theme, and notes. Static text exists there for now.

**WebSocket:** Header will display when someone else logs on. Static text exists there for now.

### CSS Deliverables

For this deliverable I used primarily bootstrap to make the website worth looking at for more than 10 seconds.

**Header, footer, and main content body** It exists and is consistent

**Navigation elements** I changed the color for my one link, and built a nav bar at the top. Unfortunately I think it needs JS when it resizes so the menu doesn't drop down yet.

**Responsive to window resizing** Website designed to fit well on phones and monitors

**Application elements** Used consistent colors and a theme

**Application text content** No change to default bootstrap fonts, I'll add this later if I have time

**Application images** Plenty of images, all responsive to screen size

### JS Deliverables

**Future Login** I've got a login box that saves username and password in session storage for now. Don't know how to check against database yet.

**Future Database Data** Currently console.logging all information other than username and password I'd like to save besides the campaigns page, where it's stored in local storage.

**Future Websocket** "User####" text on homepage currently generates a random username every 2-4 seconds. I plan to have only the most recent logged on user show up.

**Interaction Logic** Notepad names are editable. Almost all buttons animate, save, clear, randomize, and anything else advertised. Still working on stir bag, pull token, add campaign, and remove campaign. (Liberal use of ChatGPT to debug and learning how to write functions. It's also far better at documenting code than I am)

### Service deliverable
For this deliverable I added several front and backend endpoints to communicate user information.
I didn't have time to add calls for chaos bag updating, campaign log updating, or notepad updating.
Currently those 3 save changes in local storage, I intend to add the changes to the server as well in the next few days.

**Node.js/Express HTTP service** Started

**Static middleware for frontend** Done

**Calls to third party endpoints** Simple random quote API on home page

**Backend service endpoints** Placeholders for login that stores the current user on the server. Missing GET and POST endpoints for chaos bag, campaign log, and notepads

**Frontend calls service endpoints** Done using fetch

### DB deliverable
For this deliverable I stored created users and their data on a database.

**MongoDB Atlas database created** Done

**Endpoints for data** I finished storing username, chaos tokens, and campaigns in the database. For some reason the notes section is giving me trouble, so that's not working right now.

**Stores data in MongoDBs** Almost done. See above.

