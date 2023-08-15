const createOuterTile = (authorAndDate, descriptionDiv, tile) => {
  const outerAuthorAndDate = authorAndDate.cloneNode(true)
  const outerDescriptionDiv = descriptionDiv.cloneNode(true)

  outerDescriptionDiv.classList.add("outerDescriptionDiv")
  const outerTile = document.createElement("div")
  outerTile.classList.add("outerTile")
  outerTile.appendChild(outerDescriptionDiv)
  outerTile.appendChild(tile)
  outerTile.appendChild(outerAuthorAndDate)
  return outerTile
}

const createAuthorAndDateDiv = (photoCreationDate, authorUsername) => {
  const authorAndDate = document.createElement("div")
  authorAndDate.classList.add("authorAndDate")

  const username = document.createElement("p")
  username.innerText = authorUsername
  username.classList.add("username")

  const creationDate = document.createElement("p")
  const re = /\d+/g
  let [year, month, day] = photoCreationDate.match(re)
  creationDate.innerText = `${day}/${month}/${year}`
  creationDate.classList.add("creationDate")

  const byAuthor = document.createElement("sup")
  byAuthor.innerText = "by"

  const onDate = document.createElement("sup")
  onDate.innerText = "on"

  authorAndDate.appendChild(byAuthor)
  byAuthor.after(username)
  username.after(onDate)
  onDate.after(creationDate)

  return authorAndDate
}

const createDescriptionDiv = (photoDescription) => {
  const descriptionDiv = document.createElement("div")
  descriptionDiv.classList.add("descriptionDiv")
  const description = document.createElement("h2")

  description.innerText = photoDescription
  descriptionDiv.appendChild(description)
  description.classList.add("description")
  return descriptionDiv
}

const createTile = (photo) => {
  const tile = document.createElement("div")
  tile.classList.add("tile")

  tile.style.backgroundImage = `url(${photo})`
  return tile
}

const makePhotosLayout = (results) => {
  for (let result of results) {
    const tile = createTile(result.smallPhoto)
    document.body.append(tile)

    const descriptionDiv = createDescriptionDiv(result.description)
    tile.appendChild(descriptionDiv)

    const authorAndDate = createAuthorAndDateDiv(
      result.creationDate,
      result.username
    )
    descriptionDiv.after(authorAndDate)

    const outerTile = createOuterTile(authorAndDate, descriptionDiv, tile)
    document.body.append(outerTile)
  }
}

const getPhotosObjects = (response) => {
  return response.data.results.map((result) => {
    let {
      description,
      user: { username },
      created_at: creationDate,
      urls: { small: smallPhoto },
    } = result
    if (description === null) description = result.alt_description
    return Object.assign({ description, username, creationDate, smallPhoto })
  })
}
const getPhotos = async (searchTerm) => {
  const unsplashEndpoint = `https://api.unsplash.com/search/photos?client_id=${unsplashApiKey}&query=`
  const response = await axios.get(unsplashEndpoint + searchTerm)

  const results = getPhotosObjects(response)

  makePhotosLayout(results)
}

getPhotos("sea")
