import axios from 'axios' 
import  {cobrandLoginRequest, userLoginRequest} from './YodleeRequests'

export default class YodleeService {

    getAccounts(){
        axios.get('https://www.google.com')
  .then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });

    }
}

new YodleeService().getAccounts()