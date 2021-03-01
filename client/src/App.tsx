import { useState } from 'react';
import './App.css';
import 'tachyons';
import List from './components/list/List';
import ListContext from './contexts/List';
import AddForm from './components/add-form/AddForm';
import AppContext from './contexts/App';
import { QueryClient, QueryClientProvider } from "react-query";

import { ListTableData } from './components/list/ListTable';

const queryClient = new QueryClient();

export default function App(): JSX.Element {

  const initialTableData: ListTableData = [];
  const nutritionState = {
    texts:
    {
      title: "Nutrition List",
      resetData: "Reset Data",
      addText: "Add New",
      deleteText: "Delete"
    },
    table: {
      headers: ['Desert (100g serving)', 'Calories', 'Fat (g)', 'Carbs (g)', 'Protein (g)'],
      data: initialTableData
    },
    addForm: {
      propertyNames: ['Desert Name', 'Calories', 'Fat', 'Carbs', 'Protein'],
      informationMessage: 'Please fill all details before you submit',
      submitText: 'Submit'
    }
  };

  const [nutritionContext, setNutritionContext] = useState(nutritionState);

  const setTableData = (newData: ListTableData) => setNutritionContext(
    {
      ...nutritionContext,
      ...{
        table: {
          headers: nutritionContext.table.headers,
          data: newData
        }
      }
    });

  const [addingItem, setAddingItem] = useState(false);
  const toggleAddingItem = () => setAddingItem(!addingItem);
  const [selectedRows, setSelectedRows] = useState([]);
  const updateSelectedRows = (newSelectedRows: string[]) => setSelectedRows(newSelectedRows as never);
  const [sortBy, setSortBy] = useState(0);
  const updateSortBy = (newIndex: number) => setSortBy(newIndex);
  const [addItemData, setAddItemData] = useState(new Array(nutritionState.addForm.propertyNames.length).fill('') as never);
  const updateAddItemData = (newSelectedRows: string[]) => setAddItemData(newSelectedRows as never);

  const initialAppContext = {
    addingItem,
    toggleAddingItem,
    selectedRows: selectedRows,
    updateSelectedRows,
    sortBy,
    updateSortBy,
    addItemData,
    updateAddItemData
  };

  const content = addingItem ? <AddForm /> : <List />;

  return (
    <AppContext.Provider value={initialAppContext}>
      <QueryClientProvider client={queryClient}>
        <div className="pa4">
          <ListContext.Provider value={{ ...nutritionContext, setTableData }}>
            {content}
          </ListContext.Provider>
        </div>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}
