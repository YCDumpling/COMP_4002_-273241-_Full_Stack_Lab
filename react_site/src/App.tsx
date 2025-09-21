
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header/Header';
import Body from './components/common/Body/Body';
import Footer from './components/common/Footer/Footer';
import { EmployeeDirectoryComponent } from './components/common/EmployeeDirectory';
import { OrganizationDirectoryComponent } from './components/common/OrganizationDirectory';

function App() {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Body />} />
                    <Route path="/employees" element={<EmployeeDirectoryComponent />} />
                    <Route path="/organization" element={<OrganizationDirectoryComponent />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;