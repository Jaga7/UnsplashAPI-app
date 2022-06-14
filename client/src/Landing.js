import React, { useState, useEffect } from "react"
import axios from "axios"
import UnsplashImageTile from "./components/UnsplashImageTile "
const Landing = () => {
  const getPictures = async (searchTerm) => {
    const response = await axios.get(`/api/search?q=${searchTerm}`)

    const picturesDataObjects = getPicturesDataObjects(response)
    setPictures(picturesDataObjects)
  }

  const getPicturesDataObjects = (response) => {
    return response.data.results.map((result) => {
      let {
        id,
        description,
        user: { username },
        created_at: creationDate,
        urls: { small: smallImage },
      } = result
      if (description === null) description = result.alt_description
      return Object.assign({
        description,
        username,
        creationDate,
        smallImage,
        id,
      })
    })
  }

  const [pictures, setPictures] = useState([])
  useEffect(() => {
    getPictures("sea")
  }, [])
  return pictures.map((picture) => {
    return (
      <UnsplashImageTile key={picture.id} picture={picture}></UnsplashImageTile>
    )
  })
}
export default Landing
