/**
 * contact = {
 *  name, phone, qq, email, wechat, avatar, id
 * }
 * @type {{contacts: Array}}
 */
const initialState = {
  contacts: []
};

const contactReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'CONTACT_ADD':
      return {...state, contacts: [...state.contacts, action.payload]};
    case 'CONTACTS_SYNC':
      return {...state, contacts: action.payload};
    case 'CONTACT_DELETE':
      return {
        ...state,
        contacts: state.contacts
          .filter(contact =>
            contact.id !== action.payload
          )
      };
    case 'CONTACT_MODIFY':
      let newer = action.payload;
      return {
        ...state,
        contacts: state.contacts
          .map(contact => contact.id === newer.id ? newer : contact)
      };
    default:
      return state;
  }
};

export default contactReducer;