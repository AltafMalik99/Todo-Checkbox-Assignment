const checkboxes = document.querySelectorAll(".todo-checkbox");

checkboxes.forEach((checkbox) => {

    checkbox.addEventListener("change", async () => {

        const id = checkbox.dataset.id;
        const status = checkbox.checked;

        try {

            const response = await fetch(`/todo/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: status
                })
            });

            const data = await response.json();

            const todo = checkbox.parentElement;
            const statusText = todo.querySelector(".status");

            statusText.innerText = status ? "Completed" : "Pending";

        } catch (error) {

            console.log(error);

        }

    });

});