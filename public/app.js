document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
  if (event.target.dataset.type === "change") {
    const id = event.target.dataset.id;
    const result = prompt("Введите новое название");
    if (result) {
      edit(id, result).then(() => {
        event.target.closest("li").textContent = result;
        // console.log((event.target.closest("li").textContent = result));
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, result) {
  await fetch(`/${id}/${result}`, { method: "PUT" });
}
