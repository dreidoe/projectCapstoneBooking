import { Router } from "express";
import merchant from "Merchant.js";

const router = new Router();
router.get("/", (_, response) => {
  merchant
    .index()
    .then((merchants) => {
      response.json(merchants);
    })
    .catch((err) => {
      response.status(500).json(err);
    });
});
router.get("/:id", async (request, response) => {
  const { id } = request.params;

  const contact = await merchant.show(id).catch((err) => {
    // If the reason for the rejected Promise is an invalid ID, then...
    if (err.message === "Invalid ID") {
      // ...return a 400 Bad Request status code.
      return response.status(400).json({ message: "Invalid ID" });
    }

    response.status(500).json(err);
  });

  if (merchant) {
    response.json(contact);
  } else {
    response.status(404).json({ message: "Contact not found" });
  }
});

export default router;
