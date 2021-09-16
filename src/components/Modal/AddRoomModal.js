import React, { useContext } from 'react';
import { Form, Modal, Input } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../../Context/AuthProvider';

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const { user: { uid } } = useContext(AuthContext);
  const [ form ] = Form.useForm();

  const handleOK = () => {
    addDocument('rooms', { ...form.getFieldsValue(), members: [uid] });

    form.resetFields();
    setIsAddRoomVisible(false);
  }

  const handleCancel = () => {
    form.resetFields();
    setIsAddRoomVisible(false);
  }

  return (
    <div>
      <Modal 
        title="Create new room"
        visible={isAddRoomVisible}
        onOk={handleOK}
        onCancel={handleCancel}   
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Room name" name="name">
            <Input placeholder="Enter your room name" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input placeholder="Enter description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
