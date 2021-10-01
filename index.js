let button = document.getElementById("imReady");

function startGame(){
    document.getElementById("imReady").style.display="none";
    document.getElementById("command").style.display="inline-block";
    document.getElementById("game").style.display= "inline-block";
    document.getElementById("textarea").style.display= "inline-block";
   document.getElementById("textarea").innerHTML = displayRoomInfo(currentRoom);
}

function actionHandler(action, character){
switch(action) {
    case "fight":
        //still needs work
    if (character.fight() === true) {
        thisPlayer.checkBag(character.weakness)
        msg = "congratulations you have slain " + Character.name;
        alert(msg)
    } else{
        alert("Welcome to DEATH!")
    }
    break;
    case "speak":
        msg = character.conversation;
        alert(msg)
        break;
    case "handshake":
        msg = Character.handshake();
        alert(msg)
        break;
    case "take":
        thisPlayer.addToBag(currentRoom.item);
        msg = currentRoom.item.name + " added to bag";
        alert(msg)
        break;

    case "ascend":
        currentRoom.move("ascend")
        break;
    case "descend":
        currentRoom.move("descend")
        break;
    case "north":
        currentRoom.move("north")
        break;
    case "east":
        currentRoom.move("east")
        break;
    case "south":
        currentRoom.move("south")
        break;
    case "west":
        currentRoom.move("west")
        break;
        default:
            alert("not done yet")
            break;
}
}

function displayRoomInfo(room) {
    let occupantMsg = "";
    let itemMsg = "";
    console.log(room);
    if (room.character === null) {
        if (room.roomItem == null) {
            occupantMsg = "";
        } else {
            console.log(room.roomItem.describe())
            occupantMsg = room.roomItem.describe();
        }} else {
            occupantMsg = room.character.describe() + ".";
        }
let characterDescription = ""
if (currentRoom.character != null){
    characterDescription = currentRoom.character.describe()
}
let roomItemDescription = ""
if (currentRoom.item != null) {
    roomItemDescription = currentRoom.item.describe()
}
        
textContent = "<p>" + currentRoom.describe()  + "</p>" + "<p>" +
         occupantMsg + "</p>" + "<p>" + roomItemDescription + "</p>" + "<p>" + room.getDetails() + "</p>" ; 

     return textContent
//   document.getElementById("textarea").innerHTML = textContent;
//   document.getElementById("buttonarea").innerHTML = '><input type="text" id="usertext" />';
//   document.getElementById("usertext").focus();
}





// Element.style.display.none to hide .block to show

class Room{
    constructor(name) {
        this._name = name;
        this._description = "";
        this._linkedRooms={}; //< empty object
        this._character = null;
        this._roomItem = null;
    }
    get name(){
        return this._name
    }

    set name(value) {
        if (value === "") {
        alert("Name is too short.");
        return;
    }
    this._name = value;
    }

    get description(){
        return this._description
    }

    set description(value) {
        this._description = value;
      }

      get character() {
        return this._character
      }

      set character(value) {
        this._character = value;
      }

      get item() {
        return this._roomItem
      }
      set item(value) {
        this._roomItem = value;
      }
    

    describe() {
        return "In this " + this.name + " you see " + this.description;
    }
  
    get linkedRooms()
    {
        return this._linkedRooms
    }

    linkRoom(direction,room)
    {
        this._linkedRooms[direction] = room;
    }

    getDetails() {
        const entries = Object.entries(this._linkedRooms);
        let details = []
        for (const [direction, room] of entries) {
          let text = " The " + room._name + " is " + direction + " of here.";
          details.push(text);
        }
        return details;
      }
    

    move(direction){
        if(direction in this._linkedRooms){
            return this._linkedRooms[direction];
        } else {
            alert("WARNING! Turn Back!!")
            return this;
        }

    }
    // describe() {
    //     return "I am" + this._name + "I have " + this._description;
    // }
}

class Item{
    constructor(name) {
        this._name = name;
        this._description = "";
        }

    get name(){
        return this._name
    }

    set name(value){
        this._name = value;
    if (value)"HealthVial"; {
        alert("Picked Up Health");
        return;
    }
    }

    get description(){
        return this._description
    }
    set description(value) {
        this._description = value;
    }
  
        describe(){
            return "You have found a " + this._name + " it is a " + this._description;
        }

}


class Character{
    constructor(name) {
        this._name = name;
        this._description = "";
        this._conversation= ""
        }


    get name(){
        return this._name;
    }
    set name(value) {
        this._name = value;
        
 
    }   

    get description(){
        return this._description;
    }

    set description(value){
        this._description = value;
    }

    get conversation(){
        return this._conversation;
    }

    set conversation(value){
        this._conversation = value;
    }
    
    describe() {
        return "You have found " + this._name + ", " + this._name + " is " + this._description;
    }

    speak(){
        return this._name + " says " + this.conversation;
    }

}

