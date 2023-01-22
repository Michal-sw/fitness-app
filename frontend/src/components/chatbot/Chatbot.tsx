import '../../styles/chatbot/Chatbot.scss'
import React, { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import useNotifications from '../../hooks/useNotifications';

const Chatbot = () => {
    const [isVisible, setVisible] = useState<boolean>(false);
    const [request, setRequest] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const { actions } = useNotifications();

    const getResponse = async () => {
        axios.post('http://localhost:5000/', { data: request })
            .then(res => {
                setResponse(res.data.data)
            }).catch((err: AxiosError) => {
                actions.sendDissapearingNotification({ message: "Could not get response from chatbot" });
            });
    };

    useEffect(() => {
        console.log(response);
    }, [response])
    
    const handleVisibilityChange = () => {
        setVisible(!isVisible);
    }

  return isVisible
        ?
            <div className="container">
                <div className="bot_container">
                    <div>
                        <h1>Chat</h1>
                        <button className='spacedRight' onClick={handleVisibilityChange}>Close</button>
                    </div>
                    <input onChange={e => setRequest(e.target.value)} placeholder={'Chat with chatbot'}/>
                    <button onClick={getResponse}>Get chatbot response</button>
                    <span>{ response }</span>
                </div>
            </div>
        :
            <button id='open_chatbot' onClick={handleVisibilityChange}>Chatbot</button> 
}

export default Chatbot