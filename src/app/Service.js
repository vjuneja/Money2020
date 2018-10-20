import axios from 'axios' 
import  {cobrandLoginRequest, userLoginRequest} from './YodleeRequests'

export default class YodleeService {

    getAccounts(){
        axios(cobrandLoginRequest()).then((response)=> {
            console.log(response)
        })
    }
}

YodleeService().getAccounts()