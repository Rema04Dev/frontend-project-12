import { Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react'
import { io } from 'socket.io-client';
import { addMessage } from '../store/slices/messagesSlice';
import MessagesHeader from './MessagesHeader';
import MessagesBox from './MessagesBox';
import MessagesForm from './MessagesForm';
const socket = io.connect('http://localhost:3000')

const Messages = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('newMessage', (data) => {
            dispatch(addMessage(data));
        })
    }, [socket]);

    const { channels, currentChannelId } = useSelector(state => state.channels)
    const messages = useSelector(state => state.messages.messages);

    const currentMessages = messages
        .filter((message) => message.channelId === currentChannelId);

    const currentChannel = channels
        .find((channel) => channel.id === currentChannelId);

    const renderMessages = () => currentMessages
        .map(({ id, body, username }) => (
            <div key={id} className="text-break mb-2"><b>{username}</b>: {body}</div>
        ));

    return (
        <Col className='p-0 h-100'>
            <div className="d-flex flex-column h-100">
                <MessagesHeader count={currentMessages.length} channelName={currentChannel.name} />
                {/* <MessagesBox /> */}
                <div id="messages-box" className="chat-messages overflow-auto px-5" style={{ minHeight: '60vh' }}>
                    {renderMessages()}
                </div>
                <MessagesForm />
            </div>
        </Col>
    )
}

export default Messages;