import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Employee } from '../../interfaces/Employee';
import AddForm from '../form/AddForm';

export function OrganizationDirectoryComponent() {
  const [directory, setDirectory] = useState<Employee>({});
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [searchParams] = useSearchParams();
  const value = searchParams.get("value");

  useEffect(() => {
    fetch('/data/leadershipAndManagement.json')
      .then(res => res.json())
        .then((data: Employee) => {
        console.log('Fetched organization data:', data);
        setDirectory(data);
        setLoading(false);
        })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleAddRole = (department, role) => {
    setDirectory(prev => ({
      ...prev,
      [department]: [...prev[department], role]
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // get departments
  const departments = value || Object.keys(directory);

  return (
    <section id="organization-directory">
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
        onAddItem={handleAddRole}
        inputLabel="Role Name:"
      />
    </section>
  );
}

export default OrganizationDirectoryComponent;