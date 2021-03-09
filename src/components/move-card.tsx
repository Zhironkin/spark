import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cardsSelector, updateCard, editCard } from '../slices/cardsSlice';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ITEM_HEIGHT = 48;
 
const MoveCard = (props: {card:any}) => {

   const dispatch = useDispatch()
   const { CARD_STATUS } = useSelector(cardsSelector)

   const card = { ...props.card }
   const card_status = props.card.status
   const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)
 
   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
     setAnchorEl(event.currentTarget)
   }

   const move = (status: number) => {
      card.status = status
      setAnchorEl(null)
      dispatch(updateCard(card))
   }

   const edit = () => {
      setAnchorEl(null)
      dispatch(editCard(card))
   }

   const CustomMenu = (props: {children: React.ReactNode}) => (
      <Menu
         id="long-menu"
         anchorEl={anchorEl}
         keepMounted
         open={open}
         onClose={() => setAnchorEl(null)}
         PaperProps={{
            style: {
               maxHeight: ITEM_HEIGHT * 4.5,
            },
         }}
         >
         {props.children}
      </Menu>
   )

   const EditCard = () => (
      <MenuItem onClick={edit}>
         Редактировать задачу
      </MenuItem>
   )

   const renderMenuItem = () => {
      switch (card_status) {
         case CARD_STATUS.TO_DO:
            return (
               <CustomMenu>
                  <MenuItem onClick={() => move(CARD_STATUS.IN_PROGRESS)}>
                     Переместить в "В процессе"
                  </MenuItem>
                  <MenuItem onClick={() => move(CARD_STATUS.DONE)}>
                     Переместить в "Завершено"
                  </MenuItem>
                  <EditCard />
               </CustomMenu>
            )
         case CARD_STATUS.IN_PROGRESS:
            return (
               <CustomMenu>
                  <MenuItem onClick={() => move(CARD_STATUS.TO_DO)}>
                     Вернуть в "К выполнению"
                  </MenuItem>
                  <MenuItem onClick={() => move(CARD_STATUS.DONE)}>
                     Переместить в "Завершено"
                  </MenuItem>
                  <EditCard />
               </CustomMenu>
            )
         case CARD_STATUS.DONE:
            return (
               <CustomMenu>
                  <MenuItem onClick={() => move(CARD_STATUS.TO_DO)}>
                     Вернуть в "К выполнению"
                  </MenuItem>
                  <MenuItem onClick={() => move(CARD_STATUS.IN_PROGRESS)}>
                     Вернуть в "В процессе"
                  </MenuItem>
                  <EditCard />
               </CustomMenu>
            )
      }
   }

   return (
      <div>
         <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            className="menu-icon"
            onClick={handleClick}
            >
            <MoreVertIcon />
         </IconButton>
         {renderMenuItem()}
      </div>
   )
 }

 export default MoveCard;