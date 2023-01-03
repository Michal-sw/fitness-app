import '../../styles/chatbot/Chatbot.scss'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Chatbot = () => {

    const [request, setRequest] = useState<string>('');
    const [response, setResponse] = useState<string>('');

    const getResponse = async () => {
        axios.post('http://localhost:5000/', { data: request })
            .then(res => {
                setResponse(res.data.data)
            }).catch(err => {
                console.error(err)
            });
    };

    useEffect(() => {
        console.log(response);
    }, [response])
    

  return (
    <div className="container">
        <div className="bot_container">
            <h1>Chat</h1>
            <input onChange={e => setRequest(e.target.value)} placeholder={'Chat with chatbot'}/>
            <button onClick={getResponse}>Get chatbot response</button>
            <span>{ response }</span>
        </div>
    </div>
  )
}

export default Chatbot