/* Calculadora de notas para alumnos

CONSIGNAS:
1. Se estableceran 3 notas con porcentajes de peso diferentes que el usuario puede seleccionar.
2. El usuario puede escribir el nombre del alumno
3. El usuario puede ver el resultado de la nota final en la consola del navegador
4. El usuario puede ingresar un nuevo alumno
5. El usuario puede filtrar por nota o por nombre del alumno
6. El usuario puede ordenar por nota o por nombre del alumno
*/


// Crear objeto Curso con constructo
class Curso {
    constructor(nombre, porcentajeNota1, porcentajeNota2, porcentajeNota3) {
        this.nombre = nombre;
        this.porcentajeNota1 = porcentajeNota1;
        this.porcentajeNota2 = porcentajeNota2;
        this.porcentajeNota3 = porcentajeNota3;
    }
}

// Crear objeto Estudiante con constructo
class Estudiante {
    constructor(nombre, nota1, nota2, nota3, curso, notaFinal){
        this.nombre = nombre;
        this.nota1 = nota1;
        this.nota2 = nota2;
        this.nota3 = nota3;
        this.curso = curso;
        this.notaFinal = notaFinal;
    }
}

// Declaramos una lista vacia de estudiantes y cursos
let listaCursos = JSON.parse(localStorage.getItem("listaCursos")) ?? [];
let listaEstudiantes = JSON.parse(localStorage.getItem("listaEstudiantes")) ?? [];

if(listaEstudiantes.length > 0 || listaCursos.length > 0) {
    const buttons = document.getElementsByClassName('Section-button');
        const search = document.getElementsByClassName('Section-div--input')[0];
        search.classList.remove('isHidden');
        for(const button of buttons){
            button.classList.remove('isHidden');
            button.classList.remove('button-effect');
        }
        localStorage.setItem( 'listaCursos', JSON.stringify(listaCursos));
        mostrarListaEstudiantes();
}


function ordenarEstudiantes() {
    const listaOrdenada = [...listaEstudiantes]; // Se utiliza el spread para evitar mutaciones en la lista orginal
    listaOrdenada.sort((estudiante1, estudiante2) => {
        return estudiante2.notaFinal - estudiante1.notaFinal;
    });
    const topList = listaOrdenada.slice(0, 3);
    mostrarTopEstudiantes(topList);
}

function buscarEstudiantes() {
    const nombreBuscado = document.getElementById('buscador').value.toLowerCase();
    console.log(nombreBuscado);
    const lista = [...listaEstudiantes];
    const listaFiltrdada = lista.filter(estudiante => estudiante.nombre.toLowerCase().includes(nombreBuscado));
    mostrarListaEstudiantes(listaFiltrdada);
}

//Calcula y retorna la nota final con base en los porcentajes ingresados
function calcularNotaFinal(nota1, nota2, nota3, curso) {
    const notaFinal = (nota1 * (curso.porcentajeNota1 / 100) +  nota2 * (curso.porcentajeNota2 / 100) + nota3 * (curso.porcentajeNota3 / 100))
    return notaFinal.toFixed(1);
}

// Mostrar lista de estudiantes
function mostrarListaEstudiantes(lista = listaEstudiantes) {
    const content = document.querySelector('.Section-div--content');
    if(lista.length === 0) {
        content.innerHTML = `
        <div class="Section-div--not-found">
            <span class="Section-span">😥</span>
            <h4 class="Section-h4">Ups, No encontramos estudiantes</h4>
        </div>
        `;
        return;
    }
    const tabla = document.createElement('table');
    tabla.classList.add('Section-table');
    tabla.innerHTML = `
        <tr class="Section-tr">
            <th class="Section-th">Nombre</th>
            <th class="Section-th">Curso</th>
            <th class="Section-th">Nota 1</th>
            <th class="Section-th">Nota 2</th>
            <th class="Section-th">Nota 3</th>
            <th class="Section-th">Nota Final</th>
        </tr>
    `;

    content.innerHTML = '';
    content.appendChild(tabla);    
    lista.forEach(estudiante => {
        const tr = document.createElement('tr');
        tr.classList.add('Section-tr');
        tr.innerHTML = `
            <td class="Section-td">${estudiante.nombre}</td>
            <td class="Section-td">${estudiante.curso.nombre}</td>
            <td class="Section-td">${estudiante.nota1} <span class="Section-span--table">(${estudiante.curso.porcentajeNota1}%)</span></td>
            <td class="Section-td">${estudiante.nota2} <span class="Section-span--table">(${estudiante.curso.porcentajeNota2}%)</span></td>
            <td class="Section-td">${estudiante.nota3} <span class="Section-span--table">(${estudiante.curso.porcentajeNota3}%)</span></td>
            <td class="Section-td Section-td--final">${estudiante.notaFinal}</td>
        `;
        tabla.appendChild(tr);
    });
}

