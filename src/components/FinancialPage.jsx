import React from 'react';
import { Grid } from '@material-ui/core';
import {CryptoMarketsTable, CryptoQuotesCards, CryptoNewsFeedCards, GPTHistory} from './common';

class FinancialPage extends React.Component {  
    
    constructor(props) {
        super(props);
        this.state = {
        error: null,
        isLoaded: false,
        feedLoaded: false,
        data: [],
        feed: null
        };
    }    
    
    componentDidMount() {
        this.loadMarketSummaries();
        this.loadNewsFeed();
        this.loadQuotes();
        this.loadGPTHistory();
       
    };

    loadMarketSummaries(){
        var url = "http://" + window.location.hostname + ":5010/fst/markets";
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                isLoaded: true,
                markets: result
            });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        })     
    };

    loadQuotes(){
        var url = "http://" + window.location.hostname + ":5010/fst/quotes?symbols=btc,eth,xrp";
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                isLoaded: true,
                quotes: result
            });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        });
    };

    loadNewsFeed(){
        var url = "http://" + window.location.hostname + ":5010/fst/cryptofeed";
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                //console.log(result);
                this.setState({
                feedLoaded: true,
                feed: result
            });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        })     
    }

    loadGPTHistory(){
        var url = "http://" + window.location.hostname + ":5010/gpt/history";
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                //console.log(result);
                this.setState({
                historyLoaded: true,
                history: result
            });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            this.setState({
                historyLoaded: true,
                error
            });
        })     
    }

    
    handleSummaryClick(event, obj){
      
        var url = "http://" + window.location.hostname + ":5010/fst/summarize";
        var body = {};

        var contentSnippet = obj["content:encodedSnippet"];
        body.text =contentSnippet.length > 1500? contentSnippet.substring(0,1449): contentSnippet;

        fetch(url, {
            credentials: 'include', // fetch won't send cookies unless you set credentials
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(body)
        }).then(res => res.json())
        .then((result) => {

            var newState = this.state.feed;

            for(var i = 0; i < newState.items.length; i++){
                
                if(newState.items[i].guid == obj.guid){
                    console.log(result);
                    newState.items[i].gpt3=result;
                    this.setState({feed: newState});
                }
            }      
            
            this.loadGPTHistory();
        }); 

        event.preventDefault();
    };
  
    render(){
        const {classes} = this.props;

        return (
            <Grid container spacing={3}>
                <Grid item xs={12} sm={8}>
                    <CryptoQuotesCards data={this.state.quotes} classes={classes}/>
                    <CryptoNewsFeedCards data={this.state.feed} classes={classes} scope={this} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CryptoMarketsTable data={this.state.markets} classes={classes}/>
                    <GPTHistory data={this.state.history} classes={classes}></GPTHistory>
                </Grid>
            </Grid>
        );
    }
}
export default FinancialPage
