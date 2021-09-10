import React from 'react';
import { Avatar, Button, Typography } from 'antd';
import styled from 'styled-components';

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #fff;

  .username {
    color: #fff;
    margin-left: 5px;
  }
`;

export default function UserInfo() {
  return (
    <WrapperStyled>
      <div>
        <Avatar>C</Avatar>
        <Typography.Text className="username">Chan</Typography.Text>
      </div>
      <Button ghost>Logout</Button>
    </WrapperStyled>
  )
}
