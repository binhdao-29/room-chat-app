import React from 'react';
import { Button, Collapse, Typography } from 'antd';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: #fff;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }

    .add-room {
      color: #fff;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 10px;
`;

export default function RoomList() {
  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyled header="Room list" key="1">
        <LinkStyled>Room 1</LinkStyled>
        <LinkStyled>Room 2</LinkStyled>
        <LinkStyled>Room 3</LinkStyled>
        <Button className="add-room" type="text" icon={<PlusSquareOutlined />}>Add Room</Button>
      </PanelStyled>
    </Collapse>
  )
}
