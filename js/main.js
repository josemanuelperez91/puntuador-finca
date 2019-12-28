newInput.onclick = function (e) {
    e.preventDefault();

    newInput.insertAdjacentHTML('beforebegin',
        `<input class="standard-input appearing-input" name="archers[]" required type="text" placeholder="Nombre">
        <div onclick="removeInput(this)" class="removeMe"></div>
        `);
}

document.querySelectorAll(".standard-button").forEach((button) => {

    button.onmousedown = function () {
        this.classList.add("pressed-button");
    }
    button.onmouseup = function () {
        this.classList.remove("pressed-button");
    }

    button.ontouchstart = function () {
        this.classList.add("pressed-button");
    }
    button.ontouchend = function () {
        this.classList.remove("pressed-button");
    }
})

function removeInput(removeMe) {
    removeMe.previousElementSibling.remove();
    removeMe.remove();


}