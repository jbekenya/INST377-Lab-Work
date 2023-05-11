const jobs = [
    { jobTitle: "Software Engineer", company: "Google", location: "San Francisco, CA", jobDescription: "Google is seeking a highly motivated Software Engineer to join our team in San Francisco. In this role, you will be responsible for designing, developing and maintaining software applications that power Google's products and services." },
    { jobTitle: "Business Analyst", company: "Salesforce", location: "San Francisco, CA", jobDescription: "Salesforce is looking for a Business Analyst to join our team in San Francisco. The ideal candidate will have experience analyzing complex data sets, developing business insights and making data-driven recommendations." },
    { jobTitle: "Marketing Manager", company: "Uber", location: "San Francisco, CA", jobDescription: "Uber is seeking a Marketing Manager to join our team in San Francisco. This role will be responsible for creating and executing marketing strategies to drive growth and increase brand awareness." },
    { jobTitle: "Human Resources Manager", company: "Marriott International", location: "Washington DC", jobDescription: "Marriott International is looking for a Human Resources Manager to join our team in Washington DC. The ideal candidate will have experience leading HR initiatives, managing employee relations and developing talent strategies." },
    { jobTitle: "Financial Analyst", company: "Capital One", location: "McLean, VA", jobDescription: "Capital One is seeking a Financial Analyst to join our team in McLean, VA. This role will be responsible for analyzing financial data, developing financial models and making recommendations to improve business performance." },
    { jobTitle: "Project Manager", company: "Deloitte", location: "Arlington, VA", jobDescription: "Deloitte is looking for a Project Manager to join our team in Arlington, VA. The ideal candidate will have experience managing large-scale projects, leading cross-functional teams and delivering successful outcomes." }
  ];
  
  const jobsTable = document.getElementById("jobs");
  
  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const row = jobsTable.insertRow(-1);
    const titleCell = row.insertCell(0);
    const companyCell = row.insertCell(1);
    // Define the job openings dataset
const jobOpenings = [
    {
      company: "Google",
      position: "Software Engineer",
      location: "San Francisco Bay Area",
      salary: "$150,000 - $200,000"
    },
    {
      company: "Amazon",
      position: "Product Manager",
      location: "Washington DC Metropolitan Area",
      salary: "$120,000 - $180,000"
    },
    {
      company: "Apple",
      position: "UI/UX Designer",
      location: "San Francisco Bay Area",
      salary: "$120,000 - $160,000"
    },
    {
      company: "Microsoft",
      position: "Data Scientist",
      location: "Washington DC Metropolitan Area",
      salary: "$130,000 - $170,000"
    },
    {
      company: "Facebook",
      position: "Marketing Manager",
      location: "San Francisco Bay Area",
      salary: "$140,000 - $180,000"
    },
    {
      company: "Netflix",
      position: "Software Developer",
      location: "Washington DC Metropolitan Area",
      salary: "$150,000 - $190,000"
    }
  ];
  
  // Get the table body element
  const tableBody = document.getElementById("table-body");
  
  // Loop through the job openings dataset and create table rows for each record
  jobOpenings.forEach((job) => {
    // Create a table row
    const row = document.createElement("tr");
  
    // Create table cells for each field in the job opening record
    const companyCell = document.createElement("td");
    companyCell.innerText = job.company;
    row.appendChild(companyCell);
  
    const positionCell = document.createElement("td");
    positionCell.innerText = job.position;
    row.appendChild(positionCell);
  
    const locationCell = document.createElement("td");
    locationCell.innerText = job.location;
    row.appendChild(locationCell);
  
    const salaryCell = document.createElement("td");
    salaryCell.innerText = job.salary;
    row.appendChild(salaryCell);
  
    // Add the row to the table body
    tableBody.appendChild(row);
  });
  
}