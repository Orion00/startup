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
-Add all images for themes
-Make cursor change for theme
-Get a better favicon (crop CthulhuBusiness? Have Phoenix or I draw one?)

DB should store campaign log and chaos bag in Campaign folder. Last played date and time and notepad should be per player.


> "You cast the spell, that makes you the witch" -Frida

