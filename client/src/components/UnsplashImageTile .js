import AuthorAndDate from "./AuthorAndDate"
import Description from "./Description"

const UnsplashImageTile = ({ picture }) => {
  const { description, username, creationDate, smallImage } = picture

  return (
    <div className='outerTile'>
      <Description description={description}></Description>
      <div className='tile' style={{ backgroundImage: `url(${smallImage})` }}>
        <Description description={description}></Description>
        <AuthorAndDate
          username={username}
          creationDate={creationDate}
        ></AuthorAndDate>
      </div>
      <AuthorAndDate
        username={username}
        creationDate={creationDate}
      ></AuthorAndDate>
    </div>
  )
}
export default UnsplashImageTile
