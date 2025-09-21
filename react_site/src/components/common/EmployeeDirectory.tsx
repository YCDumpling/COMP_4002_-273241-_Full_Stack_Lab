import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Employee } from '../../interfaces/Employee';
import AddForm from '../form/AddForm';

export function EmployeeDirectoryComponent() {
  const [directory, setDirectory] = useState<EmployeeDirectory>({});
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [searchParams] = useSearchParams();
  const value = searchParams.get("value");

  useEffect(() => {
    fetch('/data/employees.json')
      .then(res => res.json())
        .then((data: Employee) => {
        console.log('Fetched employee data:', data);
        setDirectory(data);
        setLoading(false);
        })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleAddEmployee = (department, name) => {
    setDirectory(prev => ({
      ...prev,
      [department]: [...prev[department], name]
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  const departments = value || Object.keys(directory);

  return (
    <section id="employee-directory">
      {Object.entries(directory).map(([department, employees]) => (
        <div key={department}>
          <h4
            onClick={() => setExpanded(prev => ({ ...prev, [department]: !prev[department] }))}
          >{department}</h4>
          {expanded[department] && (
            <ul>
              {employees.map(name => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
      
      <AddForm 
        departments={departments} 
        onAddItem={handleAddEmployee}
        inputLabel="Employee Name:"
      />
    </section>
  );
}

export default EmployeeDirectoryComponent;