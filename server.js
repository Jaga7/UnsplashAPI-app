import express from "express"
import dotenv from "dotenv"
dotenv.config()
import axios from "axios"
import rateLimit from "express-rate-limit"
import morgan from "morgan"

import { dirname } from "path"
import { fileURLToPath } from "url"
import path from "path"

import xss from "xss-clean"

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
app.use(express.static(path.resolve(__dirname, "./client/build")))
app.use(express.json())

app.use(xss())

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"))
}

const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 1, // limit each IP to 1 requests per windowMs
})

//  apply to all requests
app.use(limiter)

app.get("/api/search", async (req, res) => {
  try {
    const searchString = `${req.query.q}`

    const response = await axios.get(
      `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${searchString}`
    )

    const results = response.data.results
    return res.json({
      results,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    })
  }
})

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"))
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`App listening on port ${port}!`))
