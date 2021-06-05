import React, { Component } from 'react';
import {SafeAreaView, StyleSheet,Text,View, FlatList, Button, TextInput} from 'react-native';
import {firebaseApp, contatoDB} from './firebase.js';

export default class Atividade_2 extends Component {
  state = {
    nome: "",
    telefone:"",
    proxima_key: 1,
    contato: []
  }

  componentDidMount(){
    this.listarContatos();
  }

  listarContatos = () =>{
    var contatoTemp = [];
    try{
      contatoDB.on("value",(contato)=>{
        contato.forEach((contato)=>{
          contatoTemp.push({
            key: contato.key,
            nome: contato.val().nome,
            telefone: contato.val().telefone
          });
        });
        this.setState({contato: contatoTemp});
      });
    }catch(e){
      console.log('listarContatos Error: ' + e);
    }
  }
  adicionarContato = () =>{
    try{
      if(this.state.nome.length>0){
        if(this.validatePhone(this.state.telefone)){
          var contato = {
            nome: this.state.nome,
            telefone: this.state.telefone
          }
          contatoDB.push(contato);
          this.listarContatos();
        }
      }
    }catch(e){
      console.log('adicionarContato Error: ' + e);
    }
  }
  validatePhone = (phone) => {
    if(!phone){
      return false;
    }
    if (phone.indexOf('000000') >= 0 || phone.indexOf('111111') >= 0 || phone.indexOf('222222') >= 0 || phone.indexOf('333333') >= 0 ||
      phone.indexOf('444444') >= 0 || phone.indexOf('555555') >= 0 || phone.indexOf('666666') >= 0 || phone.indexOf('777777') >= 0 ||
      phone.indexOf('888888') >= 0 || phone.indexOf('999999') >= 0){
      return false;
    }
    if(phone.length <= 9 || phone.length > 11){
      return false;
    }
    if (phone[2] != '9' && phone[2] != '8' && phone[2] != '7' && phone[2] != '6') {
      return false;
    }
    if(phone.length != 11){
      return false;
    }
    return true;
  }
  excluirContato = (key) =>{
    try{
      contatoDB.child(key).remove();
      this.listarContatos();
    }catch(e){
      console.log('adicionarContato Error: ' + e);
    }
  }
  render(){
    return(
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>Atividade 2 (Contatos)</Text>
        <FlatList style={styles.lista} data={this.state.contato} renderItem={
          ({ item,index }) =>
            <View style={styles.itemContainer}>
              <Text style= {styles.item}>{item.nome}</Text>
              <Text style= {styles.item}>{item.telefone}</Text>
              <Button style={styles.botao} title="x" color="#FF0000" onPress={() => this.excluirContato(item.key)}/>
            </View>
        } />
        <View style={styles.itemContainer}>
          <TextInput style={styles.input} placeholder="Novo nome" value={this.state.nome} onChangeText={(nome) => this.setState({nome: nome})}/>
          <TextInput style={styles.input} placeholder="Novo telefone" value={this.state.telefone} onChangeText={(telefone) => this.setState({telefone: telefone})}/>
          <Button style={styles.botao} title="+" onPress={this.adicionarContato}/>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10
  },
  titulo:{
    paddingTop:2,
    paddingBottom:2,
    fontSize: 28,
    fontWeight: "bold"
  },
  lista: {
    width: "100%"
  },
  item: {
    paddingTop: 2,
    paddingBottom:2,
    fontSize: 20,
    width: "42.5%"
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5
  },
  botao: {
    width: "7%"
  },
  input: {
    height: 40,
    padding: 2,
    borderColor: "#000000",
    borderWidth: 1,
    width: "47%"
  }
});