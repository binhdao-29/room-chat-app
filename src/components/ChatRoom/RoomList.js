import React from 'react';
import { Button, Collapse, Typography } from 'antd';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';
import { AppContext } from '../../Context/AppProvider';

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: #fff;
    }

    .ant-collapse-content-box {
      padding: 0 40px;

      .ant-typography {
        color: #fff;
      }

      a.ant-typography:focus,
      .ant-typography a:focus, 
      a.ant-typography:hover, 
      .ant-typography a:hover {
        color: #FFD60A;
      }
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
  const { rooms, setIsAddRoomVisible, setSelectRoomId } = React.useContext(AppContext)

  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyled header="Room list" key="1">
        {
          rooms.map((room) => (
            <LinkStyled 
              key={room.id} 
              onClick={() => setSelectRoomId(room.id)}
            >
              # {room.name}
            </LinkStyled>
          ))
        }
        <Button 
          className="add-room" 
          type="text" 
          icon={<PlusSquareOutlined />}
          onClick={() => setIsAddRoomVisible(true)}
        >
          Add Room
        </Button>
      </PanelStyled>
    </Collapse>
  )
}