class Enemy extends Character{
    constructor(name,weakness){
        super(name, "Enemy")
        this._weakness = weakness;
    }
get weakness(){

}

set weakness(value){
    if (value.length < 4) {
        console.error("Description is too short.");
        return;
    } this._weakness = value;
}

    fight(item){
        if(item == this._weakness){
            return true;
        } else {
            return false;
        }
    }
    attack(){
        alert(this._name + "Attacks You!")
    }
}

class Ally extends Character{
    constructor(name){
        super(name)
        this._artifact = ""
    }

    get artifact() {
        return this._artifact
      }
    
      set artifact(value) {
        this._artifact = value;
      }

      handshake() {
          return "You have built an alliance with " + this._name + " through a trusting handshake, and a friendly smile." + this._name + " insists you take this " + this._artifact.name + " it is a " + this._artifact.description;
      }
}

class Player {
    constructor() {
        this._bag = []
        this._health = 100
    }

    get health() {
        return this._health;
      }
    
      get bag() {
        return this._bag;
      }

      get equipped(){
          return this._equipped;
      }

    changeHealth(value,up) {
        if(up) {
            this._health = this._health + value;
        } else {
            this._health = this._health - value;
        }
        return this._health;
    }

    addToBag(item){
        if (item != null){
        this._bag.push(item);
        } else {
            return alert("nothing to pick up!")
        }
    }

    checkBag(item) {
        for (let i = 0; i <this.bag.length; i++) {
            if (list[i] === item) {
                return true;
            }
        }
        return false;
    }
    // equipItem(value){
    //     if (value) {
    //         value == Item
    //     }
    // }
}


// Rooms
const Kitchen = new Room("Kitchen");
Kitchen._description = "A rustic styled kitchen with a large gas stove, the moonlight pierces through the empty space"
const DiningRoom = new Room("Dining Room")
DiningRoom._description =" a worried looking man, there is a pure Silver Shining Sabre hanging on the wall."
const LivingRoom = new Room("Living Room")
LivingRoom._description = "a living area with a grand fireplace above it you see a glimmering Tomahawk"
const Conservatory = new Room("Conservatory")
Conservatory._description = "a spacious and bright room, with celing high windows"
const Cellar = new Room("Cellar")
let currentRoom = Cellar
Cellar._description = "a dark and dusty underground room, full of vintage wine bottles and scurrying spiders"
const Pantry = new Room("Pantry")
Pantry._description = "Full of Delicious Snacks"
const Corridor = new Room("Corridor")
Corridor._description ="A large corridoor with high ceilings, decadent artwork and a spiraling staircase. Oh no!!!! "
const Landing = new Room ("Landing")
Landing._description ="Upstairs Landing, scented with autumnal candles"
const Office = new Room ("Office")
Office._description ="A well used study space with books and scriptures sprawled all over the desk. "
const SecretRoom = new Room ("Secret Room")
SecretRoom._description ="a small secluded room hidden behid the desk wall, there must be a purpose? Here you find a oddly designed key with the letter O hanging on it's chain"
const BathRoom = new Room ("BathRoom")
BathRoom._description = " A well lit and spacious Bath Room with marble floors and a stand alone risen bath"
const MasterBedroom = new Room ("Master Bedroom")
MasterBedroom._description = "A large decadent bedroom with a four poster bed and ensuite attatched"
const EnSuite = new Room ("En Suite")
EnSuite._description = " a highly personalised bathroom with the owner's belongings carefully placed in specific areas"
const Observatory = new Room("Observatory")
Observatory._description = "Huge room taking up the entire 2nd floor of the building with a sizeable telescope, a huge number of scientific instruments and a few computers around."
const WalkInWardrobe = new Room("Walk In Wardrobe")
WalkInWardrobe._description = "Filled with xpensive looking suits. hats and shoes aswell as a few custom pieces of armour?"

//Items
const SilverSaber = new Item("Silver Saber")
SilverSaber.description = "A Stunning Silver Saber, it's purity is easy to tell since its so reflective it looks like it is radiating light, well balanced for superior combat use"
const ToxinTippedTomahawk = new Item ("Toxin Tipped Tomahawk")
ToxinTippedTomahawk.description = "A Tomahawk carved from Oak with intricate engravings. It reads 'Beware the tip', "
const ZeroKelvinKusarigama = new Item ("Zero Kelvin Kusarigama")
ZeroKelvinKusarigama.description = "A Kusarigama, somehow allows the wielder to freeze anything they hit with the blades edge down to 0 degrees Kelvin"

const HealthVial = new Item("Health Vial")
HealthVial.description = ""
const Armour = new Item("Armour")
Armour.description =""

const OKey = new Item ("O-Key")
OKey.description = "A strange looking Key found in a secret location....What could it unlock?"

//Characters
const Derrick = new Ally("Derrick")
Derrick.description = "a Wise looking gentleman appears to have hidden himself away in the Dining Room, he crawls out from under the table as you approach"
Derrick.conversation = "Hello Stranger! I'm glad to see you are not one of the beasts that has invaded this fine establishment! If you manage to get through the corridor just know that you'll need the Tomahawk embued with Lucibufagen in the Living Room to get through the next beast! "

