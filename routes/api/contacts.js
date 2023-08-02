const express = require("express");
const {
  getAll,
  getById,
  addNewContact,
  deleteContact,
  updateById
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", addNewContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateById);

module.exports = router;
