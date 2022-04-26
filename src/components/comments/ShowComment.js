import { Card, Button } from 'react-bootstrap'
import { removeComment } from '../../api/comments'

const ShowComment = (props) => {
    // most of these are simply to pass to edit modal
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
            <div className='justify-content-center'>
                <Card className="m-2 w-50 shadow p-3 mb-5 bg-body rounded">
                    <Card.Header>
                        author: {comment.author}
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
            </div>
        </>
    )
}

export default ShowComment