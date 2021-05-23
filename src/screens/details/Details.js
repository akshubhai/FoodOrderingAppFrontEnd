import React, {Component, Fragment} from 'react';

//Import of stylesheet
import './Details.css';

//Other components import
import CustomizedSnackbar from '../../common/customizedsnackbar/CustomizedSnackBar'
import Header from '../../common/header/Header'

//Material UI component imports
import IconButton from '@material-ui/core/IconButton';
import Divider from "@material-ui/core/Divider";
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import RemoveIcon from '@material-ui/icons/Remove';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";

class Details extends Component {

    constructor() {
        super();
        this.state = {
            id: null,
            restaurant_name: null,
            photo_URL: null,
            customer_rating: null,
            average_price: null,
            number_customers_rated: null,
            locality: null,
            categories: [],
            open: false,
            totalAmount: 0,
            totalItems: 0,
            cartEmpty: false,
            orderItems: {id: null, items: [], total: 0},
            cartItems: [],
            cartItem: {},
            itemQuantityDecreased: false,
            nonloggedIn: false,
            itemRemovedFromCart: false,
            itemQuantityIncreased: false,
            itemAddedFromCart: false,
        }

    }

    componentDidMount() {
        // Get profile 
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    id: JSON.parse(this.responseText).id,
                    restaurant_name: JSON.parse(this.responseText).restaurant_name,
                    photo_URL: JSON.parse(this.responseText).photo_URL,
                    customer_rating: JSON.parse(this.responseText).customer_rating,
                    average_price: JSON.parse(this.responseText).average_price,
                    number_customers_rated: JSON.parse(this.responseText).number_customers_rated,
                    locality: JSON.parse(this.responseText).address.locality,
                    categories: JSON.parse(this.responseText).categories,
                    orderItems: {id: JSON.parse(this.responseText).id},


                });
            }
        });

        let url = this.props.baseUrl + 'restaurant/';

        xhr.open("GET", url + this.props.match.params.restaurantId);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
    }

    