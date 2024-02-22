import FormFilter from './components/FormFilter';
import Pagination from './components/Pagination';
import TablePerson from './components/TablePerson';

import './App.css';

const App = () => (
  <div className="p-4 w-full">
    <h1 className="text-xl font-bold">Example with Search and Filter</h1>

    <FormFilter />

    <TablePerson />

    <Pagination />

  </div>
);

export default App;
