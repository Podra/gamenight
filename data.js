'use strict';
/* Content lists. One item per line; add your own anywhere. */
const L = s => [...new Set(s.trim().split('\n').map(x => x.trim()).filter(Boolean))];

const SIL_Q = L(`
This wasn’t the coffee I ordered.
I asked for no onions.
Is the soup of the day just regular soup?
We’ve been waiting for forty minutes.
Can I get this to go?
I’d like to speak to the manager.
Sir, this is a Wendy’s.
There’s a hair in my salad.
Does this come with fries?
I’m not paying for the bread.
The card machine says declined.
Can we get separate checks?
You forgot my extra sauce.
I was here first.
Table for one, please.
That’s not what the menu said.
Is the fish fresh?
We have a reservation under Johnson.
Why is the ice cream melted?
I only came in for the free samples.
I think you gave me someone else’s order.
Do you have anything that isn’t on the menu?
I’ll just have water, thanks.
Is the tip included?
This steak is not medium rare.
Who ordered the salad?
Excuse me, my fork is dirty.
I’d like to return this sandwich.
The kitchen is closed.
Can you recommend something spicy?
I’m not mad, I’m just disappointed.
Who ate my leftovers?
I think we should see other people.
We need to talk about the dishes.
You never listen to me.
I can’t believe you told her.
Did you just take the last slice?
I thought you were bringing the napkins.
That’s my side of the bed.
You said you’d be home an hour ago.
It’s not you, it’s me.
Please stop chewing so loudly.
Who left the lights on again?
You’re wearing that?
I love you, but that was rude.
Why is there a sock in the sink?
I’ve been waiting up all night.
Did you water the plants?
Is that my shirt?
We agreed on no more pets.
I’m going to need a hug right now.
Meet me by the fountain at noon.
This meeting could have been an email.
I’ll circle back on that.
Let’s take this offline.
Who scheduled a meeting at 8 a.m.?
You’re on mute.
Can everyone see my screen?
I’m just going to jump in here.
That’s above my pay grade.
Per my last email.
I need that report by Friday.
We’re a family here.
Who’s been microwaving fish again?
Please do not reply all.
I’m going to need a raise.
I quit.
Has anyone seen my stapler?
The printer is jammed again.
Nobody told me it was casual Friday.
I’m on a conference call, don’t come in.
I don’t get paid enough for this.
Let’s synergize our deliverables.
We’re going to need to pivot.
Is this seat taken?
Please remain seated until the plane has landed.
This is your captain speaking.
Do you have any identification?
Step away from the vehicle.
You can’t park there.
Sir, you’re going the wrong way.
Where’s the nearest bathroom?
My luggage is missing.
Are we there yet?
I think we’re lost.
The GPS said turn left.
Please fasten your seat belt.
That’s my window seat.
Can you please put your seat up?
I didn’t pack enough socks.
Is this the line for the ride?
You must be this tall to ride.
Last call for boarding.
We missed the last train.
The hotel lost our reservation.
I’m afraid your room isn’t ready.
Is breakfast included?
There’s a bug in my room.
Please don’t feed the animals.
That’s not how the Wi‑Fi works.
Have you tried turning it off and on again?
My phone is at one percent.
I’m not a robot.
Please update your password.
Why won’t it let me log in?
The internet is down again.
Who’s using all the bandwidth?
Can you hear me now?
My battery is dying.
It’s buffering.
You’re breaking up.
I accidentally liked your photo from 2014.
I didn’t sign up for this.
I told you not to touch that button.
I just wanted a sandwich.
I don’t know how to tell you this.
Well, this is awkward.
You’re late. Again.
Nobody move.
I can explain everything.
Don’t look at me like that.
I never said that.
It was like that when I got here.
That’s not mine.
I have a bad feeling about this.
We have to go back.
It’s not what it looks like.
Trust me, I’m a professional.
Hold my drink.
Watch this.
Here we go again.
I did not see that coming.
Dinner is ready, come downstairs.
Because I said so.
Clean your room.
Don’t make me turn this car around.
Did you do your homework?
Go ask your father.
Eat your vegetables.
Who broke the lamp?
I’m not angry, I’m just tired.
Turn that music down.
Put your shoes on, we’re late.
We’ll see.
Ask me again later.
Sit up straight.
I’ve got my eye on you.
Remember to say thank you.
Back in my day we walked uphill both ways.
Is anyone going to eat that?
I can’t find my glasses.
They’re on your head.
You kids and your phones.
The dog ate my homework.
I forgot my lunch.
Can I go to the bathroom?
I wasn’t talking.
The test is on Friday.
Please open your textbooks.
Who’s ready for a pop quiz?
It’s due tomorrow.
I studied all night.
Stop passing notes.
That’s not on the syllabus.
Class dismissed.
Can I borrow a pencil?
I think you have my seat.
Is this on the final?
This is a library, please be quiet.
I’m sorry, the book is overdue.
We’re closing in ten minutes.
Shh, I’m trying to concentrate.
Does anyone have a charger?
Can you hold this for a second?
Excuse me, you dropped something.
I think that’s my umbrella.
Is this your first time here?
You look just like someone I know.
Haven’t we met before?
Nice weather we’re having.
Can I buy you a drink?
Do you come here often?
Sorry, I thought you were someone else.
I’m just here for the snacks.
Are you following me?
Yes, I’m talking to you.
I’m not even supposed to be here.
Can I get your number?
My friend thinks you’re cute.
I had a really nice time tonight.
Let’s just be friends.
So, what do you do?
Is this a bad time?
Your fly is down.
You have something in your teeth.
Is that a new haircut?
You’re standing on my foot.
I’ve been trying to reach you.
Pick up the phone.
This is the last time I’m asking.
That’s a bold choice.
I’m not saying it’s aliens, but it’s aliens.
Please keep your hands inside the ride.
The floor is lava.
We’re out of toilet paper.
There’s a spider on the ceiling.
I think the toaster is on fire.
Why is the cat staring at me?
The neighbors are loud again.
Who keeps leaving the door open?
Can you take out the trash?
Honey, where are my keys?
I swear it was right here.
This milk smells funny.
Who finished the cereal?
You can’t be serious.
This is the best day of my life.
This is the worst day of my life.
I think I left the oven on.
Did you lock the door?
It’s freezing in here.
Who touched the thermostat?
I’m on a diet starting Monday.
One more episode and then bed.
I’m not tired, I swear.
Five more minutes.
I’ll do it tomorrow.
Where did I put my phone?
It’s in your hand.
Did anyone feed the fish?
That was the last cookie.
Don’t tell me how it ends.
No spoilers, please.
That’s the plot twist?
I’ve seen this movie before.
Can you turn the subtitles on?
Who’s winning?
That was clearly offside.
The referee needs glasses.
We’re going to win this.
Throw the ball, not the game.
I think I pulled a muscle.
Is the gym open on holidays?
I only came for the free towel.
Leg day again?
One more rep.
I’m training for a marathon, probably.
Nice try, buddy.
That was a terrible pass.
Your turn to buy the next round.
Is it time to go home yet?
Check, please.
I’m allergic to that.
Do you have a gluten-free option?
Make it a double.
Cheers, everybody.
I’ve had way too much cake.
Happy birthday to you.
Who invited him?
I love what you’ve done with the place.
Where should I put my coat?
The party’s in the kitchen.
Does anyone know how to work this thing?
Let’s take a group photo.
Everybody say cheese.
Wait, let me fix my hair.
Can we do one more?
I blinked in that one.
Open your presents later.
Surprise!
You shouldn’t have.
I got you the same gift as last year.
Do you have the receipt?
I’ll take it in a different size.
Is this on sale?
I just need to check my balance.
That’s outrageously expensive.
I’m just browsing.
Do you take coupons?
The line is out the door.
Paper or plastic?
I don’t have any change.
Keep the change.
Can I speak to someone in charge?
Your call is important to us.
Please hold.
Press one for more options.
I’ve been on hold for an hour.
I’m calling about your car’s extended warranty.
Can I put you on hold for a second?
Thank you for calling, how may I help?
Please state your name and address.
I’m going to need to see some ID.
The doctor will see you now.
Take two and call me in the morning.
Does this hurt?
Say ahh.
You’ll feel a little pinch.
It’s probably nothing.
Have you been drinking enough water?
You need to get more sleep.
Time of death, 3:42.
Is there a doctor on board?
I’m not saying you’re wrong, but you’re wrong.
I have a dream.
That’s one small step.
To be, or not to be.
Houston, we have a problem.
I’ll be back.
May the best player win.
I’m the king of the world.
Elementary, my dear friend.
Life is like a box of chocolates.
Winter is coming.
It’s over, I have the high ground.
Release the hounds.
You shall not pass.
I am your father.
The cake is a lie.
Never gonna give you up.
Beam me up.
That’s what she said.
Challenge accepted.
I’m the captain now.
Hello, is it me you’re looking for?
Do you smell something burning?
That wasn’t me, I swear.
I think it’s haunted.
Did you hear that noise?
Who’s there?
I swear this house is cursed.
Don’t go in the basement.
The call is coming from inside the house.
Please don’t leave me here.
I was framed.
The butler did it.
I demand a recount.
Objection, your honor.
I plead the fifth.
Order in the court.
I’d like to make a toast.
Speech, speech, speech.
Does this look infected to you?
I’m fine, really.
Is it too late to go back?
Everything is under control.
Okay, new plan.
Plan B it is.
We’re going to need a bigger boat.
I’ve got good news and bad news.
That went well, didn’t it?
It’s fine, it’s totally fine.
I’m going to pretend I didn’t hear that.
Did you just say what I think you said?
I can’t believe you’d do this to me.
You had one job.
I’ll get the next one.
I’d rather not talk about it.
Congratulations, it’s a boy.
We’ve decided to adopt a cat.
I’ve been meaning to tell you something.
Please sign here.
Welcome aboard.
Your table is ready.
Make yourself at home.
Don’t mind the mess.
Shoes off at the door, please.
Do you want the long version or the short version?
That’s a story for another day.
Who wants to go first?
Let’s all take a deep breath.
You’re doing great, sweetie.
Never mind, I’ll do it myself.
Is it just me or is it hot in here?
I’d like to place an order for forty nuggets.
Where did the day go?
Can I tell you a secret?
I’m not lost, I’m exploring.
It’s a long story.
I didn’t choose the thug life.
My dog does that too.
Hello? Is this thing on?
Ladies and gentlemen, we have a winner.
And the Oscar goes to…
Breaking news.
We’ll be right back after these messages.
Stay tuned.
Smile, you’re on camera.
Mic check, one two.
The show must go on.
Take it from the top.
Cut! That’s a wrap.
Last one to the car is a rotten egg.
I call shotgun.
Pull over, I need to throw up.
Are you sure this is the right exit?
Can we stop for snacks?
He started it.
She’s touching me.
I need a vacation from my vacation.
I’m going to need a bigger coffee.
I’m too old for this.
Somebody call a plumber.
It’s leaking again.
Don’t touch the wet paint.
Wet floor, please be careful.
This chair is broken.
Who’s going to pay for that?
It’s a free country.
The early bird gets the worm.
What do you mean, it’s not vegan?
I swear I locked the bike.
How is it already Wednesday?
Why are we whispering?
I’d like to report a missing sandwich.
Are those my headphones?
`);

