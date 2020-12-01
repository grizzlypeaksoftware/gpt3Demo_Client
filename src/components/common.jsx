import  React from 'react';
import {CircularProgress, Typography} from '@material-ui/core';
import {Grid, Card, Box, CardContent, CardActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button} from '@material-ui/core';

function RingIcon(props){
    return(
        <i className="fas fa-ring"></i>
    );
};

function GemIcon(props){
    return(
        <i className="fas fa-gem icon-right-space"></i>
    );
};

function RobotIcon(props){
    return(
        <i className="fas fa-robot"></i>
    );
};

class CryptoMarketsTable extends React.Component {  
    
    constructor(props) {
        super(props);
        this.state = {
        error: null
        };
    }
 
    render(){
        const {classes, data} = this.props;
        if(data){
            return (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h4">Market Summary</Typography>
                            <TableContainer>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Symbol</TableCell>
                                        <TableCell align="right">High</TableCell>
                                        <TableCell align="right">Low</TableCell>
                                        <TableCell align="right">% Chg</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {data.map((row) => (
                                        <TableRow key={row.symbol} className={classes.hideLastBorder}>
                                        <TableCell align="left" component="th" scope="row">
                                            {row.symbol}
                                        </TableCell>
                                        <TableCell align="right">{parseFloat(row.high).toFixed(2)}</TableCell>
                                        <TableCell align="right">{parseFloat(row.low).toFixed(2)}</TableCell>
                                        <TableCell align="right">{parseFloat(row.percentChange).toFixed(2)}</TableCell>

                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                    
                    </Grid>
                </Grid>
            );
        } else {
            return <CircularProgress />
        }
    }
}


class CryptoQuotesCards extends React.Component {  
    
    constructor(props) {
        super(props);
        this.state = {
        error: null
        };
    }
 
    render(){
        const {classes, data} = this.props;
        if(!data){
            return (<CircularProgress />)
        }

        return (
            <Box mb={2} mt={2}>
                <Box mb={2} ml={2}>
                    <Typography variant="h4">Cryptocurrency Markets</Typography>
                </Box>
            <Grid container alignItems="stretch" spacing={1}>
                
                {data.map((row) => (                    
                    <Grid component={Card} className={classes.card} key={row.symbol}item xs={12} sm={4}>
                        
                            <CardContent>
                                <Typography variant="h6">{row.name} ({row.symbol})</Typography>

                                <Table>
                                    <TableBody>
                                    <TableRow>
                                            <TableCell align="left">Last</TableCell>
                                            <TableCell align="right">{row.quote.USD.price.toFixed(2)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                            <TableCell align="left">Change(%)</TableCell>
                                            <TableCell align="right">{row.quote.USD.percent_change_24h.toFixed(2)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                            <TableCell align="left">Mkt Cap</TableCell>
                                            <TableCell align="right">{row.quote.USD.market_cap.toFixed(0)}</TableCell>
                                    </TableRow>
                                    </TableBody>
                                </Table>                                
                                <Box mt={2}>
                                    <Typography variant="h6">About {row.name} ({row.symbol})</Typography>
                                </Box>
                                <Box>
                                    <FinancialSmartText data={row}/>
                                </Box>
                                <Typography variant="caption">Updated: {row.last_updated}</Typography>

                            </CardContent>
                   </Grid>
                ))}                
            </Grid>
            </Box>
        );
    }
}


class FinancialSmartText extends React.Component {  
    
    constructor(props) {
        super(props);
        this.state = {
        error: null
        };
    }

    
    componentDidMount() {
        const {data} = this.props;
        var url = "http://" + window.location.hostname + ":5010/fst/";
        fetch(url ,{
            credentials: 'include', // fetch won't send cookies unless you set credentials
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                isLoaded: true,
                textResult: result
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
 
    render(){
        const {classes, data} = this.props;
        if(this.state.textResult && this.state.textResult.choices){
            return(
                <Typography >{this.state.textResult.choices[0].text}</Typography>
            )
        } else {
            return(
                <Typography ></Typography>
            
            )
        
        }
    }
}


function CryptoNewsFeedCards(props){
    const {classes, data, scope} = props;
    if(!data){
        return (<CircularProgress />)
    }

    return (
        <Grid container spacing={1} >
            <Box ml={2} mb={3} mt={2}>
                <Typography variant="h4">Crypto News</Typography>
            </Box>
            {data.items.map((row) => (
                <Grid key={row.title}item xs={12}>
                    <NewsCard row={row} scope={scope} />
                </Grid>
            ))}
        </Grid>
    )
};


function NewsCard(props){

    const {row, scope} = props;

    if(row){
        return(
            <Box mb={1}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">{row.title}</Typography>
                        <Typography>{row.author}</Typography>
                        <div className="article_snippet">{row.contentSnippet.length > 250? row.contentSnippet.substring(0,249): row.contentSnippet}</div>
                        <GPTSummary data={row} />                    
                    </CardContent>  
                    <CardActions>
                        <GPTSummaryButton row={row} scope={scope}/>
                    </CardActions>
                </Card>
            </Box>      

        );
    }
    else return (<Box></Box>)
};

function GPTSummaryButton(props){
    const {row, scope} = props;
    return(
        <Button onClick={(event)=> scope.handleSummaryClick(event, row)}>Summarize Text</Button>
    )



}

function GPTSummary(props){
    const {data} = props;
    //console.log(data);
    if(data && data.gpt3){
        return (
            <Box mt={2}>
                <Typography variant="h6">GPT-3 Summary</Typography>
                <Typography>{data.gpt3.choices[0].text}</Typography>
            </Box>
        )
    } else {
        return(
        <div></div>
        )
    }
};

function GPTHistory(props){
    const {data, classes} = props;
    console.log(data);
    if(data){
        
        return (  

        <Box mt={3}>
            <Box ml={2} mb={2}>
            <Typography variant="h4">GPT-3 History</Typography>
            </Box>   
           
            {data.map((row) => (
                <Box mb={2}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">{row.name}</Typography>
                        <Typography variant="caption" display="block" gutterBottom>
                            Engine: {row.prompt.engine} 
                        </Typography>
                        <Typography >{row.completion.choices[0].text}</Typography>
                        
                        
                    </CardContent>
                </Card>
                </Box>
                
            ))}
        </Box>
        )
    } else {
        return (
            <div></div>
            )
    }
};

export {RingIcon, GemIcon, RobotIcon, CryptoMarketsTable, CryptoQuotesCards, FinancialSmartText, CryptoNewsFeedCards, GPTHistory};