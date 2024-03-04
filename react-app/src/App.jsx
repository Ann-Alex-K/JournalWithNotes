import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './Hooks/use-localstorage.hook';
import { UserContexProvidev } from './context/user.context';
import { useState } from 'react';


function mapItems(items) {
  if (!items) return [];
  return items.map(el => ({
    ...el,
    date: new Date(el.date),
  }));
}

function App() {
  const [dataList, setDataList] = useLocalStorage('data');
  const [selectedItem, setSelectedItem] = useState(null);

  const addNewListItem = el => {
    if (!el.id) {
      setDataList([
        ...mapItems(dataList),
        {
          ...el,
          date: new Date(el.date),
          id:
            dataList.length > 0 ? Math.max(...dataList.map(i => i.id)) + 1 : 1,
        },
      ]);
    } else {
      setDataList([
        ...mapItems(dataList).map(item =>
          item.id === el.id ? { ...el } : item
        ),
      ]);
    }
  };

  const deleteItem = id => {
    setDataList([...dataList.filter(el => el?.id !== id)]);
  };

  return (
    <UserContexProvidev>
      <div className='app'>
        <LeftPanel>
          <Header />
          <JournalAddButton clearForm={() => setSelectedItem(null)} />
          <JournalList
            dataList={mapItems(dataList)}
            setSelectedItem={setSelectedItem}
          />
        </LeftPanel>

        <Body>
          <JournalForm
            addNewListItem={addNewListItem}
            selectedItem={selectedItem}
            deleteItem={deleteItem}
          />
        </Body>
      </div>
    </UserContexProvidev>
  );
}

export default App;
