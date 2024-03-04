import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import { useContext, useEffect, useReducer, useRef } from 'react';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalFormState';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';
function JournalForm({ addNewListItem, selectedItem, deleteItem }) {

  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();
  const { userId } = useContext(UserContext);

  const focusError = isValid => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.text:
        textRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    if (!selectedItem) dispatchForm({ type: 'CLEAR' });
    dispatchForm({ type: 'SET_VALUES', payload: { ...selectedItem } });
  }, [selectedItem]);

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.text || !isValid.title) {
      focusError(isValid);
      setTimeout(() => {
        dispatchForm({ type: 'RESET_VALIDITY' });
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit === true) {
      addNewListItem(values);
      dispatchForm({ type: 'CLEAR' });
      dispatchForm({ type: 'SET_VALUES', payload: { userId } });
    }
  }, [isFormReadyToSubmit, values, addNewListItem, userId]);

  useEffect(() => {
    dispatchForm({
      type: 'SET_VALUES',
      payload: { userId: userId },
    });
  }, [userId]);

  const inputChange = e => {
    console.log(e.target.name);
    dispatchForm({
      type: 'SET_VALUES',
      payload: { [e.target.name]: e.target.value },
    });
    console.log(e.target.value);
  };

  const addJournalItem = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    dispatchForm({ type: 'SUBMIT' });
    console.log(formProps);
  };

  const deleteJournalItem = () => {
    deleteItem(selectedItem.id);
    dispatchForm({ type: 'CLEAR' });
    dispatchForm({ type: 'SET_VALUES', payload: { userId } });
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div className={`${styles['form-row']}`}>
        <Input
          type='text'
          name='title'
          onChange={inputChange}
          value={values.title}
          ref={titleRef}
          appearence='title'
          isValid={isValid.title}
        />
        <img
          src='/archive.svg'
          alt='Иконка удаления'
          onClick={deleteJournalItem}
        />
      </div>

      <div className={`${styles['form-row']}`}>
        <label htmlFor='date' className={styles['form-label']}>
          <img src='/calendar.svg' alt='Иконка даты' />
          <span>Дата</span>
        </label>
        <Input
          type='date'
          name='date'
          onChange={inputChange}
          value={
            values.date ? new Date(values.date).toISOString().slice(0, 10) : ''
          }
          ref={dateRef}
          isValid={isValid.date}
        />
      </div>

      <div className={`${styles['form-row']}`}>
        <label htmlFor='tag' className={styles['form-label']}>
          <img src='/folder.svg' alt='Иконка папки' />
          <span>Метки</span>
        </label>
        <Input
          type='text'
          name='tag'
          onChange={inputChange}
          value={values.tag}
        />
      </div>

      <textarea
        type='text'
        name='text'
        id=''
        cols='30'
        rows='10'
        onChange={inputChange}
        value={values.text}
        ref={textRef}
        className={cn(styles['input'], {
          [styles['invalid']]: !isValid.text,
        })}
      />

      <Button
        onClick={() => {
          console.log('Click');
        }}
      >
        Сохранить
      </Button>
    </form>
  );
}

export default JournalForm;
