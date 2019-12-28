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
                        addScore(bar.dataset.archer, this.dataset.points);
                    }

                } else {

                    if (!secondShot) {
                        this.style.borderColor = "var(--oscuro)";
                        this.classList.add("second-shot");
                        addScore(bar.dataset.archer, this.dataset.points);
                    }
                }

            } else {

                this.style.borderColor = "var(--oscuro)";
                this.classList.add("first-shot");
                addScore(bar.dataset.archer, this.dataset.points);
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

            let points = 0;

            if (firstShot) {
                firstShot.classList.remove("first-shot");
                firstShot.style = "";
                points = firstShot.dataset.points * 1;
            }
            if (secondShot) {
                secondShot.classList.remove("second-shot");
                secondShot.style = "";
                points += secondShot.dataset.points * 1;
            }

            if (points > 0) {
                removeScore(bar.dataset.archer, points);
            }

        }
    })
})

function stopper(e) {
    e.stopPropagation()
}
function removeScore(archer, points) {

    document.addEventListener("click", stopper, true);

    let body = new FormData();

    body.append('archer', archer);
    body.append('points', points);

    fetch(`remove-points.php`, {
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
