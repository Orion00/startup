# ArkhamHandDB

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

TODO: Update this to be for my project

For this deliverable I built out the structure of my application using HTML.

**HTML pages:** One page for each function of the website. Home page, 3 randomizers (Chaos bag, drink finder, and random list), and 2 notes pages (Campaign log and notes)
**Links:** The home page links to each other page, the rest have a head that contains a navigation bar.
**Text:** Not a ton of straight text, most of it is contained on the home page
**Images:** Static images for now, but I want to swap them out based on the theme a user has chosen (for example, in Chaos bag)
**Login:** Login is available in the header on each page
**Database:** Database will store last time visited, preferred theme, and notes. Static text exists there for now.
**WebSocket:** Header will display when someone else logs on. Static text exists there for now.
