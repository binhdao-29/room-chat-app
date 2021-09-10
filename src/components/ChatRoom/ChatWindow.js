import { UserAddOutlined } from '@ant-design/icons';
import { Avatar, Button, Tooltip, Form, Input } from 'antd';
import React from 'react';
import styled from 'styled-components';

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
  return (
    <WrapperStyled>
      <HeaderStyled>
        <div className="header__info">
          <p className="header__title">Room 1</p>
          <span className="header__description">This is room 1</span>
        </div>
        <ButtonGroupStyled>
          <Button type="text" icon={<UserAddOutlined />}>Invite</Button>
          <Avatar.Group size="small" maxCount={2}>
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
          </Avatar.Group>
        </ButtonGroupStyled>
      </HeaderStyled>
      <ContentStyled>
        <MessageListStyled>
          <Message 
            text="this is a message"
            photoURL={null}
            displayName="Chan"
            createdAt={1111111111111111}
          />
          <Message 
            text="this is a message"
            photoURL={null}
            displayName="Chan"
            createdAt={1111111111111111}
          />
          <Message 
            text="this is a message"
            photoURL={null}
            displayName="Chan"
            createdAt={1111111111111111}
          />
          <Message 
            text="this is a message"
            photoURL={null}
            displayName="Chan"
            createdAt={1111111111111111}
          />
        </MessageListStyled>

        <FormStyled>
          <Form.Item>
            <Input 
              placeholder="Your message..." 
              bordered={false} 
              autoComplete="off" />
          </Form.Item>
          <Button type="primary">Send</Button>
        </FormStyled>
      </ContentStyled>
    </WrapperStyled>
  )
}
