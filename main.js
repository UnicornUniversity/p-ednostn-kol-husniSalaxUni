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

  const maleNames = ["Tomas", "Jan", "Pepa", "Petr", "Martin"];
  const femaleNames = ["Katka", "Veronika", "Lenka", "Lucie", "Michaela"];
  const employees = [];
  const now = new Date();

  const workloads = [0.25, 0.5, 0.75, 1];

  for (let i = 0; i < dtoIn.count; i++) {

    const gender = Math.random() < 0.5 ? "male" : "female";
    const name =
      gender === "male"
        ? maleNames[Math.floor(Math.random() * maleNames.length)]
        : femaleNames[Math.floor(Math.random() * femaleNames.length)];

    const workload = workloads[Math.floor(Math.random() * workloads.length)];

    const randomAge = dtoIn.age.min + Math.random() * (dtoIn.age.max - dtoIn.age.min);
    const days = randomAge * 365.25;
    const birthDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    employees.push({
      id: i + 1,
      name,
      gender,
      workload,
      birthdate: birthDate.toISOString()
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
     
      if (emp.workload < 1) {
        add(names.femalePartTime, emp.name);
      }
    }
  });

  const dtoOut = { names };
  return dtoOut;
  
}

