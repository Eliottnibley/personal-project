import React, {useEffect} from 'react'
import {useState} from 'react'
import './Profile.css'
import Axios from 'axios'
import {connect} from 'react-redux'
import {loginUser} from '../../redux/userReducer'
import {useHistory} from 'react-router-dom'

function Register (props) {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const {companyId} = props.match.params

  const history = useHistory()

  if(!props.isLoggedIn){
      history.push('/')
  }

  useEffect(() => {
    setFirstname(props.user.firstname)
    setLastname(props.user.lastname)
    setEmail(props.user.email)
    setProfilePic(props.user.profilePic)

  }, [])

  async function submitForm (e) {
    e.preventDefault()

    if (!firstname || !lastname || !email ||  !profilePic){
      return alert('Please fill in all information')
    }

    const user = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      profilePic: profilePic,
      companyId: companyId
    }
    
    const res = await Axios.put(`/api/auth/profile/${props.user.userId}`, user)
    console.log(res.data)
    await props.loginUser(res.data)
    console.log(props)

    history.push('/company')
    
  }

  return (
    <div className='register-container'>
      <div className='pic-preview-container'>
        <img alt='' src={profilePic}/>
      </div>
      <form onSubmit={e => submitForm(e)}>
        <input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
        <input placeholder='Firstname' value={firstname} onChange={e => setFirstname(e.target.value)}/>
        <input placeholder='Lastname' value={lastname} onChange={e => setLastname(e.target.value)}/>
        <input placeholder='Profile picture' value={profilePic} onChange={e => setProfilePic(e.target.value)}/>
        <button onClick={(e) => submitForm(e)}>Change Profile</button>
      </form>
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {loginUser})(Register)