const Emmanuel = new Ally("Emmanuel")
Emmanuel.description = "A hulking man is wounded, slouched up against the wall with blood dripping from a deep claw wound on his chest"
Emmanuel.conversation = "Am I glad to see another human! I thought it was that Werewolf coming back to finish me off!"

const Liara = new Ally("Liara")
Liara.description = "With an aura of calm, Liara sits waiting in the Office at a desk her gaze never leaves yours."
Liara.conversation = "I hope nothing followed you! I'm impressed you have made it here unscathed, you must be able to handle yourself, You'll need whats in the Secret Room to the South of here if you're going to continue. "

const WereWolf = new Enemy("WereWolf", SilverSaber)
WereWolf.description = "a grotesque Werewolf creature looks up from the carcass of a rabbit and snarls in your direction! He rises up, blood dripping from his fang and sprints towards you!"
WereWolf.conversation = "MMmmmm Dinner Time Aw Aw Awooooooo"
WereWolf.weakness = SilverSaber

const WereCroc = new Enemy("WereCroc", ToxinTippedTomahawk)
WereCroc.description = "An 8-foot reptilian monstrosity that stands before you, eyeing you with cold-blooded death stare, he inhales deeply"
WereCroc.conversation = "You smell like the blood of my brother, What have you done with him?!"
WereCroc.weakness = ToxinTippedTomahawk

const RoidRilla = new Enemy("RoidRilla", ZeroKelvinKusarigama)
RoidRilla.description = "A freakishly large Guerrilla is in a rampage decimating expensive looking equipment, he notices you enter the Observatory from the corner of his eye and immeditely flings a barrel at you"
RoidRilla.conversation = " UAAARGHHHAAAGGAAA, YOU....DIE...HERE!"
RoidRilla.weakness = ZeroKelvinKusarigama

//Items to Rooms
DiningRoom.item = SilverSaber
LivingRoom.item = ToxinTippedTomahawk
MasterBedroom.item = ZeroKelvinKusarigama


Pantry.item = HealthVial
WalkInWardrobe.item = Armour
SecretRoom.item = OKey

// Characters in rooms
Conservatory.character = Emmanuel
DiningRoom.character = Derrick
Office.character = Liara

Corridor.character = WereWolf
MasterBedroom.character = WereCroc
Observatory.character = RoidRilla
//Artefact


//Mapping
Cellar.linkRoom("ascend",Kitchen)
Kitchen.linkRoom("descend",Cellar)
Kitchen.linkRoom("north",Conservatory)
Conservatory.linkRoom("south",Kitchen)
Kitchen.linkRoom("west",DiningRoom)
DiningRoom.linkRoom("east",Kitchen)
Kitchen.linkRoom("east",Pantry)
Pantry.linkRoom("west",Kitchen)
Kitchen.linkRoom("south",Corridor)
Corridor.linkRoom("north", Kitchen)

Corridor.linkRoom("east",LivingRoom)
LivingRoom.linkRoom("west",Corridor)
Corridor.linkRoom("ascend",Landing)
Landing.linkRoom("descend",Corridor)
//Locked Room South of Corridor

Landing.linkRoom("west",Office)
Office.linkRoom("east",Landing)
Office.linkRoom("south",SecretRoom)
SecretRoom.linkRoom("north",Office)
Landing.linkRoom("north",MasterBedroom)
MasterBedroom.linkRoom("south",Landing)
Landing.linkRoom("east",BathRoom)
BathRoom.linkRoom("west",Landing)

MasterBedroom.linkRoom("east",EnSuite)
EnSuite.linkRoom("west",MasterBedroom)
// WalkInWardrobe unlockable by finding key in Secret Room
MasterBedroom.linkRoom("west",WalkInWardrobe)
WalkInWardrobe.linkRoom("east",MasterBedroom)
MasterBedroom.linkRoom("ascend",Observatory)
Observatory.linkRoom("descend",MasterBedroom)



LivingRoom.linkRoom ("west",Corridor)
Corridor.linkRoom("east",LivingRoom)


//creat Player
const thisPlayer = new Player();
console.log(thisPlayer.health);



window.onload =() => {document.getElementById("textarea").innerHTML = displayRoomInfo(currentRoom)

document.addEventListener("keydown",function(event){
    if(event.key === "Enter") {
        
        command = document.getElementById("command").value;
        //direction commands
        const directions = ["north","south","east","west","ascend","descend"];
        const actions = ["fight", "handshake", "speak", "take", "inventory", "equip"];
        if(directions.includes (command)){
            currentRoom = currentRoom.move(command);
           
            document.getElementById("command").value = "";
        } else if (actions.includes(command)) {
                actionHandler(command, currentRoom.character)
                document.getElementById("command").value = "";
        } else {
            
            prompt("invalid command")
        } document.getElementById("textarea").innerHTML = displayRoomInfo(currentRoom)
    }
})
}
