import express from 'express'

const router = express.Router()

router.get("/getUsers", (req, res) => {
  res.status(200).json({message: "works!"})
})

// delete logic
// make sure to unsubscribe other user as well

// create logic
// make sure to subscribe both users, and point to both from chat

export default router