const SIL_S = L(`
Batman
Devastated
Nervous
Apologetic
Karen
Pirate
Nature documentary
Overly romantic
Sleepy toddler
Villain monologue
Sports commentator
Whispering secretly
Robot
Shakespearean actor
Gym bro
Southern grandma
Opera singer
Soap opera
Passive aggressive
Game show host
Clueless tourist
Spy in a hurry
Fed-up teacher
Cowboy
Scared of ghosts
Posh butler
Surfer dude
Dying dramatically
Drill sergeant
Sarcastic teenager
Motivational speaker
Cartoon princess
Trying not to laugh
Detective noir
News anchor
Furious chef
Hungover
Alien learning English
Yoga instructor
Airline pilot
Gollum
Darth Vader
Yoda
Jack Sparrow
Shrek
Mickey Mouse
Gandalf
Dumbledore
Terminator
Forrest Gump
Borat
Kermit the Frog
Elmo
Homer Simpson
Peter Griffin
SpongeBob
Scooby-Doo
Bugs Bunny
Elvis
Morgan Freeman narrating
Arnold Schwarzenegger
Sean Connery
Gordon Ramsay
Donald Duck
Mr. Bean
Winnie the Pooh
Eeyore
Pikachu
Optimus Prime
Wolverine
Spider-Man
Hulk
Thor
Captain Jack in a storm
Dracula
Frankenstein’s monster
Santa Claus
The Grinch
Grumpy Cat
A seagull
A cat
A dog who sees a squirrel
A dolphin
A chicken
A sloth
A goat
A parrot
A snake
A very tired owl
A confused penguin
A dramatic llama
A hamster on a wheel
Underwater
Out of breath
In slow motion
Fast-forwarded
On helium
Chewing a giant marshmallow
With a mouth full of peanut butter
With a cold
Freezing cold
Sweating in a sauna
Just woke up
About to sneeze
Whispering in a library
Shouting across a canyon
Through a megaphone
Through a walkie-talkie
Over a bad phone line
Echoing in a cave
Like a tour guide
Like a flight attendant
Like a hotel receptionist
Like a used car salesman
Like an infomercial host
Like a late-night radio DJ
Like a weather forecaster
Like a museum guard
Like a wizard
Like a knight
Like a medieval peasant
Like a king
Like a queen
Like a jester
Like a viking
Like a ninja
Like a samurai
Like a mime
Like a magician
Like a clown
Like a pageant contestant
Like a rock star
Like a rapper
Like a country singer
Like a jazz musician
Like a boy band member
Like a ballet dancer
Like a mad scientist
Like a nervous intern
Like a CEO
Like a lawyer closing a case
Like a judge
Like a prisoner
Like a police officer
Like a firefighter
Like a lifeguard
Like a bodyguard
Like a bouncer
Like a barista
Like a bartender
Like a waiter who hates his job
Like a mechanic
Like a plumber
Like a farmer
Like a lumberjack
Like a construction worker
Like a delivery driver
Like a pilot
Like an astronaut
Like a sailor
Like a fisherman
Like a tour guide
Like a cheerleader
Like a football coach
Like a golf commentator
Like a wrestler
Like a boxing announcer
Like a figure skater
Like a marathon runner at mile 25
Like a kid who lost a tooth
Like a teenager caught sneaking out
Like a toddler denied candy
Like a baby
Like a grandpa
Like a grandma
Like a proud parent
Like a disappointed parent
Like an overprotective dad
Like a mom at a school pickup
Like a strict librarian
Like a school principal
Like a kindergarten teacher
Like a college professor
Like a student who didn’t study
Like a shy kid
Like a bully in a movie
Like a mean girl
Like a surfer
Like a hippie
Like a hipster
Like a influencer
Like a TikTok dancer
Like a streamer who just won
Like a gamer who just lost
Like a YouTuber
Like a conspiracy theorist
Like a life coach
Like a cult leader
Like a motivational poster
Like a fortune teller
Like a psychic
Like a ghost
Like a vampire
Like a zombie
Like a werewolf
Like a witch
Like a mermaid
Like a fairy
Like a dragon
Like a troll under a bridge
Like an elf
Like a hobbit
Like a superhero
Like a supervillain’s henchman
Like a sidekick
Like a secret agent
Like a hitman
Like a gangster
Like an old-timey gangster
Like a cowboy in a duel
Like a pirate captain
Like a ship’s navigator
Like a castaway
Like a caveman
Like a Roman emperor
Like a Greek god
Like Cleopatra
Like Napoleon
Like a Victorian ghost
Like a 1920s newsboy
Like a 1950s housewife
Like a 1980s aerobics instructor
Like a disco dancer
Like a noir narrator
Like a spaghetti western villain
Like a kung fu master
Like a Bond villain
Like a sports mascot
Like a theme park character
Like a puppet
Like a ventriloquist dummy
Like a cartoon villain
Like a talking animal in a kids’ movie
Like a Disney prince
Like a wicked stepmother
Like a fairy godmother
Like a narrator of a bedtime story
Like an audiobook reader
Like a poet
Like a dramatic opera diva
Like a stand-up comedian
Like a heckler
Like a public speaker with stage fright
Like a best man giving a toast
Like a bride at the altar
Like a groom crying
Like a priest
Like a monk
Like a philosopher
Like a therapist
Like a patient on the couch
Like a doctor with bad news
Like a surgeon
Like a dentist
Like a nurse
Like a vet
Like a pharmacist
Like a scientist who made a discovery
Like a robot with low battery
Like a GPS voice
Like an automated phone menu
Like a smart speaker
Like a self-checkout machine
Like a video game NPC
Like a fighting game announcer
Like a text-to-speech voice
Like a loading screen
Like a broken record
Like an old radio
Like a trailer voiceover
Like a horror movie trailer
Like a rom-com lead
Like an action movie hero
Like a movie villain
Like a reality TV contestant
Like a cooking show host
Like a talent show judge
Like a game show contestant
Like a quiz show host
Like a sports reporter
Like a war correspondent
Like a conspiracy newsman
Like a late-night host
Like a morning show host
Like a shopping channel host
Like a telemarketer
Like a customer support agent
Like a politician
Like a debate moderator
Like a presidential candidate
Like a royal announcer
Like a butler announcing guests
Like a French waiter
Like an Italian chef
Like a German engineer
Like a Scottish bagpiper
Like an Irish storyteller
Like a New York cab driver
Like a Valley girl
Like a Texan rancher
Like an Australian outback guide
Like a British detective
Like a Canadian who’s very sorry
Like a Russian spy
Like a Transylvanian count
Like a Jamaican beach bartender
Like an Indian tech support rep
Like a Southern preacher
Like a Boston local
Like a pirate who is also shy
Like a knight who is afraid of horses
Like a villain who is very polite
Like a ninja who keeps being noisy
Like a ghost who is bored
Like a robot learning feelings
Like a wizard who forgot the spell
Like a superhero with a cold
Like a spy who can’t whisper
Like a vampire at a garlic festival
Like a mermaid stuck on land
Like a dog wearing a cone
Like a cat who knocked something off a table
Like a toddler explaining a crime
Like a toddler who’s a lawyer
Like a very bad liar
Like a very good liar
Like someone who just saw a ghost
Like someone who just won the lottery
Like someone who just got dumped
Like someone who just got engaged
Like someone running late
Like someone who’s secretly in love
Like someone with a secret
Like someone who’s extremely proud
Like someone extremely jealous
Like someone hiding from a bear
Like someone who’s been awake for three days
Like someone who’s on their last nerve
Like someone who’s trying to stay calm
Like someone speaking to a baby
Like someone speaking to a puppy
Like someone on a first date
Like someone on a bad date
Like someone proposing
Like someone getting a medal
Like someone giving up
Like someone making a grand entrance
Like someone sneaking in late
Like someone who’s very, very sleepy
Like someone who’s extremely hyper
Like someone in a wind tunnel
Like someone on a rollercoaster
Like someone ice skating for the first time
Like someone holding in a laugh
Like someone who’s lost their voice
Like someone with a mouth full of ice
Like someone who’s been tickled
Like someone eating something extremely spicy
`);

