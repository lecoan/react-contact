const login = user => ({
  type: 'LOGIN',
  payload: user
});

const addContact = contact => ({
  type: 'CONTACT_ADD',
  payload: contact
});

const deleteContact = id => ({
  type: 'CONTACT_DELETE',
  payload: id
});

const modifyContact = contact => ({
  type: 'CONTACT_MODIFY',
  payload: contact
});

const syncContacts = contacts => ({
  type: 'CONTACTS_SYNC',
  payload: contacts
})

export {
  login,
  addContact,
  deleteContact,
  modifyContact,
  syncContacts
}