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

  const pattern = [
    { name: "Jan", surname: "Svoboda", gender: "male", count: 20, workload: 0.5 },
    { name: "Pepa", surname: "Dvořák", gender: "male", count: 10, workload: 0.5 },
    { name: "Aneta", surname: "Svobodová", gender: "female", count: 9, workload: 0.5 },
    { name: "Jana", surname: "Nováková", gender: "female", count: 6, workload: 0.5 },
    { name: "Katka", surname: "Nováková", gender: "female", count: 5, workload: 0.5 }
  ];

  let id = 1;
  for (const entry of pattern) {
    for (let i = 0; i < entry.count && employees.length < dtoIn.count; i++) {
      const randomAge = dtoIn.age.min + ((id - 1) % (dtoIn.age.max - dtoIn.age.min + 1));
      const days = randomAge * 365.25;
      const birthDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
      employees.push({
        id: id++,
        name: entry.name,
        surname: entry.surname,
        gender: entry.gender,
        workload: entry.workload,
        birthdate: birthDate.toISOString()
      });
    }
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
     
      if (emp.workload < 1) {
        add(names.femalePartTime, emp.name);
      }
    }
  });

  const dtoOut = { names };
  return dtoOut;
  
}

