import { Router } from "express"
const router = Router()

import multer from 'multer'
import s3Utils from "./utils/s3.js"
import dynamoDBUtils from "./utils/dynamodb.js"

router.get('/', async (req, res) => {
  const result = await dynamoDBUtils.getAll()
  res.send(result.Items)
})

router.post('/', multer().array(), async (req, res) => {
  const file = req.files?.at(0)
  if (file === undefined) {
    res.status(400)
    res.send("provide a file")
    return
  }

  try {
    s3Utils.putObject("original_" + file.originalname, file.buffer)
    dynamoDBUtils.save(file.originalname, file.originalname, "ogun")

    res.status(200)
    res.send({
      "message": "success"
    })
  }
  catch (e) {
    dynamoDBUtils.updateAttribute(file.originalname, "UploadStatus", "Failed")
    res.status(500)
    res.send("An error occured: " + e.message)
  }
})

router.delete('/', async (req, res) => {
  try {
    await s3Utils.deleteObject("")
    res.status(200)
    res.send({
      "message": "success"
    })
  } catch (e) {
    res.status(500)
    res.send("An error occured: " + e.message)
  }
})

export default router