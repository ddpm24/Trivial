function fInicio(){
    // fGeneraCombo("#as_curso","as_cur_id");
    // fGeneraCombo("#al_curso","al_cur_id");
    
    
    // Mostrar la modal
    document.querySelector("#div_modal").style.display = 'none';
}
function fMostrarForm(formulario) {
    // Ocultar todos los formularios
    let lista_formularios = document.querySelectorAll("#div_modal > div");
    lista_formularios.forEach(item => {
        item.style.display = 'none';
    });
    // Mostrar el que quiero
    document.querySelector(formulario).style.display = 'block';
    // Mostrar la modal
    document.querySelector("#div_modal").style.display = 'flex';
}
function fOcultarModal(){
    document.querySelector("#div_modal").style.display = 'none';
}

//----------------------------------- Categorías -------------------------------------
function fMostrarCategorias(){
    // Sacar clientes en el section
    let URL = 'assets/php/servidor.php?peticion=CargarCategorias';
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("Categorias", data);    
            let html = "<h2>";
            html+=`Categorías (`;
            html += `  <span title="Añadir categorías" onclick="fPrepararFormCategorias('a',0,'','')">`;
            html+=`<i class="fas fa-plus"> </i>`;
            html+=`</span>)`
            html+= `</h2>`
            html += "<table border=1>";
            // Cabeceras
            html += "<tr>";
            html += "   <th>Categoría</th>";
            html += "   <th>Color</th>"; 
            html += "   <th>Acciones</th>";            
            html += "</tr>";
            // ${item.cur_nombre}
            // Datos
            data.datos.forEach(item => {
                html+= "<tr>";                
                html+= `    <td>${item.cat_categoria}</td>`;                
                html+= `    <td>${item.cat_color}</td>`;          
                html+= `    <td>`;
                html+= `        <div class="botonera">`;    
                html+= `            <div onclick="fPrepararFormCategorias('e',${item.cat_id},'${item.cat_categoria}','${item.cat_color}')">`;
                html+= `                <i class="fas fa-trash" title="Borrar" ${item.cat_categoria}"></i>`;
                html+= "            </div>";                
                html+= `            <div onclick="fPrepararFormCategorias('m',${item.cat_id},'${item.cat_categoria}','${item.cat_color}')">`;
                html+= `                <i class="fas fa-edit"></i>`;                
                html+= "            </div>";             
                html+= "        </div>";
                html+= `    </td>`;
                html+= "</tr>";
            });
            html += "</table>";
            document.querySelector("section").innerHTML = html;
        })
        .finally(function () {
            
        })
}
// mostrar modal
function fPrepararFormCategorias(operacion, id, nombre,color) {
    document.querySelector("#cat_id").value=id;
    document.querySelector("#cur_error").innerHTML="";
    document.querySelector("#cat_categoria").value=nombre;
    document.querySelector("#cat_color").value=color;
    if (operacion == 'a') {
        document.querySelector("#cat_categoria").innerHTML="";
        document.querySelector("#btn_curg").style.display="block";
        document.querySelector("#btn_cure").style.display="none";
        document.querySelector("#btn_curm").style.display="none";
    }
    if (operacion == 'e') {
        document.querySelector("#cat_categoria").innerHTML="";
        document.querySelector("#btn_curg").style.display="none";
        document.querySelector("#btn_cure").style.display="block";
        document.querySelector("#btn_curm").style.display="none";
    }
    if (operacion == 'm') {
        document.querySelector("#cat_categoria").innerHTML="";
        document.querySelector("#btn_curg").style.display="none";
        document.querySelector("#btn_cure").style.display="none";
        document.querySelector("#btn_curm").style.display="block";
    }
    fMostrarForm("#div_form_categoria");
}
function fCategoriaCRUD(operacion){
    let id= document.querySelector("#cur_id").value;
    let nombre= document.querySelector("#cur_nombre").value;
    let devolucion="";
    let sql="";
    if (operacion=='a') {
        sql=`INSERT INTO cursos VALUES (null,'${nombre}')`;
        devolucion="i";
    }
    if (operacion=='e') {
        sql=`DELETE FROM cursos WHERE cur_id = ${id}`;
    }
    if (operacion=='m') {
        sql=`UPDATE cursos SET cur_nombre='${nombre}' WHERE cur_id =${id}`;
    }
    console.log(sql);
    let URL = 'assets/php/servidor.php?peticion=EjecutarCRUD';
    URL+="&sql="+ sql;
    URL+="&devolucion=" + devolucion;
    
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("CRUD cursos", data);  
           fOcultarModal();
            
        })
        .finally( ()=> {
            fGeneraCombo("#as_curso","as_cur_id");
            fGeneraCombo("#al_curso","al_cur_id");
            fMostrarCursos();
        })
}
// ------------------ Preguntas -------------------------------------------
function fMostrarPreguntas(){
    let URL = 'assets/php/servidor.php?peticion=CargarPreguntas';
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("Preguntas", data);    
            let html = "<h2>Preguntas</h2>(";
            html += `<span title="Añadir" onclick="fPrepararFormPreguntas('a',0,'','',0)">`
            html+=`<i class="fas fa-plus"></i>`
            html+= `</span>)`;
            html += "<table border=1>";
            // Cabeceras
            html += "<tr>";
            html += "   <th>Categoría</th>";
            html += "   <th>Pregunta</th>";
            html += "   <th>Respuesta 1</th>"; 
            html += "   <th>Respuesta 2</th>"; 
            html += "   <th>Respuesta 3</th>"; 
            html += "   <th>Respuesta 4</th>"; 
            html += "   <th>Respuesta válida</th>"; 
            html += "   <th>Acciones</th>";            
            html += "</tr>";
            // Datos
            data.datos.forEach(item => {
                html+= "<tr>";      
                if (item.al_id == null) item.al_id = ""; 
                if (item.al_nombre == null) item.al_nombre = "";
                if (item.al_apellidos == null) item.al_apellidos = "";                
                html+= `    <td>${item.cat_categoria}</td>`;     
                html+= `    <td>${item.pr_pregunta}</td>`;            
                html+= `    <td>${item.pr_r1}</td>`;
                html+= `    <td>${item.pr_r2}</td>`;
                html+= `    <td>${item.pr_r3}</td>`;
                html+= `    <td>${item.pr_r4}</td>`;
                html+= `    <td>${item.pr_valida}</td>`;
                html+= `    <td>`;
                html+= `        <div class="botonera">`;    
                html+= `            <div onclick="fPrepararFormPreguntas('e',${item.cat_id},'${item.cat_categoria}','${item.pr_pregunta}',${item.pr_r1},'${item.pr_r2}','${item.pr_r3}','${item.pr_r4}','${item.pr_valida}')"> `;
                html+= `                <i class="fas fa-trash" title="Borrar" '${item.al_nombre}'></i>`;
                html+= "            </div>";                
                html+= `            <div onclick="fPrepararFormPreguntas('m',${item.al_id},'${item.al_nombre}','${item.al_apellidos}',${item.al_cur_id})">`;
                html+= `                <i class="fas fa-edit"></i>`;                
                html+= "            </div>";             
                html+= "        </div>";
                html+= `    </td>`;
                html+= "</tr>";
            });
            html += "</table>";
            document.querySelector("section").innerHTML = html;
        })
        .finally(function () {
            
        })
}
// mostrar modal
  //  `cat_id`, `cat_categoria`, 'pr_pregunta', `pr_r1`, `pr_r2`, `pr_r3`, `pr_r4`, `pr_valida`  
