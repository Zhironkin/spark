import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { Grid, Card, CardContent } from '@material-ui/core';
import Movecard from './move-card';

const Cards = (props: {list: Array<any>}) => {
   const { list } = props

   const [ selectCard, setSelectCard ] = useState<number>(0)
   
   const renderTasks = () => {
      if ( !list.length ) return null
      
      let ToDo:Array<any> = []
      let InProgress:Array<any> = []
      let Done:Array<any> = []

      list.forEach(item => {
         switch (item.status) {
            case 0:
               ToDo.push(item)
               break;
            case 1:
               InProgress.push(item)
               break;
            case 2:
               Done.push(item)
               break;
         }
      })

      return (
         <Grid container justify="center" spacing={3}>
            <Grid item xs={4} sm={4}>
               <Card>
                  <CardContent>
                     <div className="card-title">К выполнению</div>
                     {renderTask(ToDo)}
                  </CardContent>
               </Card>
            </Grid>
            <Grid item xs={4} sm={4}>
               <Card>
                  <CardContent>
                     <div className="card-title">В процессе</div>
                     {renderTask(InProgress)}
                  </CardContent>
               </Card>
            </Grid>
            <Grid item xs={4} sm={4}>
               <Card>
                  <CardContent>
                     <div className="card-title">Завершено</div>
                     {renderTask(Done)}
                  </CardContent>
               </Card>
            </Grid>
         </Grid>
      )
   }

   const renderTask = (items:Array<any>) => items.map(item => {
      let date = new Date(item.createDate)

      return (
         <div key={item.id.toString()} className="card-list" onClick={() => setSelectCard(item.id)}>
            <div className="card-list-title">
               <span className={`card-list-priority priority-${item.priority}`}></span>
               <p>{item.name}</p>
               <Movecard card={item} />
            </div>
            <AnimateHeight className="card-list-body" duration={ 500 } height={ selectCard === item.id ? 'auto' : 0 }>
               <div className="card-list-description">
                  <span>Описание:</span>
                  <br/>
                  {item.description}
               </div>
               <div className="card-list-date">
                  <span>Дата добавления: </span>
                  {date.getDate()}.{date.getMonth()}.{date.getFullYear()}
                  {' - '}
                  {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
               </div>
            </AnimateHeight>
         </div>
      )
   })

   return (
      <div className="app-cards">
         {renderTasks()}
      </div>
   )
}

export default Cards;