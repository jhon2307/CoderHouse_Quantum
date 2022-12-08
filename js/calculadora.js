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

// Declaramos una lista vacia de estudiantes
let listaEstudiantes = [];


alert('Bienvenido! A continuación debes indicar el nombre del curso y el porcentaje de cada nota SIN el simbolo % y una nota entre 0 y 10');
// Establecer el nombre del curso, los porcentajes de cada nota y asegurarse que el usuario indique un número válido.
const nombreCurso = prompt('Ingresa el nombre del curso:');
let porcentajeNota1 = parseFloat(prompt('Porcentaje Nota 1:')); 
while (isNaN(porcentajeNota1) || porcentajeNota1 > 100 || porcentajeNota1 < 0) {
    porcentajeNota1 = parseFloat(prompt('Por favor ingrese un porcentaje valido para la Nota 1:')); 
}
let porcentajeNota2 = parseFloat(prompt('Porcentaje Nota 2:'));
while (isNaN(porcentajeNota2) || porcentajeNota2 < 0 ||  (porcentajeNota1 + porcentajeNota2) > 100){
    porcentajeNota2 = parseFloat(prompt('Por favor ingrese un porcentaje valido para la Nota 2:')); 
}
let porcentajeNota3 = (100 - porcentajeNota1 - porcentajeNota2);
alert('Calculo automático para NOTA 3 = ' + porcentajeNota3 + '%');

const curso = new Curso(nombreCurso, porcentajeNota1, porcentajeNota2, porcentajeNota3);

// Crear el primer estudiante y guardarlo en la lista
alert('Genial! Ahora vamos a agregar tu primer estudiante');
agregarEstudiante();
alert('Gracias! Tu estudiante se ha guardado de forma exitosa');


// Mostrarmos menu
let salir = false;
do {
    let seleccionMenu = prompt('Por favor selecciona alguna de las siguientes opciones: \n\n1. Agregar estudiante\n2. Ver todos los estudiantes\n3. Ver top 3 estudiantes\n4. Buscar estudiante\n\n5. Cerrar sesión\n');
    switch (seleccionMenu) {
        case '1':
            agregarEstudiante();
            break;
        case '2':
            verEstudiantes();
            break;
        case '3':
            ordenarEstudiantes();
            break;
        case '4':
            buscarEstudiantes();
            break;
        case '5':
            salir = true;
            break;
    }
} while (!salir);




function agregarEstudiante(){
    let nombreEstudiante = prompt('Por favor ingresa el nombre del estudiante:');
    let nota1 = validarNotaIngresada('Ingrese la nota 1:');
    let nota2 = validarNotaIngresada('Ingrese la nota 2:');
    let nota3 = validarNotaIngresada('Ingrese la nota 3:');
    const notaFinal = calcularNotaFinal(nota1, nota2, nota3);
    const estudiante = new Estudiante(nombreEstudiante, nota1, nota2, nota3, curso, notaFinal);
    listaEstudiantes.push(estudiante);
}

function verEstudiantes(){
    console.clear();
    console.log('Estudiantes para el curso ' + curso.nombre + ':\n\n');
    listaEstudiantes.forEach(estudiante => {
        let lista = `${estudiante.nombre}\nNota 1 : ${estudiante.nota1}\nNota 2: ${estudiante.nota2}\nNota 3: ${estudiante.nota3}\n================\nNota Final: ${estudiante.notaFinal}\n================\n\n`
        console.log(lista);
    });
}

function ordenarEstudiantes() {
    const listaOrdenada = [...listaEstudiantes]; // Se utiliza el spread para evitar mutaciones en la lista orginal
    listaOrdenada.sort((estudiante1, estudiante2) => {
        return estudiante2.notaFinal - estudiante1.notaFinal;
    });
    console.clear();
    console.log('Top 3 de estudiantes para el curso ' + curso.nombre + ':\n\n');
    const topList = listaOrdenada.slice(0, 3);
    topList.forEach((estudiante, index) => {
        let lista = `${index + 1}. ${estudiante.nombre}\nNota 1 : ${estudiante.nota1}\nNota 2: ${estudiante.nota2}\nNota 3: ${estudiante.nota3}\n================\nNota Final: ${estudiante.notaFinal}\n================\n\n`;
        console.log(lista);
    });
}

function buscarEstudiantes() {
    const nombreBuscado = prompt('Indica el nombre del estudiante a buscar: ').toLowerCase();
    const lista = [...listaEstudiantes];
    const listaFiltrdada = lista.filter(estudiante => estudiante.nombre.toLowerCase().includes(nombreBuscado));
    console.clear();
    if (listaFiltrdada.length > 0) {
        console.log('Resultado de busqueda para: ' + nombreBuscado + '\n');
        listaFiltrdada.forEach(estudiante => {
            let lista = `${estudiante.nombre}\nNota 1 : ${estudiante.nota1}\nNota 2: ${estudiante.nota2}\nNota 3: ${estudiante.nota3}\n================\nNota Final: ${estudiante.notaFinal}\n================\n\n`;
            console.log(lista);
        });
    } else {
        alert('Ups, no encontramos nada...');
        console.log('Ups, no encontramos nada...');
    }
}

//Calcula y retorna la nota final con base en los porcentajes ingresados
function calcularNotaFinal(nota1, nota2, nota3) {
    const notaFinal = (nota1 * (porcentajeNota1 / 100) +  nota2 * (porcentajeNota2 / 100) + nota3 * (porcentajeNota3 / 100))
    return notaFinal.toFixed(1);
}

// Valida si la nota ingresada es un string o un number y tambien si es menor a 10.
function validarNotaIngresada(mensajeDeIngreso) {
    let nota = parseFloat(prompt(mensajeDeIngreso));
    while (isNaN(nota) || nota > 10 || nota < 0) {
        nota = parseFloat(prompt('Por favor ingresar una nota válida del 0 al 10'));
    }
    return nota;
}