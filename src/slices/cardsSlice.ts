import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store';

interface dataSet {
   name: string;
   description: string;
   priority: number | string;
   status: number;
   createDate: Date | null;
}

interface State {
   loading: boolean;
   hasErrors: boolean;
   showModal: boolean;
   cards: Array<any>;
   selectSort: string;
   selectCard: dataSet;
   readonly SORT: {[key: string]: string};
   readonly API_URL: string;
   readonly CARD_STATUS: {[key: string]: number};
}
 
export const initialState: State = {
   loading: false,
   hasErrors: false,
   showModal: false,
   cards: [],
   selectSort: '',
   selectCard: {
      name: '',
      description: '',
      priority: '',
      status: 0,
      createDate: null
   },
   SORT: {
      PRIORITY: 'priority',
      DATE: 'date'
   },
   API_URL: "http://localhost:3000/cards",
   CARD_STATUS: {
      TO_DO: 0,
      IN_PROGRESS: 1,
      DONE: 2
   }
}

const cardsSlice = createSlice({
   name: 'cards',
   initialState,
   reducers: {
      getCards: state => {
         state.loading = true
      },
      getCardsSuccess: (state, { payload }) => {
         state.cards = payload
         state.loading = false
         state.hasErrors = false
      },
      getCardsFailure: state => {
         state.loading = false
         state.hasErrors = true
      },
      setSorting: (state, { payload }) => {
         state.selectSort = payload
      },
      setModal: (state, { payload }) => {
         state.selectCard = {
            ...initialState.selectCard
         }
         state.showModal = payload
      },
      editCard: (state, { payload }) => {
         state.selectCard = { ...payload }
         state.showModal = true
      },
   },
})

export const { getCards, getCardsSuccess, getCardsFailure, setSorting, setModal, editCard } = cardsSlice.actions;

export const cardsSelector = (state: RootState) => state.cards;

export default cardsSlice.reducer;

export const fetchRecipes = (sorting?: string) => {
   return async (dispatch: any) => {
      dispatch(getCards())
      
      try {
         const response = await fetch(`${initialState.API_URL}?_sort=${sorting || initialState.SORT.priority}`)
         const data = await response.json()
      
         dispatch(getCardsSuccess(data))
      } catch (error) {
         dispatch(getCardsFailure())
      }
   }
}

export const addCard = (formData: Object) => {
   return async (dispatch: any) => {

      dispatch(getCards())
      dispatch(setModal(false))
      
      try {
         const response = await fetch(initialState.API_URL, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
               'Content-Type': 'application/json'
             }
         })
         const data = await response.json()

         if (data) {
            dispatch(fetchRecipes())
         }
      } catch (error) {
         dispatch(getCardsFailure())
      }
   }
}

export const updateCard = (formData: any) => {
   return async (dispatch: any) => {

      dispatch(getCards())
      dispatch(setModal(false))
      
      try {
         const response = await fetch(`${initialState.API_URL}/${formData.id}`, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
               'Content-Type': 'application/json'
             }
         })
         const data = await response.json()

         if (data) {
            dispatch(fetchRecipes())
         }
      } catch (error) {
         dispatch(getCardsFailure())
      }
   }
} 