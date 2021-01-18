import React ,{Component} from 'react';

const getUser = ()=>{
    const fromStorage = JSON.parse(localStorage.getItem('user'));
    return {user:'',role:'guest'};
}

const isValidRole = ({allowedRules,role})=>{
    // console.log(allowedRules)
    return allowedRules.includes(role);
}

const Authorization = allowedRules=>WrappedComponet => class withAuth extends Component{
    constructor(props){
        super(props);
        this.state = {
            user : getUser(),
        }
    }

    render(){
        const {role} = this.state.user
        console.log(isValidRole({allowedRules:allowedRules,role:role}))
        return isValidRole({role:role,allowedRules:allowedRules})?
        <WrappedComponet/>: <h1>Hai ! kamu tidak boleh msauk dihalaman ini</h1>
    }
}

export const Admin1 = Authorization(['admin','guest']);
export const User = Authorization(['admin','user']);

export default{
    Admin1,
    User
}