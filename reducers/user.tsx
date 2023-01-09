  const initialState = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDay: 0,
    birthMonth: 0,
    birthYear: 0,
    password: ''
  }
  
  export const UserReducer = (state = initialState, action: UserAction) => {
    switch (action.type) {
      case 'loginUser':
        return {
          firstName: action.payload.firstName || state.firstName,
          lastName: action.payload.lastName || state.lastName,
          password: action.payload.password || state.password,
          email: action.payload.email || state.email,
          id: action.payload.id || state.id,
          birthDay: action.payload.birthDay || state.birthDay,
          birthMonth: action.payload.birthMonth || state.birthMonth,
          birthYear: action.payload.birthYear || state.birthYear
        }
        case 'addFirstName1': 
        return {
          id: state.id,
          firstName: action.payload.firstName,
          lastName: state.lastName,
          email: state.email,
          birthDay: state.birthDay,
          birthMonth: state.birthMonth,
          birthYear: state.birthYear,
          password: state.password
        }
      case 'addLastName1':
        return {
          id: state.id,
          firstName: state.firstName,
          lastName: action.payload.lastName,
          email: state.email,
          birthDay: state.birthDay,
          birthMonth: state.birthMonth,
          birthYear: state.birthYear,
          password: state.password
        }
      case 'addEmail1': 
        return {
          id: state.id,
          firstName: state.firstName,
          lastName: state.lastName,
          email: action.payload.email,
          birthDay: state.birthDay,
          birthMonth: state.birthMonth,
          birthYear: state.birthYear,
          password: state.password
        }
      case 'addBirthDay1': 
        return {
          id: state.id,
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          birthDay: action.payload.birthDay,
          birthMonth: state.birthMonth,
          birthYear: state.birthYear,
          password: state.password
        }
      case 'addBirthMonth1': 
        return {
          id: state.id,
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          birthDay: state.birthDay,
          birthMonth: action.payload.birthMonth,
          birthYear: state.birthYear,
          password: state.password
        }
      case 'addBirthYear1': 
        return {
          id: state.id,
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          birthDay: state.birthDay,
          birthMonth: state.birthMonth,
          birthYear: action.payload.birthYear,
          password: state.password
        }
      case 'logOut':
        return {
          id: '',
          firstName: '',
          lastName: '',
          email: '',
          birthDay: 0,
          birthMonth: 0,
          birthYear: 0,
          password: '',
        }
      default: 
        return state
    }
}