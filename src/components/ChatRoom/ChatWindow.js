import { UserAddOutlined } from '@ant-design/icons';
import { Avatar, Button, Tooltip, Form, Input, Alert } from 'antd';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { addDocument } from '../../firebase/services';
import useFirestore from '../../hooks/useFirestore';

import Message from './Message';

const WrapperStyled = styled.div`
  height: 100vh;
`;

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 16px;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 11px;
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);

  .ant-form-item {
    flex-grow: 1;
    margin: 0;
  }
`;


export default function ChatWindow() {
  const { 
      members,
      selectedRoom, 
      setIsInviteMemberVisible
    } = useContext(AppContext);

  const { user: { uid, displayName, photoURL}} = useContext(AuthContext);
  const [inputValue, setInputValue] = useState('');
  const [form] = Form.useForm();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleOnSubmit = () => {
    addDocument('messages', {
      text: inputValue,
      uid,
      photoURL,
      displayName,
      roomId: selectedRoom.id
    })

    form.resetFields(['message']);
  }

  const conditionMessage = React.useMemo(() => {
    return {
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom.id,
    };
  }, [selectedRoom]);

  const messages = useFirestore('messages', conditionMessage);

  return (
    <WrapperStyled>
      {
        selectedRoom.id ? (
          <>
            <HeaderStyled>
              <div className="header__info">
                <p className="header__title">{selectedRoom?.name}</p>
                <span className="header__description">{selectedRoom?.description}</span>
              </div>
              <ButtonGroupStyled>
                <Button onClick={() => setIsInviteMemberVisible(true)} type="text" icon={<UserAddOutlined />}>Invite</Button>
                <Avatar.Group size="small" maxCount={2}>
                  {
                    members.map(member => (
                      <Tooltip title={member.displayName} key={member.uid}>
                        <Avatar 
                          src={member.photoURL}
                        >
                          {
                            member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()
                          }
                        </Avatar>
                      </Tooltip>
                    ))
                  }
                </Avatar.Group>
              </ButtonGroupStyled>
            </HeaderStyled>
            <ContentStyled>
              <MessageListStyled>
                {
                  messages.map(message => (
                    <Message 
                      key={message.id}
                      text={message.text}
                      photoURL={message.photoURL}
                      displayName={message.displayName}
                      createAt={message.createAt}
                    />
                  ))
                }
              </MessageListStyled>
              <FormStyled form={form}>
                <Form.Item name="message">
                  <Input 
                    placeholder="Your message..." 
                    bordered={false} 
                    autoComplete="off" 
                    onChange={handleInputChange}
                    onPressEnter={handleOnSubmit}
                  />
                </Form.Item>
                <Button type="primary" onClick={handleOnSubmit}>Send</Button>
              </FormStyled>
            </ContentStyled>
          </>
        ) : (
          <Alert
            message='Let choose the room'
            type='info'
            showIcon
            style={{ margin: 5 }}
            closable
          />
        )
      }
    </WrapperStyled>
  )
}
