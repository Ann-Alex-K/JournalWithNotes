import './JournalList.css';
import JournalItem from '../JournalItem/JournalItem';
import CardButton from '../CardButton/CardButton';
import { useContext, useMemo } from 'react';
import { UserContext } from '../../context/user.context';

function JournalList({ dataList, setSelectedItem }) {
  const { userId } = useContext(UserContext);
  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  };
  const filtredItems = useMemo(
    () => dataList.filter(el => el.userId === userId).sort(sortItems),
    [dataList, userId]
  );

  if (dataList.length === 0) {
    return <p>Записей пока нет, добавьте первую</p>;
  }

  return (
    <>
      {filtredItems.map(el => (
        <CardButton
          key={el.id}
          onClick={() => {
            setSelectedItem(el);
            console.log(el);
          }}
        >
          <JournalItem title={el.title} date={el.date} text={el.text} />
        </CardButton>
      ))}
    </>
  );
}

export default JournalList;
