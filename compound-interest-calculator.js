function calcularResultado(){
  
  // establecemos las variables, y tomamos los valores que se ingresan en la etiqueta input
  var capitalInicial = document.getElementById("scapitalInicial").value;
  var aniosInversion = document.getElementById("saniosInversion").value;
  var interesAnual = document.getElementById("sInteresAnual").value;
  var aportacioMensual = document.getElementById("sAportacionMensual").value;
  var capitalResultante;
  
  // utilizamos parseInt para convertir los datos strings en numeros enteros
  var capitalInicial = parseInt(capitalInicial);
  var aniosInversion = parseInt(aniosInversion);
  var interesAnual = parseInt(interesAnual);
  var aportacioMensual = parseInt(aportacioMensual);
  
  // ayuda a darle formato a los numeros que queramos presentar en pantalla
  var formato = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 2,
  });
  
  // multiplica por 12 los años de inversion, para dar como resultado la cantidad de meses totales
  aniosInversion = aniosInversion * 12;
  // divide el interes anual entre 100 y luego entre 12, para obtener un numero decimal que podamos utilizar 
  interesAnual = (interesAnual / 100) / 12;
  
  // el valor de capital inicial se guarda en la variable capital resultante
  capitalResultante = capitalInicial;
    
  // esta es la formula para calcular el capital inicial mas los intereses en el primer periodo
  capitalResultante = capitalResultante * (1 + interesAnual);

  // esta variable contiene los intereses ganados en el primer periodo  
  var interesTablaPrimerFila = capitalResultante - capitalInicial;

  // en esta linea establecemos los titulos de las columnas de la tabla
  document.getElementById("tabla").insertAdjacentHTML("beforeend","<tr><th>Mes</th><th>Capital Inicial +</th><th>Aportacion Mensual +</th><th>Interes Mensual =</th><th>Capital Resultante</th></tr>");

  // en esta linea establecemos los datos de la primera fila o primer periodo de la tabla
  document.getElementById("tabla").insertAdjacentHTML("beforeend",`<tr><td>1</td><td>${
    formato.format(capitalInicial)
  }</td><td>$0</td><td>${
    formato.format(interesTablaPrimerFila)
  }</td><td>${
    formato.format(capitalResultante)
  }</td></tr>`);
  // console.log(capitalResultante)

  // creamos un ciclo for para obtener los capitales resultantes de cada uno de los periodos
  for ( var i = 0; i < aniosInversion - 1; i++ ){
    // establecemos la variable capiInicialTabla para contener el valor del capitalResultante antes de pasar por el ciclo
    var capiInicialTabla = capitalResultante;
    // aqui sumamos la aportacion mensual al capital inicial
    capitalResultante = capitalResultante + aportacioMensual;
    // aqui calculamos los intereses y los sumamos al capital resultante
    capitalResultante = capitalResultante * (1 + interesAnual);
    // aqui obtenemos el interes neto restando al capital resultante el capital inicial mas la aportacion mensual
    var interesTabla = capitalResultante - (capiInicialTabla + aportacioMensual);
    // aqui obtenemos el capital total aportado sumando el total del capital inicial al total de aportaciones mensuales
    var capitalTotalAportado = capitalInicial + (aportacioMensual * (aniosInversion-1));
    // aqui obtenemos el interes neto total al restarle el capital aportado al capital resultante
    var interesTabla2 = capitalResultante - capitalTotalAportado;
    
    // en esta linea establecemos los datos de la segunda fila o periodo en adelante de la tabla
    document.getElementById("tabla").insertAdjacentHTML("beforeend",`<tr><td>${
      i+2
    }</td><td>${
      formato.format(capiInicialTabla)
    }</td><td>${
      formato.format(aportacioMensual)
    }</td><td>${
      formato.format(interesTabla)
    }</td><td>${
      formato.format(capitalResultante)
    }</td></tr>`);
    // document.getElementById("resultadoImpreso").insertAdjacentHTML("afterend",`<p>${formato.format(capitalResultante)}<p>`);
  }
  // aqui obtenemos el capital total y lo mostramos
  document.getElementById("resultadoImpreso").innerHTML = `<span>El capital resultante total es: ${
    formato.format(capitalResultante)
  } </span><span>El capital total aportado es: ${
    formato.format(capitalTotalAportado)
  } </span><span>El interes neto total es: ${
    formato.format(interesTabla2)
  } </span>`;
  }



  

