import React, { useState, useCallback, memo } from 'react';
import {
  TabPanel,
  Skeleton,
  useDisclosure,
  Modal,
  Grid,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/core';

import User from './User';
import useFetchAdminData from '../../../hooks/useFetchAdminData';

const Users = React.forwardRef((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [delUser, setDelUser] = useState(null);

  const {
    data: { users },
    loading,
    error,
    deleteUser,
    observedElement,
  } = useFetchAdminData('/users', props.token);

  const handleDeletingUser = useCallback(
    (e, user) => {
      onOpen();
      setDelUser(user);
    },
    [onOpen, setDelUser]
  );

  const confirmDeletingUser = useCallback(
    (user) => {
      deleteUser(user);
      setDelUser(null);
      onClose();
    },
    [onClose, setDelUser, deleteUser]
  );

  return (
    <TabPanel ref={ref} {...props} overflow='hidden'>
      <Skeleton isLoaded>
        {users &&
          users.map((user, i) => (
            <User
              key={user._id}
              user={user}
              loading={loading}
              handleDeletingUser={(e) => handleDeletingUser(e, user)}
              elRef={users.length === i + 3 ? observedElement : null}
            />
          ))}
        {loading && <LoadingSkeleton loading={loading} />}
        {error && 'Failed to load users!'}
        <UserModal
          delUser={delUser}
          isOpen={isOpen}
          onClose={onClose}
          confirmDeletingUser={confirmDeletingUser}
        />
      </Skeleton>
    </TabPanel>
  );
});

const UserModal = memo(function ({
  delUser,
  onClose,
  confirmDeletingUser,
  isOpen,
}) {

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete {delUser && delUser.name}?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          All {delUser && delUser.name}'s transaction will be deleted too!
        </ModalBody>

        <ModalFooter>
          <Button variantColor='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={() => confirmDeletingUser(delUser)}
            variantColor='red'
            variant='ghost'
            disabled={!delUser}
          >
            Delete User <span role='img' aria-label="Delete user?">😥</span>
            {/* {loading ? 'Deleting account...' : 'Delete User😥'} */}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

const LoadingSkeleton = React.memo((loading) => (
  <Grid templateColumns='3rem 1fr' columnGap='0.75rem'>
    <Skeleton
      isLoaded={!loading}
      height='3rem'
      width='3rem'
      borderRadius='50%'
    />
    <Skeleton isLoaded={!loading} height='1.5rem' maxW='60%' />
    <Skeleton
      isLoaded={!loading}
      height='1rem'
      mt='-0.6rem'
      mb='0.6rem'
      maxW='80%'
      gridColumn='2'
    />
    <Skeleton isLoaded={!loading} height='0.93rem' maxW='70%' gridColumn='2' />
  </Grid>
));

export default React.memo(Users);
