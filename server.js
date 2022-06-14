import express from "express"
import dotenv from "dotenv"
dotenv.config()
import axios from "axios"
import rateLimit from "express-rate-limit"
const app = express()
app.use(express.json())

// see https://expressjs.com/en/guide/behind-proxies.html
app.set("trust proxy", 1)

const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 1, // limit each IP to 1 requests per windowMs
})

//  apply to all requests
app.use(limiter)

app.get("/api/search", async (req, res) => {
  try {
    const searchString = `${req.query.q}`
    console.log(searchString)

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

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`App listening on port ${port}!`))
