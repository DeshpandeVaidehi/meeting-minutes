import React, { Component } from 'react';
import HeaderBar from "../react-component/Header";
import OutlinedButtons from '../react-component/OutlinedButtons';
import MediaCapture from '../component/MediaCapture';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import { Widget } from 'react-chat-widget';
import { withStyles } from '@material-ui/core';
import '../css/chat.css';
import axios from 'axios'; 
import CircularProgress from '@material-ui/core/CircularProgress';
import 'bootstrap/dist/css/bootstrap.min.css';

// import 'react-chat-widget/lib/styles.css';


const styles = {
    root: {
      padding : 24,
      margin : 'auto',
    },
    paper: {
        background: "lightblue",
        paddingTop:'10px',
        paddingBottom:'10px',
      }
  };
  

class IndexContainer extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    texts : [],
    summaries : [],
    isLoading : true,
    isShow : false,
    isShowDiv : false
  }

  handleClick = () => {
    //   const apiUrl = HOST +":"+ PORT;
    //   `${apiUrl}/getTranscript`
    let me = this;
      axios.get('http://192.168.43.178:1706/getTranscript')
      	.then(function(response){
              console.log(response.data);
              me.setState({texts : response.data.results});
             
    });
    this.setState({isShow : true});
    }

    getSummarize = () => {

      let me = this;
      axios.get('http://192.168.43.178:1706/getSummary')
      	.then(function(response){
              console.log(response.data);
              me.setState({summaries : response.data.results});
             
    });
    this.setState({isShowDiv : true});
    }
    
  
  render() {
    const {classes, ...rest} = this.props;
    return (
        
          <HeaderBar >
           <div style={{marginLeft: '130px',marginTop: '20px'}}>
           <font size="5">Select Audio : </font><input type='file' onChange = {this.handleClick}/>

            </div>
           
           { this.state.isShow ?
            <div style={{marginTop : '20px'}}>
            <div style={{float: 'left',marginLeft: '10%',maxHeight:'400px',overflowY:'auto',width:'450px'}}>
               <Paper style={styles.paper}>
                    {this.state.texts.map((text,index) =>
                    <div className="talk-bubble tri-right left-top">
                    <div className="talktext">
                        <p>{text.text}</p>
                    </div>
                    </div>
                    )}      
                </Paper>
            </div>
            <button type="button" class="btn btn-primary" style = {{marginLeft: '20px', marginTop : '190px'}} onClick={this.getSummarize}>Summarize</button>
            
            { this.state.isShowDiv ?
            <div style={{float: 'right',marginRight: '7%',maxHeight:'400px',overflowY:'auto',width:'450px'}}>
               <Paper style={styles.paper}>
                    {this.state.summaries.map((text,index) =>
                        <div className="talk-bubble tri-right left-top">
                    <div className="talktext">
                        <h3> {text.topic} : </h3> <p>{text.desc} </p>
                    </div>
                    </div>
                    )}            
                </Paper>
            </div> :  null} 
            </div> 
            : null }
          </HeaderBar>
       );
  }
}



export {IndexContainer};
