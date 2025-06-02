
let numberOfDrumButton = document.querySelectorAll("button.drum").length;
let arrayOfDrumButton = document.querySelectorAll("button.drum");
for(let i = 0; i<numberOfDrumButton; i++)
    arrayOfDrumButton[i].addEventListener("click", function(){
    let buttonHTML = this.innerHTML;
    (letterButton[buttonHTML] || (() => console.log(buttonHTML)))();
    buttonAnimtion(buttonHTML);

})
const letterButton ={
        w: () => {let tom1 = new Audio('./sounds/tom-1.mp3')
            tom1.play();
        },
        a: () => {let tom2 = new Audio('./sounds/tom-2.mp3')
            tom2.play();
        },
        s:() => {let tom3 = new Audio('./sounds/tom-3.mp3')
            tom3.play();
        },
        d:() => {let tom4 = new Audio('./sounds/tom-4.mp3')
            tom4.play();
        },
        j:() => {let crash = new Audio('./sounds/crash.mp3')
            crash.play();
        },
        k:() => {let kick = new Audio('./sounds/kick-bass.mp3')
            kick.play();
        },
        l:() => {let snare = new Audio('./sounds/snare.mp3')
            snare.play();
        },
    }


document.addEventListener("keydown", function(event){
    let nameKey = event.key;
    (letterButton[nameKey] || (() => console.log(event)))();
    buttonAnimtion(nameKey);
})

function buttonAnimtion(currentKey){
    let activeButton = document.querySelector("."+currentKey);
    activeButton.classList.add("pressed");
    setTimeout(() => activeButton.classList.remove("pressed"), 100);
}