SIL_S.push(...L(`
Like a lighthouse keeper
Like a dramatic sports referee
Like a medieval town crier
Like a Shakespearean villain
Like a gossiping neighbor
Like an over-caffeinated barista
Like a retired general
Like a nervous groom
Like a drama teacher
Like a sleepy bus driver
Like a haunted doll
Like an enthusiastic mascot
Like a very serious toddler
Like a surfer in a hurricane
Like a pirate on a diet
Like a chef who just burned dinner
Like a cop in a buddy movie
Like a monster under the bed
Like a baby dragon
Like a dad telling a joke
Like a mom who knows everything
Like an influencer at a funeral
Like a mime who broke their vow
Like a detective who found the clue
Like a fisherman telling a tall tale
Like a bard singing a ballad
Like a jaded fairy
Like a robot butler
Like a lounge singer
Like a fitness trainer at 5 a.m.
Like a tired astronaut
Like a medieval doctor
Like a game show host on bad news
Like a scarecrow come to life
Like a hype man
Like a flustered waiter
Like a cat burglar
Like a disappointed wizard
Like a rubber duck
Like a long-lost twin
Like an angry baker
Like an exhausted superhero
Like a hotel concierge
Like a bored security guard
`));



const RF_C = L(`
Animal
Food
Country
City
Movie
Job
Something in a kitchen
Sport
Board game
Famous person
Brand
Something you wear
Thing at the beach
Song
Body part
Something cold
Something in a bathroom
Superhero
Villain
Car brand
Fruit
Vegetable
TV show
Something round
Thing in a school
Thing at a party
Drink
Something scary
Thing in a park
Excuse for being late
Thing you plug in
Thing in a bedroom
Hobby
Something you can break
Boy’s name
Girl’s name
Musical instrument
Clothing brand
Candy
Cereal
Fast food chain
Pizza topping
Ice cream flavor
Dessert
Sandwich filling
Breakfast food
Snack
Spice or herb
Cheese
Pasta shape
Soup
Dog breed
Bird
Insect
Sea creature
Wild cat
Farm animal
Zoo animal
Reptile
Flower
Tree
Gemstone
Color
Shape
Fabric
Metal
Planet or moon
Constellation
Weather word
Natural disaster
Mountain or mountain range
River
Ocean or sea
Island
Capital city
US state
European country
Asian country
African country
Famous landmark
Tourist attraction
Airline
Airport
Mode of transport
Road sign word
Word in a recipe
Kitchen appliance
Tool in a toolbox
Piece of furniture
Thing in a living room
Thing in a garage
Thing in a garden
Thing in a bathroom cabinet
Thing in a purse or wallet
Thing in a backpack
Thing in a desk
Thing in an office
Thing in a hospital
Thing in a supermarket
Thing in a toy store
Thing at a zoo
Thing at a circus
Thing at a wedding
Thing at a funeral
Thing at a birthday party
Thing at a barbecue
Thing at a picnic
Thing at a concert
Thing at the airport
Thing at a gym
Thing at a farm
Thing at a carnival
Thing at a museum
Thing at a campsite
Thing at a stadium
Thing at a pool
Thing at a casino
Thing in a cinema
Thing in a restaurant
Thing in a church
Thing in a library
Thing in a hotel room
Thing in a haunted house
Thing in space
Thing underwater
Thing underground
Thing in the sky
Thing in a forest
Thing in a desert
Thing in a jungle
Thing in the arctic
Thing in a city
Thing in a small town
Thing on a farm tractor
Something you ride
Something you drive
Something you throw
Something you catch
Something you kick
Something you hit
Something you climb
Something you carry
Something you wear on your head
Something you wear on your feet
Something you wear on your hands
Something you wear at night
Something you wear in winter
Something you wear in summer
Something you wear to a formal event
Something that’s sticky
Something that’s slippery
Something that’s sharp
Something that’s soft
Something that’s heavy
Something that’s tiny
Something that’s huge
Something that’s loud
Something that’s quiet
Something that’s hot
Something that’s shiny
Something that’s sweet
Something that’s sour
Something that’s spicy
Something that’s salty
Something that’s crunchy
Something that’s smelly
Something that’s expensive
Something that’s cheap
Something that’s old
Something that’s new
Something that’s fast
Something that’s slow
Something that’s fluffy
Something that’s yellow
Something that’s red
Something that’s green
Something that’s blue
Something that’s white
Something that’s black
Something that’s brown
Something that’s orange
Something that’s purple
Something that’s pink
Something that’s striped
Something that’s spotted
Something that flies
Something that swims
Something that crawls
Something that glows
Something that bounces
Something that floats
Something that melts
Something that spins
Something that rolls
Something that has wheels
Something that has wings
Something that has keys
Something that has teeth
Something that has a screen
Something that has a handle
Something that has a lid
Something that has strings
Something that has pages
Something that has buttons
Something that has a battery
Something that has a tail
Something you find in the ocean
Something you find in a cave
Something you find in a castle
Something you find in a pirate ship
Something you find in a toolbox
Something you find in a cupboard
Something you find in a fridge
Something you find in a freezer
Something you find in a lunch box
Something you find in a medicine cabinet
Something you find in a first-aid kit
Something you find in a sewing kit
Something you find in a classroom
Something you find in a gym bag
Something you find in a handbag
Something you find in a pocket
Something you find in a junk drawer
Something you find under a bed
Something you find in a car
Something you find in a toolshed
Something you find on a pizza
Something you find on a burger
Something you find in a salad
Something you find on a sandwich
Something you find in a smoothie
Something you find in a cocktail
Something you find in a fairy tale
Something you find on a map
Something you find at a bakery
Something you find at a hardware store
Something you find at a pet shop
Something you find at a florist
Something you find at a pharmacy
Something you find at a post office
Something you find at a farm shop
Something you find on a menu
Something you find on a school bus
Something you find on a Christmas tree
Something you find in a Halloween bucket
Something you find in an Easter basket
Something you find in a stocking
Something you find in a birthday card
Something you find on a beach
Something you find on a mountain
Something you find in a swamp
Something you find in a rainforest
Something you find in a volcano
Something you find in a lake
Something you find in a pond
Something you find in a bird’s nest
Something you find at a construction site
Something you find at a train station
Something you find at a bus station
Something you find at a harbor
Something you find at a bank
Something you find at a police station
Something you find in a fire station
Something you find in a courtroom
Something you find in a theater
Something you find in a studio
Something you find in a laboratory
Something you find in a locker room
Something you find at the dentist
Something you find at a barber shop
Something you find at a salon
Something you find in a tattoo parlor
Something you find at a car wash
Something you find in a parking lot
Something you find in a laundromat
Something you find in a bathroom at a restaurant
Cartoon character
Disney character
Video game
Video game character
Pokémon
Fairy tale character
Nursery rhyme character
Book title
Author
Poet
Painter
Scientist
Inventor
Athlete
Olympic sport
Football team
Basketball team
Singer
Band
Rapper
Actor
Actress
Director
Comedian
Chef
Explorer
President
King or queen
Roman or Greek god
Mythical creature
Monster
Dinosaur
Horror movie
Comedy movie
Cartoon movie
Christmas movie
Sitcom
Reality TV show
Game show
Talk show host
Social media app
Website
Phone brand
Computer part
Programming word
Cosmetic brand
Perfume
Shoe brand
Sportswear brand
Luxury brand
Supermarket brand
Soda brand
Beer or wine
Cocktail
Coffee drink
Tea flavor
Hot drink
Juice
Kind of bread
Kind of cake
Kind of cookie
Kind of pie
Kind of potato dish
Kind of rice dish
Kind of salad
Kind of sauce
Kind of nut
Kind of bean
Kind of berry
Kind of tropical fruit
Kind of citrus
Kind of melon
Kind of mushroom
Kind of fish
Kind of meat
Kind of seafood
Kind of sushi
Kind of noodle dish
Kind of dessert from another country
Kind of dance
Kind of hat
Kind of shoe
Kind of jacket
Kind of bag
Kind of jewelry
Kind of boat
Kind of plane
Kind of truck
Kind of house
Kind of tree house
Kind of shop
Kind of store
Kind of school
Kind of exam
Kind of doctor
Kind of teacher
Kind of musician
Kind of artist
Kind of athlete
Kind of vacation
Kind of holiday
Kind of party
Kind of toy
Kind of game
Kind of card game
Kind of puzzle
Kind of sport equipment
Kind of ball
Kind of pet
Kind of gift
Kind of weather
Kind of noise
Kind of laugh
Kind of smell
Kind of fear
Kind of dream
Kind of lie
Kind of joke
Kind of sandwich
Kind of tool
Kind of knot
Kind of bridge
Kind of cheese board item
`);

