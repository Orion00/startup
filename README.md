# ArkhamHandDB

## Specifications

### Elevator Pitch
Have you ever wanted an extra hand while playing Fantasy Flight's Arkham Horror: The Card Game? Well, now you've got one. Need someone to point to where you left your drink? ArkhamHand's got you. Need a random token or item? ArkhamHand's got you. Need a log of the last time you played, a place for new deck ideas, a campaign log, or just somewhere to remember which part of the heist you've pulled off? ArkhamHand's got your back. Figuratively. Mostly figuratively. Use ArkhamHand to simplify your Arkham experience.

### Design
Homepage
![Homepage](/Images/Mockup/Home.png)
Chaos token bag
![Chaos bag](/Images/Mockup/ChaosBag.png)
Drink finder
![Drink pointer](/Images/Mockup/DrinkPointer.png)
Campaign Log
![Campaign log](/Images/Mockup/CampaignLog.png)
Notepad
![Notepad](/Images/Mockup/Notepad.png)
List randomizer
![List page](/Images/Mockup/RandomList.png)

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

**WebSocket:** Random Arkham joke/meme displayed at login

**React:** Used for simpler website building
