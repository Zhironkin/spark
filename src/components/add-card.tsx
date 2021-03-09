import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cardsSelector, setModal, addCard, updateCard } from '../slices/cardsSlice';
import { MenuItem, FormControl, InputLabel, Tooltip,
   Select, Fab, Button, Modal, Fade, Backdrop, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const AddCard = () => {
   const dispatch = useDispatch()
   const { showModal, selectCard } = useSelector(cardsSelector)

   interface dataSet {
      id?: number;
      name: string;
      description: string;
      priority: number | string;
      status: number;
      createDate: Date | null;
   }

   const [ error, setError ] = useState<string | null>(null)
   const [ data, setData ] = useState<dataSet>({
      name: '',
      description: '',
      priority: '',
      status: 0,
      createDate: null
   })
   
   useEffect(() => {
      setData({...selectCard})
   }, [selectCard])

   const handleChange = (event: React.ChangeEvent<any>) => {
      let name:string = event.target.name
      let value:any = event.target.value

      setData((prevState) => ({
         ...prevState,
         [name]: value,
         createDate: new Date()
      }))
   }

   const handleClick = () => {
      setError('')

      if (!data.name || !data.description || (!data.priority && data.priority !== 0)) {
         setError('Необходимо заполнить все поля.')
         return null
      }

      data.name = data.name.trim().replace(/<\/?[^>]+(>|$)/g, "")
      data.description = data.description.trim().replace(/<\/?[^>]+(>|$)/g, "")

      if ( data.id ) {
         dispatch(updateCard(data))
      } else {
         dispatch(addCard(data))
      }
   }

   const closeModal = () => {
      dispatch(setModal(false))
      setError(null)
   }

   return (
      <div>
         <Tooltip title="Добавить задачу" aria-label="add" placement="right">
            <Fab color="primary" aria-label="add" onClick={() => dispatch(setModal(true))}>
               <AddIcon />
            </Fab>
         </Tooltip>
         <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="modal"
            open={showModal}
            onClose={closeModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
            >
            <Fade in={showModal}>
               <div className="modal-content">
                  <h2>Добавить задачу</h2>
                  <div>
                     <TextField label="Название задачи" name="name" value={data.name} onChange={handleChange} variant="outlined" autoComplete="off" />
                  </div>
                  <div>
                     <TextField multiline rows={4} name="description" value={data.description} onChange={handleChange} label="Описание задачи" variant="outlined" />
                  </div>
                  <div>
                     <FormControl variant="outlined" className="select-box">
                        <InputLabel id="select-status">Приоретет</InputLabel>
                        <Select
                           labelId="select-status"
                           id="select-status"
                           name="priority"
                           value={data.priority}
                           onChange={handleChange}
                           label="Приоретет"
                           >
                           <MenuItem value={2}>Высокий</MenuItem>
                           <MenuItem value={1}>Средний</MenuItem>
                           <MenuItem value={0}>Низкий</MenuItem>
                        </Select>
                     </FormControl>
                  </div>
                  {error && <div className="modal-error">{error}</div>}
                  <div className="modal-buttons">
                     <Button variant="outlined" onClick={closeModal}> Назад</Button>
                     <Button variant="outlined" color="primary" onClick={handleClick}>Добавить</Button>
                  </div>
               </div>
            </Fade>
         </Modal>
      </div>
   )
}

export default AddCard;