function fPrepararFormPreguntas(operacion,id,categoria,pr_pregunta,pr_r1,pr_r2,pr_r3,pr_r4,pr_valida) {
        document.querySelector("#cat_id").value=id;
        document.querySelector("#cat_categoria").value=categoria;
        document.querySelector("#pr_pregunta").value=pr_pregunta;
        document.querySelector("#pr_r1").value=pr_r1;
        document.querySelector("#pr_r2").value=pr_r2;
        document.querySelector("#pr_r3").value=pr_r3;
        document.querySelector("#pr_r4").value=pr_r4;
        document.querySelector("#pr_r4").value=pr_r4;
        document.querySelector("#pr_valida").value=pr_valida;
        document.querySelector("#al_error").innerHTML="";
        //esto es para que te muestre el curso en el que esta puesto
        document.querySelector("#al_cur_id").value=curid;
    if (operacion=='a') {
        document.querySelector("#al_nombre").innerHTML="";
        document.querySelector("#al_apellidos").innerHTML="";
        document.querySelector("#boton_grabar_alumnos").style.display="block";
        document.querySelector("#boton_eliminar_alumnos").style.display="none";
        document.querySelector("#boton_modificar_alumnos").style.display="none";
    }
    if (operacion=='e') {
        document.querySelector("#al_nombre").innerHTML="";
        document.querySelector("#al_apellidos").innerHTML="";
        document.querySelector("#boton_grabar_alumnos").style.display="none";
        document.querySelector("#boton_eliminar_alumnos").style.display="block";
        document.querySelector("#boton_modificar_alumnos").style.display="none";
    }
    if (operacion=='m') {
        document.querySelector("#al_nombre").innerHTML="";
        document.querySelector("#al_apellidos").innerHTML="";
        document.querySelector("#boton_grabar_alumnos").style.display="none";
        document.querySelector("#boton_eliminar_alumnos").style.display="none";
        document.querySelector("#boton_modificar_alumnos").style.display="block";
    }
    fMostrarForm("#div_form_alumnos");
    console.log("ver",id,apellido);
}
function fAlumnoCRUD(operacion){
    let id= document.querySelector("#al_id").value;
    let nombre= document.querySelector("#al_nombre").value;
    let apellidos= document.querySelector("#al_apellidos").value;
    let alcurid= document.querySelector("#al_cur_id").value;
    let devolucion="";
    let sql="";
    if (operacion=='a') {
        sql=`INSERT INTO alumnos VALUES (null,'${nombre}','${apellidos}',${alcurid})`;
        devolucion="i";
    }
    if (operacion=='e') {
        sql=`DELETE FROM alumnos WHERE al_id = ${id}`;
    }
    if (operacion=='m') {
        sql=`UPDATE alumnos SET al_nombre='${nombre}',al_apellidos='${apellidos}',al_cur_id=${alcurid} WHERE al_id =${id}`;
    }
    console.log(sql);
    let URL = 'assets/php/servidor.php?peticion=EjecutarCRUDAlumnos';
    URL+="&sql="+ sql;
    URL+="&devolucion=" + devolucion;
    
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("CRUD alumnos", data);  
           fOcultarModal();
            
        })
        .finally( ()=> {
            fMostrarAlumnos();
        })
}
// -----------------asignaturas--------------------------------------
function fMostrarAsignaturas(){
    let URL = 'assets/php/servidor.php?peticion=CargarAsignaturas';
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("Asignaturas", data);    
            // `as_id`, `as_nombre`, `as_cur_id`
            let html = "<h2>";
            html+=`Asignaturas(`
            // el espan es como el div pero de linea , el div hace salto de linea y el span no 
            html += `<span title="Añadir Asignatura" onclick="fPrepararFormAsignaturas('a',0,'',0)">`;
            html+=`<i class="fas fa-plus" ></i>`;
            html+=`</span>)`;
            html+="</h2>";
            html += "<table border=1>";
            // Cabeceras
            html += "<tr>";
            html += "   <th>CURSO</th>";
            html += "   <th>ID</th>";
            html += "   <th>Nombre</th>"; 
            html += "   <th>Acciones</th>";            
            html += "</tr>";
            // Datos
            data.datos.forEach(item => {
                // let  n=item.cur_nombre
                html+= "<tr>";    
                if (item.as_id == null) {
                    item.as_id = '';
                }
                if (item.as_nombre == null) {
                    item.as_nombre = '';
                }               
                html+= `    <td>${item.cur_nombre}</td>`; 
                html+= `    <td>${item.as_id}</td>`;           
                html+= `    <td>${item.as_nombre}</td>`;
                html+= `    <td>`;
                html+= `        <div class="botonera">`;    
                html+= `            <div onclick="fPrepararFormAsignaturas('e',${item.as_id},'${item.as_nombre}',${item.as_cur_id})">`;
                html+= `                <i class="fas fa-trash" title="Borrar" ></i>`;
                html+= "            </div>";                
                html+= `            <div onclick="fPrepararFormAsignaturas('m',${item.as_id},'${item.as_nombre}',${item.as_cur_id})">`;
                html+= `                <i class="fas fa-edit"></i>`;                
                html+= "            </div>";             
                html+= "        </div>";
                html+= `    </td>`;
                html+= "</tr>";
            });
            html += "</table>";
            document.querySelector("section").innerHTML = html;
        })
        .finally(function () {
            
        })
}
function fPrepararFormAsignaturas(operacion,id ,nombre,curid){
    document.querySelector("#as_id").value=id;
    document.querySelector("#as_nombre").value=nombre;
    document.querySelector("#as_error").innerHTML="";
    // dejar el curso correcto
    
    document.querySelector("#as_cur_id").value=curid;
    if (operacion=='a') {
       document.querySelector("#boton_grabar_asignatura").style.display="block"; 
       document.querySelector("#boton_borrar_asignatura").style.display="none";
       document.querySelector("#boton_modificar_asignatura").style.display="none";
       document.querySelector("#as_error").innerHTML="";
    }
    if (operacion=='e') {
        document.querySelector("#boton_grabar_asignatura").style.display="none"; 
        document.querySelector("#boton_borrar_asignatura").style.display="block";
        document.querySelector("#boton_modificar_asignatura").style.display="none";
        document.querySelector("#as_error").innerHTML="";
    }
    if (operacion=='m') {
        document.querySelector("#boton_grabar_asignatura").style.display="none"; 
        document.querySelector("#boton_borrar_asignatura").style.display="none";
        document.querySelector("#boton_modificar_asignatura").style.display="block";
        document.querySelector("#as_error").innerHTML="";
    }
    fMostrarForm("#div_form_asignaturas");
}

