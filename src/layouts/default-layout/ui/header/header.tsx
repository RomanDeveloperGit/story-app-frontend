import { Box, Button, HStack, Wrap } from '@chakra-ui/react';

import { redirectToLogInPage, redirectToMainPage, redirectToSignUpPage } from '../../model/router';

export const Header = () => {
  const handleLogoClick = () => {
    redirectToMainPage();
  };

  const handleLogInClick = () => {
    redirectToLogInPage();
  };

  const handleSignUpClick = () => {
    redirectToSignUpPage();
  };

  // TODO: will know about CSS tokens in Chakra

  return (
    <Box padding="20px">
      <HStack justify="space-between">
        <Box as="button" onClick={handleLogoClick}>
          Story App
        </Box>
        <Wrap>
          <Button onClick={handleLogInClick}>Log In</Button>
          <Button onClick={handleSignUpClick}>Sign Up</Button>
        </Wrap>
      </HStack>
    </Box>
  );
};