RF_C.push(...L(`
Something in a lunchbox
Famous duo
Fictional place
Type of clown
Thing with a lock
Something found in a toolbelt
Type of sandwich bread
Kind of soup spoon
Thing that’s striped and edible
Thing that makes you laugh
`));

const LOCS = L(`
Airplane
Airport
Amusement park
Aquarium
Arcade
Art gallery
Bakery
Bank
Barbershop
Beach
Bowling alley
Bus station
Camping site
Casino
Castle
Cathedral
Church
Cinema
Circus
Coffee shop
Construction site
Court
Cruise ship
Dance studio
Dentist office
Desert island
Embassy
Farm
Fire station
Fishing boat
Flea market
Football stadium
Gas station
Golf course
Gym
Hair salon
Haunted house
Hospital
Hotel
Ice rink
Jail
Jungle
Laboratory
Laundromat
Library
Lighthouse
Mall
Military base
Mine
Monastery
Movie set
Museum
Night club
Nursing home
Office
Opera house
Orchard
Pet shop
Pharmacy
Pirate ship
Police station
Post office
Prison yard
Pub
Radio station
Race track
Rainforest
Restaurant
Rodeo
Rooftop party
School
Ski resort
Space station
Spa
Submarine
Subway
Supermarket
Swimming pool
Tattoo parlor
Taxi
Television studio
Theater
Train
Treehouse
University
Vineyard
Waiting room
Wedding
Whale-watching boat
Windmill
Winter cabin
Workshop
Yacht
Yoga studio
Zoo
Birthday party
Funeral
Hot air balloon
Summer camp
Skate park
`);

