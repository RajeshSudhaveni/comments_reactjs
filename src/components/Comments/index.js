import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {formatDistanceToNow} from 'date-fns'

import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {commentsList: [], name: '', comment: '', count: 0}

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          //   eachContact.isFavorite = !eachContact.isFavorite
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state
    const filteredComments = commentsList.filter(each => each.id !== id)
    this.setState(prevState => ({
      commentsList: filteredComments,
      count: prevState.count - 1,
    }))
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  timeAgo = date => {
    const formattedDistance = formatDistanceToNow(new Date(date), {
      addSuffix: true,
    })

    return <p>{formattedDistance}</p>
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const newComment = {
      id: uuidv4(),
      name,
      comment,
      isLiked: false,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
      count: prevState.count + 1,
    }))
  }

  render() {
    const {name, comment, commentsList, count} = this.state

    return (
      <div>
        <h1>Comments</h1>
        <p>Say Something</p>
        <img
          alt="comments"
          src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
        />
        <form onSubmit={this.onAddComment}>
          <input
            placeholder="Your Name"
            type="text"
            value={name}
            onChange={this.onChangeName}
          />
          <textarea
            placeholder="Your Comment"
            rows={5} // Specify the number of rows for the textarea
            cols={40} // Specify the number of columns for the textarea
            value={comment} // Set the value from the state
            onChange={this.onChangeComment} // Handle changes in the textarea
          />
          <button type="submit">Add Comment</button>
        </form>

        <h1>Comments</h1>

        <ul>
          <p>{count}</p>
          {commentsList.map(each => (
            <CommentItem
              details={each}
              key={each.id}
              toggleFun={this.toggleIsLiked}
              deleteFun={this.deleteComment}
              timeAgoFun={this.timeAgo}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
