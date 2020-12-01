import React from 'react';
import {Grid, Button, Typography, Card, CardContent, CardActions, FormControl,
     FormHelperText, TextField} from '@material-ui/core';

class HomePage extends React.Component {  
    
    constructor(props) {
        super(props);
        this.state = {
        error: null,
        isLoaded: false,
        gptResponse: null
        };
    }

    //

    handleSubmit(event){
        var input = document.getElementById("jadeQuery").value;
        var that = this; 

        var url = "http://" + window.location.hostname + ":5010/gpt/query?query=" + input;
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
               
                if(result && result.choices && result.choices.length > 0){
                    this.setState({gptResponse: result.choices[0].text, isLoaded: true});
                }

            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );

        event.preventDefault();


    }

    render(){
        const {classes} = this.props;

        return (
              

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                                <Typography variant="h4" gutterBottom>General GPT-3 Query</Typography>
                                <form className={classes.container} noValidate autoComplete="off">
                                    <FormControl fullWidth={true}>
                                        <TextField
                                            id="jadeQuery"
                                            multiline
                                            rowsMax={3}
                                        >

                                        </TextField>
                                        <FormHelperText id="name-helper-text">Enter a generalized query for GPT-3</FormHelperText>
                                    </FormControl>                                                              
                                   
                                </form>
                        </CardContent>
                        <CardActions>
                        <Button type="submit" variant="contained" color="primary" onClick={(event)=>{this.handleSubmit(event)}}>
                                        Ask Jade
                                    </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>Jade's Response</Typography>
                            <Typography gutterBottom>{this.state.gptResponse}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

            
        );
    }
}
export default HomePage
