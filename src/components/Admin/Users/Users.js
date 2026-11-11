import React, { useState, useCallback, useEffect, memo } from 'react';
import { FiSearch } from 'react-icons/fi';
import {
  TabPanel,
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
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
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  // Wait until typing pauses before asking the server
  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput.trim()), 350);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const {
    data: { users, totalUsers },
    loading,
    error,
    deleteUser,
    observedElement,
  } = useFetchAdminData('/users', props.token, search);

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
      <Box pt='4'>
        <InputGroup>
          <InputLeftElement children={<Box as={FiSearch} color='gray.400' />} />
          <Input
            type='text'
            autoComplete='off'
            aria-label='Search users'
            placeholder='Search by name, email, referral or user ID'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput && (
            <InputRightElement>
              <IconButton
                size='sm'
                variant='ghost'
                icon='close'
                aria-label='Clear search'
                onClick={() => setSearchInput('')}
              />
            </InputRightElement>
          )}
        </InputGroup>
        {search && !loading && typeof totalUsers === 'number' && (
          <Text fontSize='sm' color='gray.500' mt='2'>
            {totalUsers === 0
              ? `No users match "${search}"`
              : `${totalUsers} ${totalUsers === 1 ? 'user matches' : 'users match'} "${search}"`}
          </Text>
        )}
      </Box>
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