/* The Real Me prompts: short, true-story questions, mixed formats */
const RM_P = L(`
What was the first album or song you ever bought?
How old were you when you got your first phone, and what was it?
Name the worst haircut you’ve ever had and who gave it to you.
What was your first paid job, and how much did it pay?
What did you want to be when you grew up?
What was the name of your first pet?
Which food did you hate as a kid but love now?
Which food do you love but secretly know is terrible for you?
What’s the most you’ve ever paid for a single meal?
What’s the cheapest meal you’ve ever survived on for a week?
Describe your worst ever date in three words.
Where were you on your most memorable birthday?
Who was your first celebrity crush?
What was your first car, and what was wrong with it?
What nickname did your family give you as a kid?
What was your favorite cartoon as a kid?
What’s the longest you’ve ever gone without a haircut?
What’s the oldest item of clothing you still wear?
What was the worst grade you ever got on something you cared about?
What’s a school rule you were most proud of breaking?
Which teacher scared you the most, and why?
Who was your best friend in primary school?
What was your most-played video game as a kid?
What was the worst thing you ever spent your allowance on?
How many times have you moved house?
What’s the farthest from home you’ve ever been?
What’s the longest flight you’ve ever taken?
What’s your worst experience with public transport?
What’s the longest you’ve ever waited for a delayed flight?
What’s the most disappointing place you’ve ever visited?
What’s the most beautiful place you’ve ever seen in person?
Where did you go on your first holiday without your parents?
What’s the most you’ve ever overpacked for a trip?
What’s the one item you always forget on a trip?
What’s the worst hotel you’ve ever stayed in?
What’s the best meal you’ve ever eaten abroad?
Which language do you wish you spoke?
How many countries have you visited?
What’s your go-to order at a fast food place?
What’s your go-to karaoke song?
What’s your go-to excuse to leave a party early?
What’s your go-to comfort movie?
What’s your go-to midnight snack?
What’s your go-to outfit when you can’t decide?
What’s the first thing you do when you wake up?
What’s the last thing you do before bed?
What’s the one thing you can’t start your day without?
What time do you usually wake up on a day off?
How many alarms do you set to get up?
How many hours of sleep do you need to feel human?
How many unread emails do you have right now, roughly?
How many tabs do you usually have open?
How many photos are on your phone, roughly?
How many apps do you have on your home screen?
What’s the most-used app on your phone?
What’s your screen time on a typical day?
What’s the weirdest thing in your phone’s notes app?
What’s the most embarrassing thing in your search history, in general terms?
What’s the oldest photo on your phone?
What was your first username or email address?
What was your first ever social media account?
What’s the best purchase under twenty dollars you’ve ever made?
What’s the best purchase you’ve ever made?
What’s the worst purchase you’ve ever made?
What’s a subscription you’re still paying for but never use?
What’s something you bought and used exactly once?
What’s something you’re saving up for right now?
What’s the most you’ve ever lost on a bet?
What’s the biggest thing you’ve ever won?
What’s the most valuable thing you’ve ever lost?
What’s something you’ve owned for over ten years?
What’s something you’d never lend to anyone?
What’s the most sentimental object you own?
What’s the item you’d grab first in a fire, besides people and pets?
What’s the strangest thing you’ve ever kept as a souvenir?
What’s the best gift you’ve ever given?
What’s the worst gift you’ve ever received?
What’s the best gift you’ve ever received?
Who taught you to ride a bike?
Who taught you to cook?
Who taught you to drive?
Who’s the funniest person you know?
Who’s the most stubborn person in your family?
Who in your family is the worst driver?
Who do you call when you’re in trouble?
Who would you want on your team for a zombie apocalypse?
Who’s the last person you texted?
Who’s the first person you’d tell good news to?
Who was your favorite teacher?
Who was your hero as a child?
Which celebrity do people say you look like?
Which fictional character do you relate to most?
Which Disney character is your spirit animal?
Which superpower would you pick, and why?
Which decade would you have loved to live in?
Which holiday is your favorite?
Which season do you hate the most?
Which sport are you secretly good at?
Which sport do you refuse to watch?
Which board game do you take far too seriously?
Which card game do you always win?
Which song makes you cry every time?
Which song do you know every word to but wish you didn’t?
Which movie have you watched the most times?
Which movie do you pretend to like?
Which TV show did you binge in a single weekend?
Which book changed how you think?
Which book did you pretend to have read?
Which smell reminds you of childhood?
Which sound drives you up the wall?
Which chore do you do the worst on purpose?
Which household chore do you secretly enjoy?
Which kitchen tool do you use the most?
Which spice do you put in everything?
Which fruit do you think is overrated?
Which vegetable do you always push to the side of your plate?
Which candy do you always pick first from a bowl?
Which cereal was your childhood favorite?
Which ice cream flavor is always your first pick?
Which pizza topping is your hill to die on?
Which snack could you eat every day for a year?
Which drink do you order at a bar?
Which coffee order do you have memorized?
Which breakfast food would you eat for dinner?
What’s your most-used emoji?
What’s your favorite swear-free exclamation?
What’s a word you always mispronounce?
What’s a word you overuse?
What’s a phrase your parents always said?
What’s a saying from your family that no one else understands?
What’s a rule in your house growing up that seemed unfair?
What’s a chore you were assigned as a kid?
What’s your earliest memory?
What’s a smell you absolutely love?
What’s a sound you find relaxing?
What’s a texture you can’t stand?
What’s a food texture you can’t stand?
What’s a color you refuse to wear?
What’s a fashion trend you’ll never try again?
What’s a trend you were way too into?
What’s a hobby you’ve picked up and dropped in the last year?
What’s a hobby you’ve kept for more than five years?
What’s a skill you’d love to learn right now?
What’s a skill you taught yourself?
What’s a talent you have that’s completely useless?
What’s a thing you can do that most people can’t?
What’s the most useless fact you know by heart?
What’s a number you know by heart that isn’t a phone number?
What’s a phone number from your childhood you can still recite?
What’s a lie you told as a kid that nobody ever found out about?
What’s a rumor about you that was totally false?
What’s a rumor about you that was a little bit true?
What’s a promise you broke as a child?
What’s a secret you kept from your parents for years?
What’s something you did as a teenager that your parents still don’t know?
What’s the biggest fib you told on a first day at a new job?
What’s a mistake you made at work that you hope nobody remembers?
What’s the best compliment you’ve ever received?
What’s the worst piece of advice you ever followed?
What’s the best piece of advice you ever got?
What’s the most awkward thing you’ve said at a family dinner?
What’s the most awkward thing you’ve said to a coworker?
What’s the most awkward text you’ve ever sent?
What’s the most awkward silence you’ve ever sat through?
What’s the most awkward moment of your school life?
What’s the most awkward place you’ve been stuck waiting?
What’s the most awkward outfit you’ve worn in public?
What’s the most awkward way you’ve ever met someone?
What’s the funniest thing a kid has said to you?
What’s the funniest autocorrect fail you’ve had?
What’s the funniest thing that happened at your school?
What’s the funniest thing you’ve seen at a wedding?
What’s the funniest thing you’ve heard a stranger say?
What’s the funniest injury you’ve ever had?
What’s the funniest typo you’ve ever made?
What’s the funniest thing your pet has done?
What’s the funniest thing you’ve laughed at when you shouldn’t have?
What’s the scariest thing that’s ever happened to you?
What’s the scariest movie you’ve ever seen?
What’s the scariest ride you’ve ever been on?
What’s the biggest animal you’ve ever been close to?
What’s the smallest thing that has ever scared you?
What’s the loudest noise you’ve ever heard?
What’s the worst smell you’ve ever smelled?
What’s the worst pain you’ve ever felt?
What’s the worst cold or flu you’ve ever had?
What’s the worst thing you’ve ever eaten?
What’s the spiciest thing you’ve ever eaten?
What’s the sweetest thing you’ve ever eaten?
What’s the strangest food combination you actually like?
What’s the strangest thing you’ve ever put on pizza?
What’s the strangest dream you remember having?
What’s the strangest coincidence you’ve experienced?
What’s the strangest place you’ve ever fallen asleep?
What’s the strangest thing you’ve ever found on the ground?
What’s the strangest job you’ve ever applied for?
What’s the strangest rule you’ve ever had to follow at work?
What’s the strangest thing a teacher ever said to you?
What’s the strangest compliment you’ve received?
What’s the strangest piece of trivia you know?
What’s the strangest thing you’ve ever collected?
What’s the strangest sound your house makes?
What’s the first thing you notice about a stranger?
What’s the first thing you’d change about your hometown?
What’s the best thing about where you grew up?
What’s the worst thing about where you grew up?
What’s the best street food you’ve ever had?
What’s the best sandwich you’ve ever had?
What’s the best pizza you’ve ever had?
What’s the best cup of coffee you’ve ever had?
What’s the best concert you’ve been to?
What’s the best party you’ve ever been to?
What’s the best day of your life so far?
What’s the best prank you’ve ever pulled?
What’s the best excuse you’ve ever used?
What’s the best nap of your life?
What’s the best view you’ve ever slept with?
What’s the best birthday you’ve ever had?
What’s the best thing you’ve ever baked or cooked?
What’s the worst thing you’ve ever baked or cooked?
What’s the worst movie you’ve ever paid to see?
What’s the worst concert you’ve ever been to?
What’s the worst job interview you’ve ever had?
What’s the worst job you’ve ever had?
What’s the worst boss you’ve ever worked for like?
What’s the worst weather you’ve ever been caught in?
What’s the worst traffic jam you’ve been stuck in?
What’s the worst car trouble you’ve had?
What’s the worst thing you’ve ever done to a sibling?
What’s the worst thing a sibling ever did to you?
What’s the worst thing you’ve said in anger?
What’s the worst argument you’ve had over something silly?
What’s the worst sunburn you’ve ever had?
What’s the worst fall you’ve ever taken?
What’s the worst haircut story you have?
What’s the worst fashion choice you’ve made?
What’s the worst song you’ve ever had stuck in your head?
What’s the worst thing you’ve ever done on a group project?
What’s the worst piece of tech you’ve ever owned?
What’s the worst piece of furniture you’ve ever bought?
Complete the sentence: I’m weirdly proud of…
Complete the sentence: I once got in trouble for…
Complete the sentence: I secretly love…
Complete the sentence: I’m embarrassingly bad at…
Complete the sentence: I’m shockingly good at…
Complete the sentence: Nobody knows that I…
Complete the sentence: My biggest irrational fear is…
Complete the sentence: My most useless possession is…
Complete the sentence: On my last birthday I…
Complete the sentence: The last time I cried was because…
Complete the sentence: The last time I laughed so hard I cried was…
Complete the sentence: The last thing I Googled was…
Complete the sentence: The most trouble I ever caused was…
Complete the sentence: My most unpopular opinion is…
Complete the sentence: I’ll never forget the time I…
Complete the sentence: My biggest pet peeve is…
Complete the sentence: My guilty pleasure is…
Complete the sentence: In school, I was known for…
Complete the sentence: My family always says I…
Complete the sentence: I could talk for an hour about…
Complete the sentence: The best thing I ever found was…
Complete the sentence: The worst thing I ever lost was…
Complete the sentence: Something I’ll never do again is…
Complete the sentence: Something I do when nobody’s watching is…
Complete the sentence: My most embarrassing moment on a bus was…
Complete the sentence: My hidden talent is…
Complete the sentence: I’m terrified of…
Complete the sentence: I once pretended to…
Complete the sentence: My weirdest habit is…
Complete the sentence: People are always surprised that I…
Describe your first kiss in three words.
Describe your worst fashion phase in three words.
Describe your childhood bedroom in three words.
Describe your dream vacation in three words.
Describe your morning routine in three words.
Describe your job in three words.
Describe your cooking in three words.
Describe your singing voice in three words.
Describe your driving in three words.
Describe your dance style in three words.
Describe your best friend in three words.
Describe your hometown in three words.
Describe your sense of humor in three words.
Describe your school years in three words.
Describe your worst week in three words.
Describe your ideal Sunday in three words.
Describe the last meal you ate in three words.
Describe your perfect pizza in three words.
Describe your childhood home’s smell in three words.
Describe your handwriting in three words.
Describe your first apartment in three words.
Describe your favorite sweater in three words.
Describe your best vacation in three words.
Describe your parents’ cooking in three words.
Describe your phone case in three words.
When did you last stay up all night, and why?
When did you last cry at a movie, and which one?
When did you last get a speeding ticket, or come close?
When did you last get lost, and where?
When did you last do something truly spontaneous?
When did you last lie about something small?
When did you last pull an all-nighter for school or work?
When did you last feel really embarrassed, and why?
When did you last fall asleep somewhere you shouldn’t have?
When did you last go to a theme park, and what ride did you hate?
When did you last go camping, and what went wrong?
When did you last cook for a crowd?
When did you last get completely soaked in the rain?
When did you last go swimming in the sea or a lake?
When did you last get sick on a trip?
When did you last meet someone famous?
When did you last move house, and what broke?
When did you last try a new food, and what was it?
When did you last wear a costume?
When did you last sing in public?
How many jobs have you had in your life?
How many times have you broken a bone?
How many pets have you had?
How many hours do you spend on your phone a day, honestly?
How many countries could you name on a map right now?
How many books have you read this year?
How many cups of coffee or tea do you drink a day?
How many languages can you say hello in?
How many schools did you go to?
How many concerts have you been to?
How many cities have you lived in?
How many tattoos or piercings do you have, or want?
How many pairs of shoes do you own, roughly?
How many people are in your contacts that you never speak to?
How many times have you cried at a wedding?
How many times have you been on a plane?
How many years did you play an instrument?
How many hours can you binge a show in one sitting?
How many dollars are in your wallet right now, roughly?
How many cousins do you have?
Where were you when you heard some big news you’ll never forget?
Where did you have your first job interview?
Where did you go on your first date?
Where did you have your most memorable meal?
Where’s the strangest place you’ve ever had a nap?
Where do you go when you need to be alone?
Where do you always get lost?
Where would you live if money was no object?
Where do you hide your snacks?
Where did you spend most summers as a kid?
Where did you last lose your keys?
Where did you learn to swim?
Where did you go to school, and what was it known for?
Where did you meet your closest friend?
Where did you take your best photo?
Name a smell that instantly takes you back in time.
Name a song that reminds you of a specific summer.
Name a movie quote you use all the time.
Name a food you will never try again.
Name the last gift you gave that flopped.
Name something you’re still angry about from years ago.
Name a childhood toy you still miss.
Name a store you loved as a kid that closed.
Name a person from your past you’d love to see again.
Name a restaurant you’d eat at every week if you could.
Name a hobby your parents made you do.
Name a book from school you actually liked.
Name a cartoon you’d rewatch tomorrow.
Name a dish you can cook without a recipe.
Name a place you were completely lost in.
Name a time you were wrong and refused to admit it.
Name a sports team you’ve supported all your life.
Name a game you were obsessed with in school.
Name a famous person you’ve been compared to.
Name a TV character you’d want as a roommate.
Name a house chore you’d pay someone to do.
Name something you’re weirdly competitive about.
Name something you’ve been putting off for months.
Name a thing you’d never share with anybody.
Name your most-played song of the year.
What would your last meal on Earth be?
What would you do if you won the lottery tomorrow?
What would you name a boat you owned?
What would you name your autobiography?
What would be your walk-up song?
What would you do with a free day and no phone?
What would you do if you were invisible for an hour?
What would your personal theme song be?
What would your superhero name be?
What would your pirate name be?
What would you order on a first date to impress someone?
What would you grab if the power went out?
What would you do on a snow day as an adult?
What would your reality show be called?
What would your alter ego be called?
What’s the most unusual place you’ve sung in?
What’s the quickest you’ve ever fallen in love with a place?
What’s the youngest you’ve ever felt embarrassed?
What’s the earliest you’ve ever woken up, and why?
What’s the latest you’ve ever stayed out?
What’s the most spontaneous trip you’ve taken?
What’s the longest road trip you’ve done?
What’s the longest you’ve gone without sleep?
What’s the longest line you’ve ever waited in?
What’s the longest you’ve held your breath?
What’s the longest relationship you’ve ever had with a gym membership?
What’s the highest you’ve ever climbed?
What’s the fastest you’ve ever driven?
What’s the farthest you’ve ever walked in a day?
What’s the loudest you’ve ever screamed?
What’s the most you’ve ever eaten in one sitting?
What’s the most people you’ve ever fit in one car?
What’s the most you’ve ever spent on a haircut?
What’s the most you’ve ever laughed in a single moment?
What’s the most money you’ve ever found?
What’s the most ridiculous argument you’ve ever won?
What’s the most ridiculous thing you’ve ever been fined for?
What’s the most reckless thing you did as a teenager?
What’s the most generous thing a stranger has done for you?
What’s the most generous thing you’ve done for a stranger?
What’s the most thoughtful gift you’ve ever been given?
What’s the most unusual pet you’ve ever known?
What’s the most unusual thing you’ve ever eaten for breakfast?
What’s the most unusual thing in your home right now?
What’s the most unusual way you’ve ever gotten hurt?
What’s the most unusual name you’ve ever heard?
What’s the most unusual job you’ve ever had?
What’s the most unusual thing you’ve ever bought online?
`);

