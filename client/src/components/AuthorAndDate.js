const AuthorAndDate = ({ username, creationDate }) => {
  const re = /\d+/g
  let [year, month, day] = creationDate.match(re)
  return (
    <div className='authorAndDate'>
      <sup>by</sup>
      <p className='username'>{username}</p>
      <sup>on</sup>
      <p className='creationDate'>
        {day}/{month}/{year}
      </p>
    </div>
  )
}
export default AuthorAndDate
