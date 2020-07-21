import React, { Component }from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, Label, Row, Col} from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';
import {Link} from 'react-router-dom'

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);


class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
        this.toggleModal()
    }

    render() {
        return (
            <React.Fragment>
                <Button onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg">Submit Comment</span> 
                </Button>
            
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values => this.handleSubmit(values))}>
                            <Row className="form-group">
                                <Label htmlfor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                        
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlfor="name" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(2), maxLength: maxLength(16)
                                        }} />
                                        <Errors
                                            className="text-danger" 
                                            model=".name"
                                            show="touched" 
                                            messages={{
                                            minLength: 'Must be greater than 2 digits',
                                            maxLength: 'Must be less than 16 digits',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlfor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        className="form-control"
                                        rows={6} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                            
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
            
        );
    }
}


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
                    <CommentForm />
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
        comments = props.comments
    }

    return (
        <div className="container">
            <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                    </div>
            </div>
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