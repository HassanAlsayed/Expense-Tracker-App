import { StyleSheet } from 'react-native';
import fn from '../../utils/scaling'

const style = StyleSheet.create({

  loginProf: {
    width: fn.wp(100),
    flex:1,
  },


  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: fn.hp(2),
    paddingHorizontal: fn.wp(5), 
    paddingVertical: fn.hp(2),
  },

  header: {
    fontSize: fn.getFontSize(15),
    fontWeight: 'bold',
    marginBottom: fn.hp(0.5),
    textAlign: 'center',
    lineHeight: fn.getFontSize(22),
    paddingHorizontal: fn.wp(2),
  },

  starting_text:{
  fontSize: fn.getFontSize(25),
  fontWeight: 'bold',
  color: '#333',                    
  marginBottom: fn.hp(0.5), 
  },

  inputs_container: {
    width:fn.wp(100),
    maxWidth: 400,
    backgroundColor: '#f2f2f2',
    borderRadius: fn.wp(2.5),
    paddingHorizontal: fn.wp(5),
    paddingVertical: fn.hp(2),
    gap: fn.hp(1.5),
  },

  inputs: {
    width: '100%',
    height: fn.hp(6), 
    minHeight: 45, 
    maxHeight: 60, 
    borderRadius: fn.wp(2),
    borderColor: '#999',
    borderWidth: 1,
    paddingHorizontal: fn.wp(4),
    backgroundColor: '#fff',
    fontSize: fn.getFontSize(16),
  },

  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: fn.hp(0.5),
    marginBottom: fn.hp(1),
    color: '#007bff',
    fontSize: fn.getFontSize(14),
  },

  loginButton: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#007bff',
    borderRadius: fn.wp(2),
    paddingVertical: fn.hp(2),
    alignItems: 'center',
    marginTop: fn.hp(1),
  },

  loginButtonText: {
    color: '#fff',
    fontSize: fn.getFontSize(16),
    fontWeight: 'bold',
  },

  signupText: {
    fontSize: fn.getFontSize(14),
    textAlign: 'center',
    marginTop: fn.hp(2),
  },

  signupLink: {
    color: '#007bff',
    fontWeight: '600',
  },
});

export default style;