import React, { memo, useState } from 'react';
import moment from 'moment';
import { motion, AnimatePresence } from 'framer-motion';
import { Flex, Avatar, Box, Text, Badge, IconButton } from '@chakra-ui/core';

const MotionIconButton = motion.custom(IconButton);

const User = ({ user, handleDeletingUser, elRef }) => {
  const [del, setDel] = useState(false);

  return (
    <Flex
      as='article'
      key={user._id + Math.random()}
      my={5}
      align='center'
      pos='relative'
      ref={elRef}
    >
      <AvatarAction
        del={del}
        setDel={setDel}
        username={user && user.name}
        handleDeletingUser={handleDeletingUser}
      />
      <Box ml='3' onClick={() => setDel(false)}>
        <Text fontWeight='bold'>
          {user.name}
          <Badge ml='1' variantColor='green' as='span'>
            {moment(user.createdAt).fromNow().toString()}
          </Badge>
        </Text>
        <Text fontSize='sm' color='blue.400'>
          {user.email}
        </Text>
        <Text as='span' fontSize='.8rem' color='blue.400'>
          Referal: {user.referalEmail ? user.referalEmail : 'None'}
        </Text>
      </Box>
    </Flex>
  );
};

const AvatarAction = memo(({ username, handleDeletingUser, del, setDel }) => {
  return (
    <Flex cursor='pointer'>
      <Avatar name={username} onClick={() => setDel(!del)} />
      <AnimatePresence>
        {del && (
          <MotionIconButton
            pos='absolute'
            variantColor='red'
            aria-label='Delete User'
            size='lg'
            icon='delete'
            borderRadius='50%'
            // opacity={del ? 1 : 0}
            // pointerEvents={del ? 'all' : 'none'}
            onClick={handleDeletingUser}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
          />
        )}
      </AnimatePresence>
    </Flex>
  );
});

export default memo(User, (prev, next) => {
  if (!prev.loading && prev.user._id === next.user._id) return true;
  return false;
});