// Mostrar top 3 estudiantes
function mostrarTopEstudiantes(lista) {
    const content = document.querySelector('.Section-div--content');
    if(lista.length === 0) {
        content.innerHTML = `
        <div class="Section-div--not-found">
            <span class="Section-span">😥</span>
            <h4 class="Section-h4">Ups, No encontramos estudiantes</h4>
        </div>
        `;
        return;
    }
    
    content.innerHTML = `
    <div class="Section-div--top row">
        <img src="./assets/img/copa.png" alt="Copa" class="Section-img col-md-6 col-12">
        <div class="Section-div--top-container col-md-6 col-12">
            <div class="Section-div--top-list">                
            </div>
        </div>
    </div>`;

    const topContainer = document.querySelector('.Section-div--top-list');

    lista.forEach((estudiante) => {
        const div = document.createElement('div');
        div.classList.add('Section-div--top-list-item');
        div.innerHTML = `
            <div class="Section-div--medal-student"></div>
            <h4 class="Section-h4">${estudiante.nombre}</h4>
            <h5 class="Section-h5">Nota Final: ${estudiante.notaFinal}</h5>
        `;
        topContainer.appendChild(div);
    });
}

// mostrarAgregarEstudiante();

function mostrarAgregarEstudiante(){
    const content = document.querySelector('.Section-div--content');
    content.innerHTML = `
        <div class="Section-div--form-student">
            <h3 class="Section-h3">Agregar Estudiante</h3>
            <form class="Section-form" onsubmit="guardarEstudiante(event)">
                <div class="Section-div--form-row row">
                    <div class="Section-div--form-group col-md-6">
                        <label for="inputName">Nombre</label>
                        <input class="Section-input Section-input--add" id="inputName" type="text" placeholder="Nombre de Estudiante" required>
                    </div>
                    <div class="Section-div--form-group col-md-6">
                        <label for="courses">Curso</label>
                        <select class="Section-select" id="courses" onchange="cambiarPorcentajeNotas()" required>   
                            <option class="Section-option" disabled selected>Selecciona el curso</option>                         
                        </select>
                    </div>
                </div>
                <div class="row Section-div--form-row">
                    <div class="Section-div--form-group col-md-4">
                        <label id="labelInputNumber1" for="inputNumber1">Nota 1 (%)</label>
                        <input class="Section-input Section-input--add Section-input--number" id="inputNumber1" type="number" placeholder="Nota" max="10" min="0" required>
                    </div>
                    <div class="Section-div--form-group col-md-4">
                        <label id="labelInputNumber2" for="inputNumber2">Nota 2 (%)</label>
                        <input class="Section-input Section-input--add Section-input--number" id="inputNumber2" type="number" placeholder="Nota" max="10" min="0" required>
                    </div>
                    <div class="Section-div--form-group col-md-4">
                        <label id="labelInputNumber3" for="inputNumber3">Nota 3 (%)</label>
                        <input class="Section-input Section-input--add Section-input--number" id="inputNumber3" type="number" placeholder="Nota" max="10" min="0" required>
                    </div>
                </div>
                <div class="row Section-div--form-row">
                    <small class="Section-small isHidden" id="errorMessage">Por favor introduce una nota valida entre el 0 y el 10.</small>
                    <button class="Section-input--add Section-button--submit col-md-12" type="submit">Guardar</button>
                </div>
            </form>
        </div>
    `;

    const seleccion = document.getElementById('courses');
    listaCursos.forEach((curso, index) => {
        const opcion = document.createElement('option');
        opcion.classList.add('Section-option');
        opcion.textContent = curso.nombre;
        opcion.value = index;
        seleccion.appendChild(opcion);
    });
}

function cambiarPorcentajeNotas() {
    const curso = document.getElementById('courses');
    const nota1 = document.getElementById('labelInputNumber1');
    const nota2 = document.getElementById('labelInputNumber2');
    const nota3 = document.getElementById('labelInputNumber3');

    nota1.textContent = `Nota 1 (${listaCursos[curso.value].porcentajeNota1}%)`;
    nota2.textContent = `Nota 2 (${listaCursos[curso.value].porcentajeNota2}%)`;
    nota3.textContent = `Nota 3 (${listaCursos[curso.value].porcentajeNota3}%)`;
}

