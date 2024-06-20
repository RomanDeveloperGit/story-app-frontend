import { Box, HStack } from '@chakra-ui/react';

import { redirectToMainPage } from '../../model/router';

export const Footer = () => {
  const handleFooterClick = () => {
    redirectToMainPage();
  };

  return (
    <HStack justify="center" padding="20px">
      <Box as="button" onClick={handleFooterClick}>
        Footer, 2024
      </Box>
    </HStack>
  );
};
