//import styles from './Movie.module.css'
import './Movie.css';
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material';
import ReviewList from './ReviewList';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';


function Movie() {
    return(
        <>
            <div className='Movie-body'>
                <div>
                    {/* Need there to be change in color of the page*/}
                    <Paper elevation={3} className='Movie-review'>
                        <h1>
                            Movie Title
                        </h1>
                        <span className='Movie-poster-review-panel'>
                            <Paper elevation={3} className='Movie-poster'>
                                <img src={require('../static/cartoon-banana.png')} alt="Banana Poster" height={300} width={200}/>
                            </Paper>
                                
                            <span className="Movie-poster-review-panel">
                                <span className='dot'>
                                    <Typography paddingTop={10} paddingLeft={8} color='white' fontSize={60}>
                                        3.25
                                    </Typography>
                                </span>
                            </span>

                            <Paper elevation={3} className='Movie-score'>
                                {/* <img src={require('./static/cartoon-banana.png')} alt="Banana Poster" height={300} width={200}/> */}
                            </Paper>

                        </span>
                    </Paper>
                </div>

                <div>
                    <Paper elevation={3} className='Movie-desc'>
                        {/* <div> */}
                        <Typography variant='h5'>
                            Description:
                        </Typography>
                        <Typography variant='p'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>
                        {/* </div> */}
                    </Paper>
                </div>

                
                <div>
                    <Paper className='Movie-desc'>
                        <TextField id="outlined-basic" label="Your Review" variant="outlined" fullWidth />
                    </Paper>
                </div>

                <div>

                        <Typography variant='h4' className='Movie-desc'>
                            Reviews
                        </Typography>
                        {/* <Typography variant='p'>
                            Amet commodo nulla facilisi nullam vehicula. Ipsum faucibus vitae aliquet nec. Ornare arcu odio ut sem nulla pharetra diam sit amet. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl. Dictumst vestibulum rhoncus est pellentesque. Et tortor at risus viverra. Pretium fusce id velit ut tortor. Nec ultrices dui sapien eget. Tincidunt augue interdum velit euismod in pellentesque massa placerat. Sed odio morbi quis commodo odio aenean. Dui faucibus in ornare quam viverra orci. Risus nullam eget felis eget nunc lobortis mattis aliquam. Est placerat in egestas erat imperdiet sed euismod nisi porta. Urna id volutpat lacus laoreet non curabitur. Elit eget gravida cum sociis natoque penatibus. Iaculis nunc sed augue lacus viverra vitae congue eu. In egestas erat imperdiet sed. Venenatis a condimentum vitae sapien pellentesque habitant morbi.
                        </Typography> */}
                        <ReviewList/>
                </div>
            </div>
            {/* <ReviewList/> */}

        </>
    )
}


export default Movie;

