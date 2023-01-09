const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    birthDay: 0,
    birthMonth: 0,
    birthYear: 0,
    password: ''
  }
  
  export const SignUpReducer = (state = initialState, action: SignUpAction) => {
    switch (action.type) {
      case 'addFirstName': 
        return {
          firstName: action.payload.firstName,
          lastName: state.lastName,
          email: state.email,
          birthDay: state.birthDay,
          birthMonth: state.birthMonth,
          birthYear: state.birthYear,
          password: state.password
        }
      case 'addLastName':
        return {
          firstName: state.firstName,
          lastName: action.payload.lastName,
          email: state.email,
          birthDay: state.birthDay,
          birthMonth: state.birthMonth,
          birthYear: state.birthYear,
          password: state.password
        }
      case 'addEmail': 
        return {
          firstName: state.firstName,
          lastName: state.lastName,
          email: action.payload.email,
          birthDay: state.birthDay,
          birthMonth: state.birthMonth,
          birthYear: state.birthYear,
          password: state.password
        }
      case 'addBirthDay': 
        return {
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          birthDay: action.payload.birthDay,
          birthMonth: state.birthMonth,
          birthYear: state.birthYear,
          password: state.password
        }
      case 'addBirthMonth': 
        return {
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          birthDay: state.birthDay,
          birthMonth: action.payload.birthMonth,
          birthYear: state.birthYear,
          password: state.password
        }
      case 'addBirthYear': 
        return {
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          birthDay: state.birthDay,
          birthMonth: state.birthMonth,
          birthYear: action.payload.birthYear,
          password: state.password
        }
      case 'addPassword': 
        return {
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          birthDay: state.birthDay,
          birthMonth: state.birthMonth,
          birthYear: state.birthYear,
          password: action.payload.password
        }
      case 'erase2':
        return {
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