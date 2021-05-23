import React, {Component, Fragment} from 'react';
//Stylesheet import
import './Checkout.css'

//Header component Import
import Header from "../../common/header/Header";

//Material-Ui Imports
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import OrderItems from "../../common/orderitems/OrderItems";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from '@material-ui/icons/Close';
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
//Router Import
import {Redirect} from 'react-router-dom';

class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            activeStep: 0,
            activeTabValue: 'existing_address',
            addresses: [],
            states: [],
            payments: [],
            flat: '',
            locality: '',
            city: '',
            stateUUID: '',
            pincode: '',
            paymentId: '',
            flatRequired: false,
            localityRequired: false,
            cityRequired: false,
            stateUUIDRequired: false,
            pincodeRequired: false,
            pincodeValid: true,
            selectedAddressId: undefined,
            displayChange: 'display-none',
            placeOrderMessage: undefined,
            placeOrderMessageOpen: false,
            couponId: undefined,
        }
    }

    componentDidMount() {
        if (this.props.location.state !== undefined && sessionStorage.getItem('access-token') !== null) {
            this.fetchAddress();
            this.fetchStates();
            this.fetchPayments();
        }
    }

    render() {
        if (this.props.location.state === undefined || sessionStorage.getItem('access-token') === null) {
            return <Redirect to='/'/>
        }
        return <Fragment>
            <Header baseUrl={this.props.baseUrl}></Header>
            <div className='main-container'>
                <div className='delivery-payment-section'>
                    <Stepper activeStep={this.state.activeStep} orientation='vertical'>
                        <Step key='Delivery'>
                            <StepLabel>Delivery</StepLabel>
                            <StepContent>
                                <div>
                                    <AppBar position={"relative"}>
                                        <Tabs value={this.state.activeTabValue} variant='standard'>
                                            <Tab value='existing_address' label='EXISTING ADDRESS'
                                                 onClick={() => this.changeActiveTab('existing_address')}/>
                                            <Tab value='new_address' label='NEW ADDRESS'
                                                 onClick={() => this.changeActiveTab('new_address')}/>
                                        </Tabs>
                                    </AppBar>
                                </div>
                                <div id='existing-address-display'
                                     className={this.state.activeTabValue === 'existing_address' ? 'display-block' : 'display-none'}>
                                    {this.state.addresses === "" && (!(this.state.value)) ?
                                        <Typography style={{margin: 10, marginBottom: 200}} color='textSecondary'
                                                    component='p'>
                                            There are no saved addresses! You can save an address using the 'New
                                            Address' tab or using your ‘Profile’ menu option.
                                        </Typography> :
                                        <GridList style={{flexWrap: 'nowrap'}} cols={3} cellHeight='auto'>
                                            {
                                                (this.state.addresses || []).map((address, index) => (
                                                    <GridListTile key={address.id}
                                                                  className={this.state.selectedAddressId === address.id ? 'grid-list-tile-selected-address' : null}>
                                                        <div className='address-box'>
                                                            <p>{address.flat_building_name}</p>
                                                            <p>{address.locality}</p>
                                                            <p>{address.city}</p>
                                                            <p>{address.state.state_name}</p>
                                                            <p>{address.pincode}</p>
                                                        </div>
                                                        <Grid container>
                                                            <Grid item xs={6} lg={10}></Grid>
                                                            <Grid item xs={2}>
                                                                <IconButton
                                                                    id={'select-address-button-' + address.id}
                                                                    className='select-address-icon'
                                                                    onClick={this.selectAddress}>
                                                                    <CheckCircleIcon
                                                                        id={'select-address-icon-' + address.id}
                                                                        className={this.state.selectedAddressId === address.id ? 'display-green-icon' : 'display-grey-icon'}/>
                                                                </IconButton>
                                                            </Grid>
                                                        </Grid>
                                                    </GridListTile>
                                                ))
                                            }
                                        </GridList>
                                    }
                                </div>
                                <div id='new-address-display'
                                     className={this.state.activeTabValue === 'new_address' ? 'display-block' : 'display-none'}>
                                    <FormControl style={{minWidth: 300}}>
                                        <InputLabel htmlFor='flat'>Flat/Building No</InputLabel>
                                        <Input id='flat' name='flat' type='text' value={this.state.flat}
                                               flat={this.state.flat}
                                               onChange={this.onInputFieldChangeHandler}/>
                                        {this.state.flatRequired ? <FormHelperText>
                                            <span style={{color: "red"}}>required</span>
                                        </FormHelperText> : null}
                                    </FormControl>
                                    <br/>
                                    <FormControl style={{minWidth: 300}}>
                                        <InputLabel htmlFor='locality'>Locality</InputLabel>
                                        <Input id='locality' name='locality' type='text' value={this.state.locality}
                                               locality={this.state.locality}
                                               onChange={this.onInputFieldChangeHandler}/>
                                        {this.state.localityRequired ? <FormHelperText>
                                            <span style={{color: "red"}}>required</span>
                                        </FormHelperText> : null}
                                    </FormControl>
                                    <br/>
                                    <FormControl style={{minWidth: 300}}>
                                        <InputLabel htmlFor='city'>City</InputLabel>
                                        <Input id='city' name='city' type='text' value={this.state.city}
                                               city={this.state.city}
                                               onChange={this.onInputFieldChangeHandler}/>
                                        {this.state.cityRequired ? <FormHelperText>
                                            <span style={{color: "red"}}>required</span>
                                        </FormHelperText> : null}
                                    </FormControl>
                                    <br/>
                                    <FormControl style={{minWidth: 300}}>
                                        <InputLabel htmlFor='stateUUID'>State</InputLabel>
                                        <Select id='stateUUID' name='stateUUID' value={this.state.stateUUID}
                                                onChange={this.onInputFieldChangeHandler}>
                                            {this.state.states.map((state, index) => (
                                                <MenuItem key={state.id} value={state.id}>{state.state_name}</MenuItem>
                                            ))}
                                        </Select>
                                        {this.state.stateUUIDRequired ? <FormHelperText>
                                            <span style={{color: "red"}}>required</span>
                                        </FormHelperText> : null}
                                    </FormControl>
                                    <br/>
                                    <FormControl style={{minWidth: 300}}>
                                        <InputLabel htmlFor='pincode'>Pincode</InputLabel>
                                        <Input id='pincode' name='pincode' type='text' value={this.state.pincode}
                                               pincode={this.state.pincode}
                                               onChange={this.onInputFieldChangeHandler}/>
                                        {this.state.pincodeRequired ? <FormHelperText>
                                            <span style={{color: "red"}}>required</span>
                                        </FormHelperText> : null}
                                        {!this.state.pincodeRequired && !this.state.pincodeValid ? <FormHelperText>
                                            <span style={{color: "red"}}>Pincode must contain only numbers and must be 6 digits long</span>
                                        </FormHelperText> : null}
                                    </FormControl>
                                    <br/>
                                    <br/>
                                    <FormControl style={{minWidth: 150}}>
                                        <Button variant='contained' color='secondary' onClick={this.saveAddress}>SAVE
                                            ADDRESS</Button>
                                    </FormControl>
                                </div>
                                <div>
                                    <Button style={{margin: 5}} disabled={this.state.activeStep === 0}>Back</Button>
                                    <Button style={{margin: 5}} className='button' variant="contained" color="primary"
                                            onClick={this.incrementActiveStep}>Next</Button>
                                </div>
                            </StepContent>
                        </Step>
                        <Step key='Payment'>
                            <StepLabel>Payment</StepLabel>
                            <StepContent>
                                <div id='payment-modes'>
                                    <FormControl>
                                        <FormLabel>Select Mode of Payment</FormLabel>
                                        <RadioGroup onChange={this.onPaymentSelection} value={this.state.paymentId}>
                                            {(this.state.payments || []).map((payment, index) => (
                                                <FormControlLabel key={payment.id} value={payment.id} control={<Radio/>}
                                                                  label={payment.payment_name}/>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <Button style={{margin: 5}} onClick={this.decrementActiveStep}>Back</Button>
                                <Button style={{margin: 5}} variant="contained" color="primary"
                                        onClick={this.incrementActiveStep}>Finish</Button>
                            </StepContent>
                        </Step>
                    </Stepper>
                    <div className={this.state.displayChange}>
                        <Typography style={{marginLeft: 40}} variant='h5'>
                            View the summary and place your order now!
                        </Typography>
                        <Button style={{marginLeft: 40, marginTop: 20}} onClick={this.resetActiveStep}>CHANGE</Button>
                    </div>
                </div>
                <div className='summary-section'>
                    <Card variant='elevation' className='summary-card'>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Summary
                            </Typography>
                            <br/>
                            <Typography variant='h6' component='h3' color='textSecondary'
                                        style={{textTransform: "capitalize", marginBottom: 15}}>
                                {this.props.location.state.restaurantName}
                            </Typography>
                            <OrderItems divider='true' orderitems={this.props.location.state.orderItems}
                                        total={this.props.location.state.total} placeOrder={this.placeOrder}/>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div>
                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} key='01'
                          message={this.state.placeOrderMessage}
                          open={this.state.placeOrderMessageOpen}
                          onClose={this.placeOrderMessageClose}
                          autoHideDuration={6000}
                          action={<Fragment> <IconButton color='inherit'
                                                         onClick={this.placeOrderMessageClose}><CloseIcon/></IconButton></Fragment>}/>
            </div>
        </Fragment>
    }

   /**
     * Used for stepper to move ahead based on user actions.
     */
    incrementActiveStep = () => {
        if (this.state.activeStep === 0 && this.state.selectedAddressId === undefined) {
            //Do nothing as it is mandatory to select an address
        } else if (this.state.activeStep === 1 && this.state.paymentId === '') {
            //Do nothing, Because user has to select payment to proceed further.
        } else {

            let activeState = this.state.activeStep + 1;
            let changeAddressPayment = 'display-none';
            if (activeState === 2) {
                changeAddressPayment = 'display-block';
            }
            this.setState({activeStep: activeState, displayChange: changeAddressPayment})
        }
    }

    /**
     * Used for stepper to move backwards based on user actions.
     */
    decrementActiveStep = () => {
        let activeState = this.state.activeStep - 1;
        this.setState({activeStep: activeState})
    }

    /**
     * Used for stepper reset to first step when user wants to change the order.
     */
    resetActiveStep = () => {
        this.setState({activeStep: 0, displayChange: 'display-none'})
    }