/* Quip Off prompts */
const QP_P = L(`
A terrible name for a pet goldfish
The worst thing to hear from your pilot mid-flight
A rejected slogan for a gym
What the moon is actually made of
The worst flavor of toothpaste
Something you shouldn’t bring to a first date
A surprising use for a spatula
What your dog thinks about when you leave
The title of a very boring autobiography
A terrible superpower
What your grandma secretly does when nobody’s looking
The worst fortune cookie message
A bad time to start laughing
What the squirrels are plotting
The last thing you’d want to hear during surgery
A weird thing to collect
The worst advice for a job interview
A bad name for a rock band
What’s really inside a piñata
A rejected children’s book title
A bad place to hide a spare key
The worst thing to be famous for in your town
An awkward thing to say while hugging someone
A bad nickname for a toddler
The real reason the chicken crossed the road
A terrible pickup line for a robot
What a cat would say in court
The strangest thing to bring to a potluck
A bad name for a luxury perfume
What the weatherman is afraid to tell you
A terrible thing to whisper to a stranger on a bus
The worst thing to discover in your attic
What the Wi-Fi password should really be
Something you shouldn’t do in an elevator
A surprise ingredient in grandma’s famous soup
The worst thing to pack for a camping trip
A terrible way to announce you’re quitting
A weird thing to say to your barber
The worst name for a mattress company
What aliens find most confusing about humans
A new rule for the office microwave
A terrible title for a romantic comedy
A red flag in a dating profile
The worst pet name for your partner
A terrible first-date activity
Something you should never text your ex
The most awkward thing to say on a first date
The worst way to propose
A suspicious reason to be late to your own wedding
The worst thing to find in your partner’s search history
A terrible couples’ costume
The worst excuse for missing work
A terrible company mission statement
A new buzzword nobody asked for
Something you’d never want in your out-of-office reply
An unhelpful sign in the break room
A terrible job for someone who is afraid of everything
A real job that sounds fake
The worst thing to cc your boss on
A bad excuse for not doing your homework
A very honest résumé skill
What’s really going on in the junk drawer
A bad name for a vacuum cleaner
A rejected name for a new houseplant
What your fridge says at 3 a.m.
A terrible thing to put in your will
What the neighbor is definitely building in the garage
A sketchy use for a garden gnome
The real reason your socks go missing
The worst thing to find in the dryer
A terrible chore app notification
Something you’d never say about your own cooking
A terrible slogan for a tourist town
The worst souvenir to bring back
What the airline should really put on the safety card
The worst name for a road-trip playlist
The worst thing to hear from your GPS
A terrible reason to cancel your vacation
The worst hotel amenity
What the secret ingredient really is
An unappetizing way to describe cheese
A terrible app idea
What your phone would say about you if it could talk
The worst ringtone to have during a quiet meeting
A terrible error message
The worst password
A terrible feature for a new smartphone
A suspicious thing a self-driving car might say
A rejected name for a newly discovered animal
What your cat is really thinking
A terrible pet to have in an apartment
The worst job for a seagull
What the bear said to the camper
The real reason birds sing at dawn
A terrible mascot for a school
What the penguins do when the zoo closes
A weird thing a raccoon would steal
The worst animal to have as a roommate
A terrible quest for a hero to receive
A bad name for a spaceship
What time travelers are afraid of
A really disappointing prophecy
Something you shouldn’t say to a king
A bad place to land a spaceship
The worst power-up in a video game
A terrible movie sequel title
The worst award to win
A terrible name for a sports team
A rule change that would ruin your favorite sport
Something you’d hear at the world’s most boring sporting event
An awkward name for a group chat
The worst gift for a coworker
A bad thing to bring to a baby shower
The worst way to start a toast
A rejected greeting card message
The most useless life hack
A terrible name for a neighborhood
What your future self would tell you to stop doing
A terrible thing to say during a magic trick
An unconvincing excuse for a messy room
A sign you shouldn’t hang in a daycare
What you shouldn’t yell on a roller coaster
A bad name for a charity
The worst thing to put in a time capsule
What the mayor secretly wants to ban
The worst possible name for a baby
A disappointing thing to find inside a treasure chest
A ridiculous holiday we should celebrate
A very specific fear
The worst thing to hear when you wake up from a nap
What the spaghetti thinks is happening
A terrible thing to say when meeting your partner’s parents
Finish the headline: “Town Baffled After Giant ___ Appears Overnight”
Finish the headline: “Local Man Banned From ___ for Life”
Finish the headline: “Scientists Confirm ___ Is Actually Bad for You”
A one-star review of the moon
A one-star review of Mondays
What the pigeons would do if they ran the city
The secret life of an umbrella
A surprising thing to hear a toddler say at dinner
The reason the elevator is taking so long
A new family holiday tradition that should never be repeated
A terrible thing to engrave on a trophy
What your alarm clock says to you every morning
A rumor you’d start about your neighbor
An unexpected side effect of a miracle cure
What the mirror says when you’re running late
The first sentence of a terrible novel
A bad lyric for a love song
A very boring documentary title
A disappointing wish to make on a shooting star
What the traffic cone has seen
A terrible name for a hurricane
A politely worded complaint about the weather
What a baby would put on their résumé
A reason you’ve been “totally fine” for three weeks
A terrible opening line for a bedtime story
A useless invention that somebody still bought
A new category for the Nobel Prize
What your houseplant says when you forget to water it
An apology text to a goat
A suspicious thing to find on a neighbor’s doorstep
What the snowman is thinking in April
The strangest reason to get a parking ticket
A board game nobody should ever invent
What the cat sitter would report back
A weirdly specific superstition
A terrible diet trend
A business pitch that gets laughed out of the room
A rejected name for a lamp
The worst hobby to discover your neighbor has
A way to make a boring meeting better
What the squirrel left in your mailbox
The last item on a very strange bucket list
An odd rule at the world’s most exclusive club
An overdramatic way to say “I’m hungry”
A diary entry from a lost sock
What your shoes say about you
A horoscope that is way too specific
A conspiracy theory about something harmless
An unlikely famous duo
A campfire story that ends badly
A completely made-up fun fact
A slogan for a very ordinary paperclip
A one-sentence movie pitch that sounds dumb
A new use for an old bathtub
What’s really at the end of the rainbow
An overly honest label on a jar
What the weather forecast should actually say
A new rule on the bridge troll’s toll sign
A rejected name for a type of cloud
A bad thing to be allergic to
A strange talent you secretly wish you had
What the hiccups are trying to tell you
A message in a bottle nobody wants to find
A rejected Halloween costume
A confusing step in flat-pack furniture instructions
A harsh nickname for the sun
A name for your Wi-Fi router
A cartoon crime nobody ever reports
What the lawn flamingo has witnessed
A completely unnecessary app notification
A bad thing to yell in a library
The worst thing to say at a wedding
The worst hotel review: “Would not stay again because…”
Something you’d regret putting on a pizza
A weird pizza topping that should be illegal
A disappointing superhero catchphrase
The worst thing to hear at the dentist
A dating app bio for a vampire
The worst thing to hear from the chef
Something a game show host should never say
A terrible motivational poster
The worst thing for a robot butler to say
What the dragon is really guarding
A wizard’s most embarrassing spell
A villain’s most petty plan
What a grumpy mime would say
Something a ghost would complain about
A bad thing to say to airport security
A strange rule at the world’s weirdest school
A terrible theme for a birthday party
`);

