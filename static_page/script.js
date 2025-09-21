document.addEventListener("DOMContentLoaded", () => {
    // set the current year in the footer
    document.getElementById("FooterYear").textContent = new Date().getFullYear();

    // populate employee directory via employee.json file
    fetch('data/employees.json')
        .then(response => response.json())
        .then(data => {
            const section = document.getElementById('employee-directory');
            for (const [department, employees] of Object.entries(data)) {
                const deptHeader = document.createElement('h4');
                deptHeader.textContent = department;
                section.appendChild(deptHeader);

                const ul = document.createElement('ul');
                employees.forEach(name => {
                    const li = document.createElement('li');
                    li.textContent = name;
                    ul.appendChild(li);
                });
                section.appendChild(ul);
            }
        })
        .catch(err => {
            console.error(err);
        });
});