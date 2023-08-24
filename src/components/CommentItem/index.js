// Write your code here

const CommentItem = props => {
  const {details, toggleFun, deleteFun, timeAgoFun} = props
  const {name, comment, isLiked, id} = details

  const onClickLike = () => {
    toggleFun(id)
  }

  const onDeleteComment = () => {
    deleteFun(id)
  }

  const date = new Date('2023-08-01T12:00:00Z')

  const getTimeAgo = timeAgoFun(date)

  const likeUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  return (
    <li>
      <p>{name}</p>
      {getTimeAgo}
      <p>{comment}</p>
      <img src={likeUrl} alt="like" />
      <button type="button" onClick={onClickLike}>
        Like
      </button>

      <button type="button" data-testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
          alt="delete"
          onClick={onDeleteComment}
        />
      </button>
    </li>
  )
}

export default CommentItem
