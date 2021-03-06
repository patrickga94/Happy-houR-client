import { Card, Button } from 'react-bootstrap'
import { removeComment } from '../../api/comments'

const ShowComment = (props) => {
    const {comment, user, happyHour, triggerRefresh} = props



    //this function deletes a comment
    const destroyComment = () => {
        removeComment(user, happyHour._id, comment._id)
            .then(() => triggerRefresh())
            // if there is an error, we'll send an error message
            .catch(console.error)
    }

    
    return (
        <>
            <Card className="m-2 w-50 shadow p-3 mb-2 bg-body rounded justify-content-center">
                <Card.Header>
                    by: {comment.author} {comment.owner == happyHour.owner._id ? <span><strong>Owner</strong></span> : null}
                    {/* gives the option to delete a comment if the user is the owner of that comment */}
                    {
                        user._id === comment.owner &&
                            <>
                                <div className="float-end">
                                <Button className='btn-sm' onClick={() => destroyComment()}variant="danger">
                                    X
                                </Button>
                                </div>
                            </>
                    }
                </Card.Header>
                <Card.Body>
                    <small>{comment.note}</small><br/>
                </Card.Body>
            </Card>
        </>
    )
}

export default ShowComment