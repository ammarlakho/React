import React, {Component} from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap'

class DishDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    
    renderDish(dish) {
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

    renderComments(comments) {
        if(comments != null) {
            const commentInfo = comments.map((comment) => {
                
                return (
                    <div class={comment.id}>
                       <li>
                            {comment.comment}
                        </li>
                        <br/>
                        <li>
                            {/* -- {comment.author}, {comment.date.slice(0, 10)} */}
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

    render() {
        const dish = this.props.dish
        let comments = null
        if(dish != null) {
            comments = dish.comments
        }
        
    
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {/* {this.renderDish(dish)} */}
                        {this.renderComments(comments)}
                    </div>
                </div>
            </div>
        );
    }
}



export default DishDetail