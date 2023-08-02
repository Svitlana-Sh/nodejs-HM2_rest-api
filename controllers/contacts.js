const crypto = require("crypto");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");

const contactsSchema = require("../models/validations/validateBody");

const getAll = async (req, res) => {
  const contacts = await listContacts();
  if (contacts) {
    res.status(200).json(contacts);
  } else {
    res.status(500).json({ message: "Couldn't read contacts" });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const addNewContact = async (req, res) => {
    const body = req.body;
  
    let response = contactsSchema.validate(body);
  if (typeof response.error !== "undefined") {
    return res.status(400).send("Validation Errors" + response.error.message);
  }
  
  if (
    body.name === undefined ||
    body.email === undefined ||
    body.phone === undefined
  ) {
    return res.status(400).json({ message: "missing required name field" });
  }

  const newId = crypto.randomUUID();

  response = await addContact(newId, body);
  return res.status(201).json({
    id: newId,
    name: response.name,
    email: response.email,
    phone: response.phone,
  });
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  console.log(contactId);
  const contact = await removeContact(contactId);

  if (contact) {
    return res.status(200).json({ message: "contact deleted" });
  }
  return res.status(404).json({ message: "Not found" });
};

const updateById = async (req, res) => {
  let response = contactsSchema.validate(req.body);
  if (typeof response.error !== "undefined") {
    return res.status(400).send("Validation Errors");
  }

  const { contactId } = req.params;
  const body = req.body;

  if (body === undefined || JSON.stringify(body) === "{}") {
    return res.status(400).json({ message: "missing fields" });
  }

  response = await updateContact(contactId, body);
  if (response === null) {
    return res.status(404).json({ message: "Not found" });
  } else {
    return res.status(200).json({ message: "contact update" });
  }
};

module.exports = {
  getAll,
  getById,
  addNewContact,
  deleteContact,
  updateById
};