/* Fakeout facts: question with ___ blank | true answer */
const FB_Q = L(`
Jars of still-edible honey have been found in ancient ___ tombs.|Egyptian
Octopuses have ___ hearts.|three
A group of flamingos is called a ___.|flamboyance
Wombat poop comes out shaped like ___.|cubes
The national animal of Scotland is the ___.|unicorn
Botanically speaking, a banana is a type of ___.|berry
In 1999, a metric-versus-imperial mix-up destroyed NASA’s ___.|Mars Climate Orbiter
On hot summer days, the Eiffel Tower grows up to 15 centimeters taller because of the ___.|heat
Sharks were swimming in the oceans before there were any ___.|trees
A day on Venus lasts longer than a Venus ___.|year
When Pringles can inventor Fredric Baur died, some of his ashes were buried in a ___.|Pringles can
Cleopatra lived closer in time to the Moon landing than to the building of the ___.|Great Pyramid
Oxford University is older than the ___ Empire.|Aztec
The word “quarantine” comes from the Italian for ___ days.|forty
Nintendo started out in 1889 making handmade ___.|playing cards
Before it was called Google, the search engine was nicknamed ___.|BackRub
The very first item sold on eBay was a broken ___.|laser pointer
Starbucks was almost named after the whaling ship from Moby-Dick, the ___.|Pequod
Play-Doh was originally invented as a ___ cleaner.|wallpaper
Listerine was originally created as a surgical ___.|antiseptic
Coca-Cola was first sold in 1886 as a ___.|medicine
In Switzerland, it is illegal to own just one ___ because they get lonely.|guinea pig
The little dot over a lowercase “i” is called a ___.|tittle
The plastic tips on the ends of shoelaces are called ___.|aglets
Hawaiian pizza was invented in ___.|Canada
The Caesar salad was invented in a restaurant in ___.|Mexico
A baby puffin is called a ___.|puffling
A group of owls is called a ___.|parliament
A group of porcupines is called a ___.|prickle
Abraham Lincoln is in the National ___ Hall of Fame.|Wrestling
In 1952, Albert Einstein was offered the presidency of ___.|Israel
Because Venus spins backwards, the Sun there rises in the ___.|west
Crows can remember and hold grudges against individual human ___.|faces
The Hundred Years’ War actually lasted ___ years.|116
Percy Spencer discovered microwave cooking when a ___ melted in his pocket.|candy bar
Dolphins sleep with one ___ open.|eye
Mr. Potato Head was the first toy ever advertised on ___.|television
Ancient Romans used ___ as a mouthwash.|urine
A cow’s stomach has ___ compartments.|four
Starfish have no ___.|brain
Among seahorses, it is the male who gives ___.|birth
Giraffes have the same number of neck bones as humans: ___.|seven
Koalas have fingerprints that are nearly identical to those of ___.|humans
Some male penguins court a mate by offering a ___.|pebble
Butterflies taste with their ___.|feet
Sea otters hold hands while sleeping so they don’t ___.|drift apart
A tiger’s stripes are also on its ___, not just its fur.|skin
A polar bear’s skin is ___.|black
Octopus blood is ___.|blue
Axolotls can regrow entire ___.|limbs
Rats are physically unable to ___.|vomit
An ostrich’s eye is bigger than its ___.|brain
The only bird that can fly backwards is the ___.|hummingbird
The only mammal capable of true flight is the ___.|bat
Flamingos are born gray and turn pink because of their ___.|diet
The Statue of Liberty was a gift to the United States from ___.|France
Before it was called New York, the city was called New ___.|Amsterdam
Roman emperor Caligula reportedly planned to make his horse a ___.|consul
In the Great Emu War of 1932, the Australian army lost to ___.|emus
The only casualty of the 1859 standoff between the US and Britain over San Juan Island was a ___.|pig
The Wright brothers’ first powered flight lasted ___ seconds.|12
China’s first emperor was buried with an army of life-size ___ soldiers.|terracotta
The Eiffel Tower was built as a temporary structure for the 1889 ___.|World’s Fair
In 1884, P. T. Barnum marched 21 ___ across the Brooklyn Bridge to prove it was safe.|elephants
Napoleon III reserved his finest dinnerware for special guests because ___ was rarer than gold.|aluminum
In the 1600s, Dutch speculators went wild over ___.|tulips
Peanuts are not true nuts; they are ___.|legumes
Cashews grow on the outside of a fruit called the cashew ___.|apple
The red dye carmine is made from crushed ___.|insects
White chocolate contains no ___ solids.|cocoa
Much of the “wasabi” served outside Japan is really horseradish and ___.|food coloring
Carrots were originally ___, not orange.|purple
Nutmeg in very large doses can cause ___.|hallucinations
In Japan, a popular Christmas tradition is eating ___ from KFC.|fried chicken
___ float in water because they are about 25 percent air.|Apples
The most expensive spice by weight is ___.|saffron
Coffee beans are actually the ___ of a fruit.|seeds
The Aztecs used cacao beans as ___.|currency
Bananas are slightly radioactive because of their ___.|potassium
Almonds are the seeds of a fruit related to the ___.|peach
The first animal to orbit the Earth was a dog named ___.|Laika
The first person in space was ___.|Yuri Gagarin
Neptune takes about ___ Earth years to orbit the Sun.|165
Sunsets on Mars appear ___.|blue
The hottest planet in our solar system is ___.|Venus
Saturn is less dense than ___.|water
Scientists have turned ___ into diamonds using extreme pressure.|peanut butter
Adults have ___ bones.|206
The smallest bone in the human body is in the ___.|ear
Babies are born with ___ made of cartilage, not bone.|kneecaps
The only part of the human body with no blood supply is the ___.|cornea
Glass is made mostly from melted ___.|sand
Water can boil and freeze at the same time at its ___ point.|triple
Canada has more ___ than the rest of the world combined.|lakes
The country with the most time zones, counting its territories, is ___.|France
The longest river in Europe is the ___.|Volga
Nepal’s flag is the only national flag that is not a ___.|rectangle
Bolivia has two capitals: La Paz and ___.|Sucre
Iceland famously has no ___.|mosquitoes
Antarctica is technically a ___ because it gets so little precipitation.|desert
About a quarter of the Netherlands lies below ___.|sea level
In 1867, the U.S. bought Alaska from Russia for about ___ million dollars.|7
Istanbul sits on two continents: Europe and ___.|Asia
The word “robot” comes from a Czech word meaning ___.|forced labor
In Spanish, “embarazada” means ___, not embarrassed.|pregnant
In Middle English, the word “nice” originally meant ___.|foolish
In Dutch, the @ symbol is called an “ape’s ___.”|tail
The # symbol is technically called an ___.|octothorpe
In Japanese, “tsundoku” is the habit of buying books and never ___ them.|reading
The word “ketchup” likely comes from a Chinese word for a sauce made from ___.|fish
The first computer “bug” was an actual ___ found in a machine in 1947.|moth
The very first website was created at ___.|CERN
Linux’s penguin mascot is named ___.|Tux
The first video uploaded to YouTube was titled “Me at the ___.”|zoo
The first text message ever sent said “Merry ___.”|Christmas
Amazon was originally called ___.|Cadabra
Twitter was almost called twttr, with no ___.|vowels
In the original Donkey Kong, Mario was called ___.|Jumpman
The best-selling video game of all time is ___.|Minecraft
“Pokémon” is short for Pocket ___.|Monsters
Apple’s very first logo showed ___ sitting under a tree.|Isaac Newton
Olympic gold medals are mostly made of ___.|silver
In 1971, astronaut Alan Shepard hit a ___ on the Moon.|golf ball
A regulation basketball hoop is ___ feet high.|ten
Before a bout, sumo wrestlers throw ___ into the ring to purify it.|salt
The modern marathon distance of 26.2 miles was set at the 1908 Olympics in ___.|London
In bowling, three strikes in a row is called a ___.|turkey
In cricket, a score of zero is called a ___.|duck
Michael Phelps won ___ Olympic gold medals.|23
The shortest possible checkmate, Fool’s Mate, takes just ___ moves.|two
From 1900 to 1920, ___ was an Olympic sport.|tug of war
Walt Disney’s first big cartoon star was Oswald the Lucky ___.|Rabbit
Walt Disney originally wanted to name Mickey Mouse ___.|Mortimer
Dr. Seuss wrote Green Eggs and Ham on a bet using only ___ different words.|50
The Guinness Book of World Records was created to settle arguments in ___.|pubs
Beethoven was almost completely ___ when he finished his Ninth Symphony.|deaf
Elvis Presley’s middle name was ___.|Aaron
Toy Story was the first feature-length film made entirely with ___.|computer animation
In the original Wizard of Oz book, Dorothy’s magic shoes were ___, not ruby.|silver
The real bear that inspired Winnie-the-Pooh was named after the Canadian city of ___.|Winnipeg
Sherlock Holmes never actually says “Elementary, my dear ___” in Conan Doyle’s stories.|Watson
In Mary Shelley’s novel, Frankenstein is the name of the ___, not the monster.|scientist
The first product ever scanned with a barcode was a pack of ___.|chewing gum
Velcro was inspired by ___ stuck to a dog’s fur.|burrs
Post-it Notes came from a failed attempt to make a strong ___.|adhesive
Penicillin was discovered by accident when a scientist noticed ___ growing on a dish.|mold
Early chewing gum was made from a tree sap called ___.|chicle
The Leaning Tower of Pisa started leaning because it was built on soft ___.|soil
Big Ben is actually the name of the ___, not the tower.|bell
The Taj Mahal was built as a ___ for an emperor’s wife.|mausoleum
The Golden Gate Bridge is painted a color officially called International ___.|Orange
The Hollywood sign originally read “Hollywood___.”|land
The Empire State Building has ___ floors.|102
The Sydney Opera House roof is covered with over a million ___ tiles.|ceramic
The name LEGO comes from Danish words meaning “play ___.”|well
The Rubik’s Cube was invented by a Hungarian professor of ___.|architecture
The Frisbee was inspired by empty ___ tins from a bakery.|pie
Teddy bears are named after President Theodore ___.|Roosevelt
Barbie’s full name is Barbara Millicent ___.|Roberts
The first bubble gum was pink because that was the only ___ the inventor had left.|dye
A baker’s dozen is ___.|13
A newborn kangaroo is about the size of a ___.|jellybean
Spiders are not insects; they are ___.|arachnids
The first Harry Potter book is titled Harry Potter and the Philosopher’s ___.|Stone
Pasta shaped like little ears is called ___.|orecchiette
Pizza Margherita’s red, white and green toppings mirror the colors of the ___ flag.|Italian
A rhinoceros’s horn is made of ___, the same protein as your fingernails.|keratin
The Trojan War was famously ended by a giant wooden ___.|horse
The Great Fire of London started in a ___ shop on Pudding Lane.|bakery
Abraham Lincoln’s face is on the U.S. ___ bill.|five dollar
Benjamin Franklin is on the U.S. ___ bill.|hundred dollar
A shrimp’s heart is located in its ___.|head
Honeybees have ___ wings.|four
Cats have a third eyelid called the ___ membrane.|nictitating
Camels store ___ in their humps, not water.|fat
Cinco de Mayo celebrates a battle won by Mexico against ___.|France
Paella comes from the Spanish region of ___.|Valencia
Poutine is a Canadian dish made of fries, cheese curds and ___.|gravy
Baklava is layered pastry made with phyllo, nuts and ___.|honey
Vanilla comes from the pods of a type of ___.|orchid
The “ZIP” in ZIP code stands for Zone ___ Plan.|Improvement
The first known vending machine, from ancient Egypt, dispensed ___.|holy water
Since 1992, Singapore has banned the sale of most ___.|chewing gum
Each August, the Spanish town of Buñol hosts a huge food fight using ___.|tomatoes
Traditionally, spectators at Wimbledon eat strawberries and ___.|cream
The hamburger is named after a city in ___.|Germany
`).map(x => { const [q, a] = x.split('|'); return { q, a }; });

