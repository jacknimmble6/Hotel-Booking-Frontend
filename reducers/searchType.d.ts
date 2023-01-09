interface ISearch {
    city: string
    checkIn: string
    checkOut: string
    guests: number
    priceMin: number
    priceMax: number
    bedrooms: number
    beds: number
    bathrooms: number
    airConditioning: boolean
    elevatorAccess: boolean
    parking: boolean
    outdoorSpace: boolean
    kidFriendly: boolean
    inSuiteLaundry: boolean
  }

  interface IPageSearch {
    checkIn: string
    checkOut: string
    guests: number
    priceMin: number
    priceMax: number
  }

  interface ISignUp {
    firstName: string
    lastName: string
    email: string
    password: string
    birthDay: number
    birthMonth: number
    birthYear: number
  }

  interface IUser {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    birthDay: number
    birthMonth: number
    birthYear: number
  }

  type SignUpState = {
    firstName: string
    lastName: string
    email: string
    password: string
    birthDay: number
    birthMonth: number
    birthYear: number
  }

  type UserState = {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    birthDay: number
    birthMonth: number
    birthYear: number
  }

  type PageSearchState = {
    checkIn: string
    checkOut: string
    guests: number
    priceMin: number
    priceMax: number
  }

  type SearchState = {
    city: string
    checkIn: string
    checkOut: string
    guests: number
    priceMin: number
    priceMax: number
    bedrooms: number
    beds: number
    bathrooms: number
    airConditioning: boolean
    elevatorAccess: boolean
    parking: boolean
    outdoorSpace: boolean
    kidFriendly: boolean
    inSuiteLaundry: boolean
  }

  type PageSearchAction = {
    type: string
    payload: {
      search: IPageSearch
    }  
  }

  type SearchAction = {
    type: string
    payload: { 
      search: ISearch
    }
  }
  
  type SignUpAction = {
    type: string,
    payload: ISignUp
  }

  type UserAction = {
    type: string,
    payload: User
  }

  type DispatchType = (args: SearchAction) => SearchAction
  type DispatchType1 = (args: PageSearchAction) => PageSearchAction
  type DispatchType2 = (args: SignUpAction) => SignUpAction
  type DispatchType3 = (args: UserAction) => UserAction