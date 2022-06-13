const unsplashApiKey = config.ACCESS_KEY

const getPhotos = async (searchTerm) => {
  const unsplashEndpoint = `https://api.unsplash.com/search/photos?client_id=${unsplashApiKey}&query=`
  const response = await axios.get(unsplashEndpoint + searchTerm)
  console.log(response)
  const results = response.data.results.map((result) => {
    let {
      description,
      user: { username },
      created_at: creationDate,
      urls: { small: smallImage },
    } = result
    if (description === null) description = result.alt_description
    return Object.assign({ description, username, creationDate, smallImage })
  })
  //   console.log("result to są: ", results)
  for (let result of results) {
    const tile = document.createElement("div")
    tile.classList.add("tile")

    tile.style.backgroundImage = `url(${result.smallImage})`
    document.body.append(tile)

    //description
    const descriptionDiv = document.createElement("div")
    descriptionDiv.classList.add("descriptionDiv")
    const description = document.createElement("h2")

    description.innerText = result.description
    descriptionDiv.appendChild(description)
    description.classList.add("description")
    //authoranddate
    const authorAndDate = document.createElement("div")
    authorAndDate.classList.add("authorAndDate")

    const username = document.createElement("p")
    username.innerText = result.username
    username.classList.add("username")

    const creationDate = document.createElement("p")
    const re = /\d+/g
    let [year, month, day] = result.creationDate.match(re)
    creationDate.innerText = `${day}/${month}/${year}`
    creationDate.classList.add("creationDate")

    const byAuthor = document.createElement("sup")
    byAuthor.innerText = "by"

    const onDate = document.createElement("sup")
    onDate.innerText = "on"

    tile.appendChild(descriptionDiv)
    descriptionDiv.after(authorAndDate)
    authorAndDate.appendChild(byAuthor)
    byAuthor.after(username)
    username.after(onDate)
    onDate.after(creationDate)

    const outerAuthorAndDate = authorAndDate.cloneNode(true)
    const outerDescriptionDiv = descriptionDiv.cloneNode(true)
    outerDescriptionDiv.classList.add("outerDescriptionDiv")
    const outerTile = document.createElement("div")
    outerTile.classList.add("outerTile")
    document.body.append(outerTile)
    outerTile.appendChild(outerDescriptionDiv)
    // outerTile.after(tile)
    // tile.after(tile)
    outerTile.appendChild(tile)
    outerTile.appendChild(outerAuthorAndDate)
  }
}

getPhotos("sea")
