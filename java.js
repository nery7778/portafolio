function agregarTarea() {

    const input = document.getElementById("nuevaTarea");

    const texto = input.value.trim();
 
    if (texto === "") {

        alert("Por favor, escribe una tarea.");

        return;

    }
 
    const lista = document.getElementById("listaTareas");
 
    const li = document.createElement("li");

    li.textContent = texto;
 
    const btnOk = document.createElement("button");

    btnOk.textContent = "OK";

    btnOk.onclick = function () {

        lista.removeChild(li);

    };
 
    li.appendChild(btnOk);

    lista.appendChild(li);
 
    input.value = "";

}

 