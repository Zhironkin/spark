import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cardsSelector, fetchRecipes, setSorting} from './slices/cardsSlice';
import { Container, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';

import Loader from './components/loader';
import Cards from './components/cards';
import ShowDialog from './components/add-card';

const App = () => {
   const dispatch = useDispatch()
   const { cards, loading, hasErrors, SORT, selectSort } = useSelector(cardsSelector)

   useEffect(() => {
      dispatch(fetchRecipes(selectSort))
   }, [dispatch, selectSort])


   const renderCards = () => {
      if ( loading ) return <Loader />
      if ( hasErrors ) return <IfError />

      return <Cards list={cards} />
   }

   const IfError = () => (
      <div className="if-loading-error">
         Start command: <span>json-server --watch db.json</span> in json-api folder
         <br/>
         Try change API_URL in <span>./slices/cardsSlice</span>
      </div>
   )

   return (
      <div className="App">
         <Container>
            { !hasErrors &&
               <div className="app-header">
                  <FormControl variant="outlined" className="select-box">
                     <InputLabel id="select-outlined">Сортировать</InputLabel>
                     <Select
                        labelId="select-outlined"
                        id="select-outlined"
                        value={selectSort}
                        onChange={event => dispatch(setSorting(event.target.value))}
                        label="Сортировать"
                        >
                        <MenuItem value={SORT.PRIORITY}>По приоретету</MenuItem>
                        <MenuItem value={SORT.DATE}>По дате</MenuItem>
                     </Select>
                  </FormControl>
                  <ShowDialog />
               </div>
            }
            {renderCards()}
         </Container>
         <div className="author">Zhironkin N.</div>
      </div>
   )
}

export default App;
