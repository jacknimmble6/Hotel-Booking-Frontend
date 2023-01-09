const initialState = {
  checkIn: '',
  checkOut: '',
  guests: 0,
  priceMin: 0,
  priceMax: 0,
}

export const PageSearchReducer = (state = initialState, action: PageSearchAction) => {
  switch (action.type) {
    case 'addCheckIn1': 
      return {
        checkIn: action.payload.search.checkIn,
        checkOut: state.checkOut,
        guests: state.guests,
        priceMin: state.priceMin,
        priceMax: state.priceMax,
      }
    case 'addCheckOut1':
      return {
        checkIn: state.checkIn,
        checkOut: action.payload.search.checkOut,
        guests: state.guests,
        priceMin: state.priceMin,
        priceMax: state.priceMax,
      }
    case 'addGuests1': 
      return {
        checkIn: state.checkIn,
        checkOut: state.checkOut,
        guests: state.guests + 1,
        priceMin: state.priceMin,
        priceMax: state.priceMax,
      }
    case 'decreaseGuests1': 
      return {
        checkIn: state.checkIn,
        checkOut: state.checkOut,
        guests: state.guests - 1,
        priceMin: state.priceMin,
        priceMax: state.priceMax,
      }
    case 'addPriceMin1': 
      return {
        checkIn: state.checkIn,
        checkOut: state.checkOut,
        guests: state.guests,
        priceMin: action.payload.search.priceMin,
        priceMax: state.priceMax,
      }
    case 'addPriceMax1': 
      return {
        checkIn: state.checkIn,
        checkOut: state.checkOut,
        guests: state.guests,
        priceMin: state.priceMin,
        priceMax: action.payload.search.priceMax,
      }
    case 'erase1':
      return {
        checkIn: '',
        checkOut: '',
        guests: 0,
        priceMin: 0,
        priceMax: 1000,
      }
    default: 
      return state
  }
}