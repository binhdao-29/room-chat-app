import { Modal, Form, Select, Spin, Avatar } from 'antd';
import React, { useContext, useState, useMemo, useEffect } from 'react';
import { AppContext } from '../../Context/AppProvider';
import { debounce } from 'lodash';
import { db } from '../../firebase/config';

function DebounceSelect({fetchOptions, debounceTimeout = 300, ...props }) {

  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOption = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, props.currentmembers).then(newOptions => {
        setOptions(newOptions);
        setFetching(false);
      })
    }

    return debounce(loadOption, debounceTimeout);
  }, [fetchOptions, debounceTimeout, props]);

  useEffect(() => {
    return () => {
      setOptions([]);
    }
  }, []);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {
        options.map(opt => (
          <Select.Option 
            key={opt.value}
            value={opt.title}
            title={opt.label}
          >
            <Avatar size="small" src={opt.photoURL} >
              { opt.photoURL ? '' : opt.label?.charAt[0]?.toUpperCase() }
            </Avatar>
            {`${opt.label}`}
          </Select.Option>
        ))
      }
    </Select>
  )
}

async function fetchUserList(search, currentmembers) {
  return db
    .collection('users')
    .where('keywords', 'array-contains', search)
    .orderBy('displayName')
    .limit(20)
    .get()
    .then(snapshot => {
      return snapshot.docs.map(doc => ({
        label: doc.data().displayName,
        value: doc.data().uid,
        photoURL: doc.data().photoURL
      })).filter(opt => !currentmembers.includes(opt.value));
    })
}

export default function InviteMemberModal() {
  const { 
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    selectRoomId,
    selectedRoom
  } = useContext(AppContext);
  const [form] = Form.useForm();
  const [value, setValue] = useState(null);

  const handleOK = () => {
    // reset form value
    form.resetFields();
    setValue([]);

     // update members in current room
    const roomRef = db.collection('rooms').doc(selectRoomId);

    roomRef.update({
      members: [...selectedRoom.members, ...value.map(val => val.value)]
    })

    setIsInviteMemberVisible(false);
  }

  const handleCancel = () => {
    form.resetFields();
    setValue([]);
    setIsInviteMemberVisible(false);
  }

  return (
    <div>
      <Modal
        title="Invite member"
        visible={isInviteMemberVisible}
        onOk={handleOK}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form form={form} layout='vertical'>
          <DebounceSelect
            mode="multiple"
            name="search-user"
            label="Member name"
            value={value}
            placeholder="Enter member name"
            fetchOptions={fetchUserList}
            onChange={newValue => setValue(newValue)}
            style={{width: '100%'}}
            currentmembers={selectedRoom.members}
          />
        </Form>
      </Modal>
    </div>
  )
}

