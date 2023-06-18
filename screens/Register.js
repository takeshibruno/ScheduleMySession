import React, { useState } from "react";
import Modal from "react-native-modal";
import { Alert, StyleSheet, ImageBackground, Dimensions, StatusBar, KeyboardAvoidingView, View } from "react-native";
import { Block, Checkbox, Text } from "galio-framework";
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import { url_back } from "../constants/back";
import Inicio from './Inicio';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("screen");

const RegisterField = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [anotherModaVisible, setAnotherModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [user_name, setName] = useState('');
  const [user_email, setEmail] = useState('');
  const [user_password, setPassword] = useState('');
  const navigation = useNavigation();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  const handleNameChange = (text) => {
    setName(text);
  };

  const requestData = {
    email: user_email,
    name: user_name,
    password: user_password
  };

  const handleButtonClick = () => {
    if (user_name.length == 0) {
      setAnotherModalVisible(true);
    } else if (!validateEmail(user_email)) {
      setEmail("");
      setModalVisible(true);
      return;
    } else {
      setName("");
      setEmail("");
      setPassword("");

      fetch(url_back + '/registrar', {
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
  
          const desiredValue = 'Registrado';
  
          if (data.text === desiredValue) {
            Alert.alert('Exito!', 'Te has registrado correctamente.')
            navigation.navigate("Inicio");
          } else {
            setModalVisible(true); // Show the modal
          }
  
        })
        .catch(error => {
          // Handle error
          console.error(error);
        });

      
    }
  }

  return (
    <Block safe flex middle>
      <Block style={styles.registerContainer}>
        <Block flex>
          <Block flex={0.17} middle>
            <Text color="#8898AA" size={16}>
              Regístrate de forma clásica
            </Text>
          </Block>
          <Block flex center>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior="padding"
              enabled
            >
              <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                <Input
                  borderless
                  placeholder="Nombre"
                  iconContent={
                    <Icon
                      size={16}
                      color={argonTheme.COLORS.ICON}
                      name="hat-3"
                      family="ArgonExtra"
                      style={styles.inputIcons}
                    />
                  }
                  onChangeText={handleNameChange}
                  value={user_name}
                />
              </Block>
              <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                <Input
                  borderless
                  placeholder="Email"
                  iconContent={
                    <Icon
                      size={16}
                      color={argonTheme.COLORS.ICON}
                      name="ic_mail_24px"
                      family="ArgonExtra"
                      style={styles.inputIcons}
                    />
                  }
                  onChangeText={handleEmailChange}
                  value={user_email}
                />
              </Block>
              <Block width={width * 0.8}>
                <Input
                  password
                  borderless
                  placeholder="Contrasena"
                  iconContent={
                    <Icon
                      size={16}
                      color={argonTheme.COLORS.ICON}
                      name="padlock-unlocked"
                      family="ArgonExtra"
                      style={styles.inputIcons}
                    />
                  }
                  onChangeText={handlePasswordChange}
                  value={user_password}
                />
              </Block>
              <Block row width={width * 0.75}>
                <Checkbox
                  value={isChecked}
                  onChange={handleCheckboxChange}
                  checkboxStyle={{
                    borderWidth: 3
                  }}
                  color={argonTheme.COLORS.PRIMARY}
                  label="He leído y acepto la"
                />
                <Button
                  style={{ width: 100 }}
                  color="transparent"
                  textStyle={{
                    color: argonTheme.COLORS.PRIMARY,
                    fontSize: 13
                  }}
                >
                  Politica de Privacidad
                </Button>
              </Block>
              <Block middle>
                <Button color={isChecked ? 'primary' : 'gray'} style={styles.createButton} onPress={handleButtonClick} disabled={!isChecked}>
                  <Text bold size={14} color={isChecked ? argonTheme.COLORS.WHITE : 'gray'}>
                    CRIAR CUENTA
                  </Text>
                </Button>
              </Block>
            </KeyboardAvoidingView>
          </Block>
        </Block>
      </Block>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text bold size={14} color={argonTheme.COLORS.WHITE}> FORMATO DE CORREO INVÁLIDO! </Text>
          <Button onPress={() => setModalVisible(false)}>
            <Text bold size={14} color={argonTheme.COLORS.WHITE}> CERRAR </Text>
          </Button>
        </View>
      </Modal>
      <Modal isVisible={anotherModaVisible}>
        <View style={styles.modalContainer}>
          <Text bold size={14} color={argonTheme.COLORS.WHITE}> CAMPO NOMBRE NO PUEDE ESTAR VACIO! </Text>
          <Button onPress={() => setAnotherModalVisible(false)}>
            <Text bold size={14} color={argonTheme.COLORS.WHITE}> CERRAR </Text>
          </Button>
        </View>
      </Modal>
      <Modal isVisible={registerModalVisible}>
        <View style={styles.modalContainer}>
          <Text bold size={14} color={argonTheme.COLORS.WHITE}> EL REGISTRO HAS FALLADO! </Text>
          <Button onPress={() => setRegisterModalVisible(false)}>
            <Text bold size={14} color={argonTheme.COLORS.WHITE}> CERRAR </Text>
          </Button>
        </View>
      </Modal>
    </Block>
  );
};
class Register extends React.Component {
  render() {
    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <RegisterField />
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.80,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});

export default Register;
