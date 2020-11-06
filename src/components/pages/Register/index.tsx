import React, {memo} from 'react';
import SignUpForm from '../../organisms/SignUpForm';
import signupBackground from '../../../assets/images/png/sign-up-background.png';
import AcrylicBackground from '../../atoms/AcrylicBackground';

function Register() {
  return (
    <AcrylicBackground imageSource={signupBackground}>
      <SignUpForm />
    </AcrylicBackground>
  );
}

export default memo(Register);
