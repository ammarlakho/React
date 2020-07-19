import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap'



    function RenderDish({dish}) {
        if(dish != null) {
            return (
                <div>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    function RenderComments({comments}) {
        if(comments != null) {
            const commentInfo = comments.map((comment) => {
                
                return (
                    <div key={comment.id}>
                       <li>
                            {comment.comment}
                        </li>
                        <br/>
                        <li>
                            -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date.slice(0, 10))))}
                        </li>
                        <br/>
                    </div>
                );
            });
            return (
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {commentInfo}
                    </ul>
                </div>

            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    const DishDetail = (props) => {

        const dish = props.dish
        let comments = null
        if(dish != null) {
            comments = dish.comments
        }
        
    
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                       <RenderComments comments={comments} />
                    </div>
                </div>
            </div>
        );
    }

export default DishDetail