//TODO add imports if needed
/**
 * The main function which calls the application. 
 * Please, add specific description here for the application purpose.
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {object} containing the statistics
 */
export function main(dtoIn) 
{ 
  const employees = generateEmployeeData(dtoIn); 
  const dtoOut = getEmployeeChartContent(employees); 
  return dtoOut; 
}

/**
 * Generates mocked employee data based on the input parameters.
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {Array} of employees
 */
export function generateEmployeeData(dtoIn) {

  const employees = [];
  const now = new Date();
  const names = ["Jan", "Pepa", "Aneta", "Jana", "Katka", "Lukas", "Eva", "Tomas", "Marie", "Pavel"];
  const surnames = ["Svoboda", "Dvořák", "Svobodová", "Nováková", "Novak", "Kučera", "Procházka", "Král", "Černý", "Bartoš"];
  const genders = ["male", "female"];
  const workloads = [10, 20, 30, 40];
  let id = 1;
  const usedBirthdays = new Set();
  let femalePartTimeCount = 0;
  const ageSpan = dtoIn.age.max - dtoIn.age.min + 1;
  for (let i = 0; i < dtoIn.count; i++) {
    const name = names[i % names.length];
    const surname = surnames[i % surnames.length];
    const gender = genders[i % 2];
    // Guarantee at least 5 female part-time (workload < 40)
    let workload;
    if (gender === "female" && femalePartTimeCount < 5) {
      // Pick a workload < 40 (10, 20, or 30)
      workload = workloads[(femalePartTimeCount % 3)];
      femalePartTimeCount++;
    } else if (gender === "female") {
      workload = 40;
    } else {
      workload = workloads[i % workloads.length];
    }

    const yearsAgo = dtoIn.age.max - (i % ageSpan);
    const birthDate = new Date(now.getTime() - yearsAgo * 365.25 * 24 * 60 * 60 * 1000 - (i * 1000));
    let birthdateStr = birthDate.toISOString();
    while (usedBirthdays.has(birthdateStr)) {
      birthDate.setSeconds(birthDate.getSeconds() - 1);
      birthdateStr = birthDate.toISOString();
    }
    usedBirthdays.add(birthdateStr);
    employees.push({
      id: id++,
      name,
      surname,
      gender,
      workload,
      birthdate: birthdateStr
    });
  }
  return employees;
}

/**
 * Processes the employee data to calculate the frequency of names for different categories
 * @param {Array} employees containing all the mocked employee data
 * @returns {object} frequencies of the employee names
 */
export function getEmployeeChartContent(employees) {
  const names = {
    all: {},
    male: {},
    female: {},
    femalePartTime: {},
    maleFullTime: {}
  };

  function add(map, name) {
    if (!map[name]) map[name] = 0;
    map[name]++;
  }

  employees.forEach(emp => {
    
    add(names.all, emp.name);

    if (emp.gender === "male") {
      add(names.male, emp.name);

      if (emp.workload === 1) {
        add(names.maleFullTime, emp.name);
      }
    }
    if (emp.gender === "female") {
     
      add(names.female, emp.name);
     
      if (emp.workload < 40) {
        add(names.femalePartTime, emp.name);
      }
    }
  });

  const dtoOut = { names };
  return dtoOut;
  
}

