//import styles from './Movie.module.css'
import './Movie.css';
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material';

function Movie() {
    return(
        <>

            <body className='Movie-body'>
                <div>
                    {/* Need there to be change in color of the page*/}
                    <Paper elevation={3} className='Movie-review'>
                        <h1>
                            Movie Title
                        </h1>
                        <span className='Movie-poster-review-panel'>
                            <Paper elevation={3} className='Movie-poster'>
                                <img src={require('./static/cartoon-banana.png')} alt="Banana Poster" height={300} width={200}/>
                            </Paper>
                                
                            <span class="Movie-poster-review-panel">
                                {/* <Paper elevation={3} className='Movie-score'> */}
                                    {/* <img class='dot' src={require('./static/cartoon-banana.png')} alt="Banana Poster" height={150} width={150}/> */}
                                    <span class='dot'>
                                        <Typography paddingTop={10} paddingLeft={8} color='white' fontSize={60}>
                                            3.25
                                        </Typography>
                                    </span>
                                    
                                {/* </Paper> */}
                                <p class='Movie-score-text'>
                                    Score: 4.5/7
                                </p>
                            </span>
                            
                            

                            <Paper elevation={3} className='Movie-score'>
                                {/* <img src={require('./static/cartoon-banana.png')} alt="Banana Poster" height={300} width={200}/> */}
                            </Paper>

                        </span>
                    </Paper>

                    <Paper>
                        <h3>
                            Description:
                        </h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </Paper>

                </div>
                <div>
                    <Paper>
                        <Typography>
                            Reviews: 
                        </Typography>
                    </Paper>
                </div>
            </body>
        </>

    )
}


export default Movie;

