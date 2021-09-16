
import React, { useState, useMemo } from 'react';
import useFirestore from '../hooks/useFirestore';
import { AuthContext } from './AuthProvider';

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [selectRoomId, setSelectRoomId] = useState('');

  const {
    user: { uid },
  } = React.useContext(AuthContext);

  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFirestore('rooms', roomsCondition);

  const selectedRoom = useMemo(
    () => rooms.find(room => room.id === selectRoomId) || {},
    [rooms, selectRoomId]
  );

  const userCondition = React.useMemo(() => {
    return {
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom]);

  const members = useFirestore('users', userCondition);

  return (
    <AppContext.Provider
      value={{
        rooms,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoom,
        setSelectRoomId,
        members
      }}
    >
      {children}
    </AppContext.Provider>
  );
}