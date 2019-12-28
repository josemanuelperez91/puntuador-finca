document.querySelectorAll(".button-score-bar").forEach((bar) => {

    bar.querySelectorAll(".score-button").forEach((button) => {


        button.onclick = function () {
            let firstShot = bar.querySelector(".first-shot");
            let secondShot = bar.querySelector(".second-shot");

            if (firstShot) {
                if (firstShot === this) {
                    if (!secondShot) {
                        this.style.backgroundColor = "var(--oscuro)";
                        this.classList.add("second-shot");
                        addScore(bar.dataset.archer, this.dataset.value);
                    }

                } else {

                    if (!secondShot) {
                        this.style.borderColor = "var(--oscuro)";
                        this.classList.add("second-shot");
                        addScore(bar.dataset.archer, this.dataset.value);
                    }
                }

            } else {

                this.style.borderColor = "var(--oscuro)";
                this.classList.add("first-shot");
                addScore(bar.dataset.archer, this.dataset.value);
            }

        }
    })

    bar.querySelectorAll(".delete-button").forEach((deleteButton) => {

        deleteButton.onmousedown = function () {
            this.classList.add("pressed-button");
        }
        deleteButton.onmouseup = function () {
            this.classList.remove("pressed-button");
        }

        deleteButton.ontouchstart = function () {
            this.classList.add("pressed-button");
        }
        deleteButton.ontouchend = function () {
            this.classList.remove("pressed-button");
        }

        deleteButton.onclick = function () {
            let firstShot = bar.querySelector(".first-shot");
            let secondShot = bar.querySelector(".second-shot");

            if (firstShot) {
                firstShot.classList.remove("first-shot");
                firstShot.style  = "";
            }
            if (secondShot) {
                secondShot.classList.remove("second-shot");
                firstShot.style  = "";


            }

        }
    })
})

function stopper(e) {
    e.stopPropagation()
}

function addScore(archer, points) {

    document.addEventListener("click", stopper, true);

    let body = new FormData();

    body.append('archer', archer);
    body.append('points', points);

    fetch(`store-points.php`, {
        method: 'post',
        body: body,
        credentials: 'include'
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then(function (result) {
            document.querySelector(`#archer-${archer}-total-score`).innerHTML = `${result.totalPoints}`;
            document.removeEventListener("click", stopper, true);
        })
        .catch(function (error) {
            document.removeEventListener("click", stopper, true);
            alert("No se pudo actualizar la puntuación");
        })
}
