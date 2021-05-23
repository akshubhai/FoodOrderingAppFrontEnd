import React, { Component } from 'react';

//importing the header component
import Header from '../../common/header/Header';

//importing material-ui components
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

//importing font awesome
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

//importing the css file of the Home page
import './Home.css';

const styles = theme => ({
    restaurantsCard: {
        width: 300,
        maxWidth: 300,
        height: 340,
        maxHeight: 340,
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 15,
        cursor: 'pointer',
    }
});

class Home extends Component {

    constructor() {
        super();
        this.state = {
            restaurants: [],
            cards: null,
            loading: false
        }
    }

    componentDidMount() {
        this.mounted = true;
        this.getRestaurants();
        this.noOfColumns();
        //when the window is resized calls the noOfColumns method
        window.addEventListener('resize', this.noOfColumns);
    }

    //called before render()
    componentWillUnmount() {
        window.removeEventListener('resize', this.noOfColumns);
    }

    render() {
        const { classes } = this.props;
        return (
            this.mounted === true ?
                <div>
                    <Header showSearchBox={true} searchHandler={this.searchHandler} baseUrl={this.props.baseUrl} />
                    {/* if no restaurants found with the entered name displays the No restaurant with the given name. */}
                    {this.state.restaurants.length === 0 && this.state.loading === false ?
                        <Typography variant="h6">No restaurant with the given name.</Typography> :
                        <GridList cols={this.state.cards} cellHeight="auto">
                            {this.state.restaurants.map(restaurant => (
                                <GridListTile key={'restaurant' + restaurant.id} >
                                    {/* restaurant details card onclick redirects to restaurant details page*/}
                                    < Card className={classes.restaurantsCard} onClick={() => this.restaurantDetails(restaurant.id)}>
                                        <CardActionArea>
                                            <CardMedia component="img" height={160} image={restaurant.photo_URL} title={restaurant.restaurant_name} />
                                            <CardContent>
                                                <div className="restaurant-title-div">
                                                    <Typography gutterBottom variant='h5' component='h2'>
                                                        {restaurant.restaurant_name}
                                                    </Typography>
                                                </div>
                                                <div className="restaurant-categories-div">
                                                    <Typography variant='subtitle1'>
                                                        {restaurant.categories}
                                                    </Typography>
                                                </div>
                                                <div className="rating-and-avg-div">
                                                    {/* restaurant rating */}
                                                    <div className="restaurant-rating-div">
                                                        <Typography variant='body1'>
                                                            <i className="fa fa-star"></i> {restaurant.customer_rating} ({restaurant.number_customers_rated})
                                                        </Typography>
                                                    </div>
                                                    {/* restaurant average price */}
                                                    <div className="restaurant-avg-price-div">
                                                        <Typography variant='body1'>
                                                            <i className="fa fa-inr" aria-hidden="true"></i>{restaurant.average_price} for two
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </GridListTile>
                            ))}
                        </GridList>
                    }
                </div>
                : ""
        )
    }

    
