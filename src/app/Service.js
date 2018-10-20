import axios from 'axios' 
import  {cobrandLoginRequest, userLoginRequest} from './YodleeRequests'

export default class YodleeService {

    getAccounts(){
        axios.get('')
  .then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });

    }
}

// new YodleeService().getAccounts()
