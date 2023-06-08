function calcularResultado(){
  
  // we set the variables, and we take the values that are entered in the input tag
  var initialCapital = document.getElementById("scapitalInicial").value;
  var yearsInvest = document.getElementById("saniosInversion").value;
  var annualInterest = document.getElementById("sInteresAnual").value;
  var monthlyContribution = document.getElementById("sAportacionMensual").value;
  var resultingCapital;
  
  // we use parseInt to convert string data into integers
  var initialCapital = parseInt(initialCapital);
  var yearsInvest = parseInt(yearsInvest);
  var annualInterest = parseInt(annualInterest);
  var monthlyContribution = parseInt(monthlyContribution);
  
  // helps to format the numbers that we want to display on the screen
  var formato = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 2,
  });
  
  // multiply the years of investment by 12 to get the total number of months
  yearsInvest = yearsInvest * 12;
  // divide the annual interest by 100 and then by 12, to get a decimal number that we can use 
  annualInterest = (annualInterest / 100) / 12;
  
  // the initial capital value is stored in the resulting capital variable
  resultingCapital = initialCapital;
    
  // this is the formula for calculating the initial capital plus the interest in the first period
  resultingCapital = resultingCapital * (1 + annualInterest);

  // this variable contains the interest earned in the first period  
  var tableFirstRowInterest = resultingCapital - initialCapital;

  // in this line, we set the titles of the table columns
  document.getElementById("tabla").insertAdjacentHTML("beforeend","<tr><th>Month</th><th>Initial Capital +</th><th>Monthly Contribution +</th><th>Monthly Interest =</th><th>Resulting Capital</th></tr>");

  // in this line, we set the data for the first row or first period of the table
  document.getElementById("tabla").insertAdjacentHTML("beforeend",`<tr><td>1</td><td>${
    formato.format(initialCapital)
  }</td><td>$0</td><td>${
    formato.format(tableFirstRowInterest)
  }</td><td>${
    formato.format(resultingCapital)
  }</td></tr>`);
  // console.log(resultingCapital);

  // we create a for loop to get the resulting capitals for each period
  for ( var i = 0; i < yearsInvest - 1; i++ ){
    // we set the tableInitialCapital variable to contain the value of the resultingCapital variable before we go through the loop
    var tableInitialCapital = resultingCapital;
    // here we add the monthly contribution to the initial capital
    resultingCapital = resultingCapital + monthlyContribution;
    // here we calculate the interest and add it to the resulting capital
    resultingCapital = resultingCapital * (1 + annualInterest);
    // here we get the net interest by subtracting the initial capital plus the monthly contribution from the resulting capital
    var tableInterest = resultingCapital - (tableInitialCapital + monthlyContribution);
    // here we get the total contributed capital, adding the total initial capital to the total monthly contributions
    var totalContributedCapital = initialCapital + (monthlyContribution * (yearsInvest-1));
    // here we get the total net interest by subtracting the contributed capital from the resulting capital
    var tableInterest2 = resultingCapital - totalContributedCapital;
    
    // in this line, we set the data from the second row or period onwards in the table
    document.getElementById("tabla").insertAdjacentHTML("beforeend",`<tr><td>${
      i+2
    }</td><td>${
      formato.format(tableInitialCapital)
    }</td><td>${
      formato.format(monthlyContribution)
    }</td><td>${
      formato.format(tableInterest)
    }</td><td>${
      formato.format(resultingCapital)
    }</td></tr>`);
    // document.getElementById("resultadoImpreso").insertAdjacentHTML("afterend",`<p>${formato.format(capitalResultante)}<p>`);
  }
  // here we get the total resulting capital, the total contributed capital and the total net interest and display them
  document.getElementById("resultadoImpreso").innerHTML = `<span>The Total Resulting Capital is: ${
    formato.format(resultingCapital)
  } </span><span>The Total Contributed Capital is: ${
    formato.format(totalContributedCapital)
  } </span><span>The Total Net Interest is: ${
    formato.format(tableInterest2)
  } </span>`;
  }