/* Poser cards: category|what everyone acts out (the poser only sees the category) */
const PS_C = L(`
Charades|Walking a dog on ice
Charades|Carrying a very full cup of hot coffee up the stairs
Charades|Fishing and snagging an old boot
Charades|Opening a stubborn jar
Charades|Folding a fitted sheet
Charades|Painting a wall in slow motion
Charades|Eating spaghetti with chopsticks for the first time
Charades|Parallel parking a giant truck
Charades|Mowing a lawn with a tiny mower
Charades|Putting up a tent in strong wind
Charades|Rowing a boat through a storm
Charades|Untangling a knot of headphones
Charades|Juggling three flaming torches
Charades|Pushing a shopping cart with a bad wheel
Charades|Blowing up a giant balloon
Charades|Shoveling heavy snow
Charades|Squeezing into a too-small sweater
Charades|Washing a very muddy elephant
Charades|Playing air drums on a roller coaster
Charades|Cracking an egg with one hand
Charades|Waltzing with an invisible partner
Charades|Sewing on a button during an earthquake
Charades|Drying off with a tiny hand towel
Charades|Pulling up a very stubborn weed
Face|Smelling something terrible
Face|Tasting a lemon for the first time
Face|Opening a gift you hate while pretending to love it
Face|Finding a spider on your pillow
Face|Hearing your own voice on a recording
Face|Meeting your biggest hero
Face|Realizing you left the oven on
Face|Being told a shocking secret
Face|Watching a stranger trip over nothing
Face|Getting splashed with ice-cold water
Face|Hearing a truly awful pun
Face|Winning a tiny plastic prize
Face|Walking straight into a glass door
Face|Finding money in an old coat
Face|Accidentally tasting soap
Face|Seeing the cutest puppy ever
Face|Realizing you walked into the wrong classroom
Face|Being photographed mid-sneeze
Face|Eating the spiciest pepper of your life
Face|Hearing a spooky story by flashlight
Face|Waiting for a friend who is an hour late
Face|Seeing the bill at a very fancy restaurant
Face|Waving at someone who wasn’t waving at you
Face|Stepping in a puddle with a hole in your shoe
Face|Hearing the ice cream truck drive away
Pose|A very tired statue
Pose|A runway model in a windstorm
Pose|A weightlifter at the Olympics
Pose|A cat about to pounce
Pose|A surfer riding a giant wave
Pose|A tree bending in the wind
Pose|A chicken doing yoga
Pose|A magazine cover star
Pose|A karate master
Pose|A bodybuilder flexing
Pose|A runner crossing the finish line
Pose|A dramatic fainting in an old movie
Pose|An orchestra conductor
Pose|Someone stuck in a revolving door
Pose|A lifeguard spotting trouble
Pose|A bored mannequin
Sound|A cow with a cold
Sound|A balloon slowly losing air
Sound|A dial-up modem connecting
Sound|A tiny dog yapping
Sound|A door that needs oil
Sound|An excited seagull
Sound|A lawn mower starting up
Sound|A kettle about to boil
Sound|A cheering stadium crowd
Sound|A car that won’t start
Sound|A tiny mouse sneezing
Sound|A dripping faucet
Sound|Ocean waves
Sound|A rooster at dawn
Sound|A phone buzzing on a table
Sound|A record scratching
Sound|A siren passing by
Sound|A chainsaw
Sound|A trumpet played badly
Sound|A squeaky shopping cart
Sound|A cat meeting a cucumber
Pose|A scarecrow guarding an empty field
Pose|A gymnast sticking a perfect landing
Pose|A diver on the edge of the high board
Pose|A person holding in a sneeze
Pose|A flamingo balancing on one leg
Pose|A fencer lunging forward
Pose|A snowman melting in the sun
Pose|A person catching a falling vase
Pose|A mountain climber reaching the summit
Charades|Carrying too many grocery bags in one trip
Sound|A foghorn
Sound|A creaky staircase
Sound|A woodpecker
Sound|A blender on high speed
Sound|A wet dog shaking off
Sound|A zipper that is stuck
Sound|A slide whistle
Sound|A distant thunderstorm
Sound|A bumblebee trapped in a jar
`).map(x => { const [cat, task] = x.split('|'); return { cat, task }; });