function guardarEstudiante(event) {
    event.preventDefault();
    const nombreEstudiante = document.getElementById('inputName').value;
    const nota1 = document.getElementById('inputNumber1');
    const nota2 = document.getElementById('inputNumber2');
    const nota3 = document.getElementById('inputNumber3');

    document.getElementById('errorMessage').classList.add('isHidden');
    nota1.classList.remove('haveError');
    nota2.classList.remove('haveError');
    nota3.classList.remove('haveError');

    const opcionCurso = document.getElementById('courses').value;
    
    const nombreCurso = listaCursos[opcionCurso].nombre;
    const porcentajeNota1 = listaCursos[opcionCurso].porcentajeNota1;
    const porcentajeNota2 = listaCursos[opcionCurso].porcentajeNota2;
    const porcentajeNota3 = listaCursos[opcionCurso].porcentajeNota3;
    
    const curso = new Curso(nombreCurso, porcentajeNota1, porcentajeNota2, porcentajeNota3);
    
    if(nombreEstudiante != "" && nota1 != "" && nota2 != "" && nota3 != "", opcionCurso >= 0) {
        listaEstudiantes.push(new Estudiante(nombreEstudiante, nota1.value, nota2.value, nota3.value, curso, calcularNotaFinal(nota1.value, nota2.value, nota3.value, curso)));
        const buttons = document.getElementsByClassName('Section-button');
        for(const button of buttons){
            button.classList.remove('button-effect');
        }
        localStorage.setItem( 'listaEstudiantes', JSON.stringify(listaEstudiantes));
        mostrarListaEstudiantes();
    }
    
}

function calcularPorcentaje3() {
    const porcentajeNumero1 = document.getElementById('inputNumber1');
    const porcentajeNumero2 = document.getElementById('inputNumber2');
    const porcentajeNumero3 = document.getElementById('inputNumber3');

    porcentajeNumero3.value = 100 - porcentajeNumero1.value - porcentajeNumero2.value;

}

function guardarCurso(event){
    event.preventDefault();
    const nombreCurso = document.getElementById('inputName').value;
    const porcentajeNumero1 = document.getElementById('inputNumber1');
    const porcentajeNumero2 = document.getElementById('inputNumber2');
    const porcentajeNumero3 = document.getElementById('inputNumber3');
 
    if(nombreCurso != "" && porcentajeNumero1.value != "" && porcentajeNumero2.value != "" && porcentajeNumero3.value != "") {
        listaCursos.push(new Curso(nombreCurso, porcentajeNumero1.value, porcentajeNumero2.value, porcentajeNumero3.value));
        const buttons = document.getElementsByClassName('Section-button');
        const search = document.getElementsByClassName('Section-div--input')[0];
        search.classList.remove('isHidden');
        for(const button of buttons){
            button.classList.remove('isHidden');
        }
        localStorage.setItem( 'listaCursos', JSON.stringify(listaCursos));
        mostrarListaEstudiantes();
    }
}

function mostrarAgregarCurso(){
    const content = document.querySelector('.Section-div--content');
    content.innerHTML = `
        <div class="Section-div--form-course">
            <h3 class="Section-h3">Agregar Curso</h3>
            <form class="Section-form" action="" onsubmit="guardarCurso(event)">
                <div class="Section-div--form-row row">
                    <div class="Section-div--form-group col-md-12">
                        <label for="inputName">Nombre</label>
                        <input class="Section-input Section-input--add" id="inputName" type="text" placeholder="Nombre de curso" required>
                    </div>
                </div>
                <div class="row Section-div--form-row">
                    <div class="Section-div--form-group col-md-4">
                        <label for="inputNumber1">Valor Nota 1 (%)</label>
                        <input class="Section-input Section-input--add Section-input--number" id="inputNumber1" type="number" placeholder="Porcentaje" oninput="calcularPorcentaje3()" required>
                    </div>
                    <div class="Section-div--form-group col-md-4">
                        <label for="inputNumber2">Valor Nota 2 (%)</label>
                        <input class="Section-input Section-input--add Section-input--number" id="inputNumber2" type="number" placeholder="Porcentaje" oninput="calcularPorcentaje3()" required>
                    </div>
                    <div class="Section-div--form-group col-md-4">
                        <label for="inputNumber3">Valor Nota 3 (%)</label>
                        <input class="Section-input Section-input--add Section-input--number" id="inputNumber3" type="number" placeholder="Porcentaje" required disabled>
                    </div>
                </div>
                <div class="row Section-div--form-row">
                    <small class="Section-small isHidden" id="errorMessage">Por favor introduce porcentaje válido para la nota.</small>
                    <button class="Section-input--add Section-button--submit col-md-12" type="submit">Guardar</button>
                </div>
            </form>
        </div>
    `;
}