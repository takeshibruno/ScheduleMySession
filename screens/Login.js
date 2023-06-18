import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, StatusBar, KeyboardAvoidingView } from "react-native";
import { Block, Text, theme } from "galio-framework";
import Modal from 'react-native-modal';
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import { url_back } from "../constants/back";
import { useNavigation } from '@react-navigation/native';
import Inicio from './Inicio';
import Register from './Register';

const { width, height } = Dimensions.get("screen");

const LoginButton = () => {
  const navigation = useNavigation();

  const [user_email, setEmail] = useState('');
  const [user_password, setPassword] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLoginButtonClick = () => {
    console.log('Button clicked!');
    console.log('Email:', user_email);
    console.log('Password:', user_password);
    // You can perform further processing with the input values here

    if (user_email.trim().length == 0) {
      console.log("Email vazio");
      return;
    }

    if (user_password.trim().length == 0) {
      console.log("Senha vazia");
      return;
    }

    const requestData = {
      email: user_email,
      password: user_password
    };

    fetch(url_back + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })

      .then(response => response.json())
      .then(data => {
        // Handle successful response
        console.log(data);

        const desiredValue = 'Autenticado';

        if (data.text === desiredValue) {
          navigation.navigate("Inicio");
        } else {
          setModalVisible(true); // Show the modal
        }

      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <Block flex center>
      <Block width={width * 0.8} style={{ marginBottom: 10 }}>
        <Input
          borderless
          placeholder="Email"
          iconContent={
            <Icon
              size={25}
              color={argonTheme.COLORS.ICON}
              name="ic_mail_24px"
              family="ArgonExtra"
              style={styles.inputIcons}
            />
          }
          style={{ height: 50, fontSize: 22 }}
          onChangeText={handleEmailChange}
        />
      </Block>
      <Block width={width * 0.8}>
        <Input
          password
          borderless
          placeholder="Password"
          iconContent={
            <Icon
              size={25}
              color={argonTheme.COLORS.ICON}
              name="padlock-unlocked"
              family="ArgonExtra"
              style={styles.inputIcons}
            />
          }
          style={{ height: 50, fontSize: 22 }}
          onChangeText={handlePasswordChange}
        />
      </Block>
      <Block middle>
        <Block row>
          <Button color="primary" onPress={handleLoginButtonClick}>
            <Text bold size={14} color={argonTheme.COLORS.WHITE}>
              INICIAR SESIÓN
            </Text>
          </Button>
        </Block>
      </Block>
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text bold size={14} color={argonTheme.COLORS.WHITE}> CORREO O CONTRASEÑA INVÁLIDOS! </Text>
          <Button title="Close" onPress={() => setModalVisible(false)}>
            <Text bold size={14} color={argonTheme.COLORS.WHITE}>
              CERRAR
            </Text>
          </Button>
        </View>
      </Modal>
    </Block>
  );
};

const RegisterButton = () => {
  const navigation = useNavigation();

  const handleRegisterButtonClick = () => {
    navigation.navigate(Register); // Replace 'Register' with the screen name for the register screen
  };

  return (
    <Block row center>
      <Button color="primary" onPress={handleRegisterButtonClick}>
        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
          INSCRIBIRSE
        </Text>
      </Button>
    </Block>
  );
};

class Login extends React.Component {
  render() {
    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block safe flex middle>
            <Block style={styles.registerContainer}>
              <Block flex>
                <Block flex={0.30} middle>
                  <Text color="#8898AA" size={18}>
                    Benvenido al Aiise.org
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled>

                    <LoginButton />
                    <RegisterButton />

                  </KeyboardAvoidingView>
                </Block>

              </Block>
              <Block middle style={styles.socialConnect}>
                <Text color="#8898AA" size={18}>
                  O iniciar sesión con
                </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <Button style={{ ...styles.socialButtons, marginRight: 15 }}>
                    <Block row>
                      <Icon
                        name="logo-github"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>FACEBOOK</Text>
                    </Block>
                  </Button>
                  <Button style={styles.socialButtons}>
                    <Block row>
                      <Icon
                        name="logo-google"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GOOGLE</Text>
                    </Block>
                  </Button>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.65,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    height: height * 0.20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 60
  }
});

export default Login;