function fAsignaturasCRUD(operacion){
    let id=document.querySelector("#as_id").value;
    let nombre=document.querySelector("#as_nombre").value;
    let ascurid=document.querySelector("#as_cur_id").value;
    let sql='';
    let devolucion='';
    if (operacion=='a') {
        sql= `INSERT INTO asignaturas VALUES(null,'${nombre}',${ascurid})`;
        devolucion='i';  
    }
    if (operacion=='e') {
        sql=`DELETE FROM  asignaturas where as_id=${id}`;
    }
    if (operacion=='m') {
        sql=`UPDATE asignaturas SET as_nombre,
                                    as_cur_id=${ascurid} 
                                    where as_id=${id}`;
    }
    
    console.log(sql);
    let URL = 'assets/php/servidor.php?peticion=EjecutarCRUD';
    URL+="&sql="+ sql;
    URL+="&devolucion=" + devolucion;
    
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("CRUD cursos", data);  
           
            
        })
        .finally( ()=> {
            fOcultarModal();
            fMostrarAsignaturas();
        })
}

// function fCombo(){
//     let valor = document.querySelector("#lista_cursos").value;
//     let posicion = document.querySelector("#lista_cursos").selectedIndex;
//     console.log (valor, posicion);
// }

function fGeneraCombo(donde, con_que_nombre){
    // Generar combo de cursos DONDE tú digas
    let URL = 'assets/php/servidor.php?peticion=CargarCursos';
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("Cursos", data); 
            let html = `<select name='sel_cursos' id='${con_que_nombre}'>`;
            for (i=0; i<data.datos.length; i++) {
                let id=data.datos[i].cur_id;
                    html += `<option value="${data.datos[i].cur_id}">${data.datos[i].cur_nombre}</option>`;
            };
            html+="</select>";
            document.querySelector(donde).innerHTML = html;
        })
        .finally(function () {
        })
}

// Pasos
/*
Crear formulario dentro de la modal
Para mostrar un formulario, dime el nombre
    Ocultar todos
    Mostrar el que medigas
    Mostrar Modal
Para cada tabla de la BD, crear funciones de mostrar que permita CRUD

    CUANDO PULSEN +
        Preparar el formulario para alta
        Muestro el formulario

   CUANDO PULSEN MODIFICAR
        Preparar el formulario para modficar
        Muestro el formulario

    CUANDO PULSEN ELIMINAR
        Preparar el formulario para eliminar
         Muestro el formulario


Los botones llama a una funcion CRUD que genera los SQL necesarios y los ejecuta
Cuando acabe, Oculto modal y refresco pantalla

*/