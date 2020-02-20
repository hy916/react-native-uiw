import React, { Component } from 'react';
import {  StyleSheet } from 'react-native';
import Layout, { Container } from '../../Layout';
import { Input, List } from '../../../components';
import { ComProps } from '../../typings';

const { Header, Body, Card, Footer } = Layout;

export interface InputProps extends ComProps { }

export default class InputView extends Component<InputProps> {
  state = {
    value: ''
  }
  render() {
    const { navigation } = this.props;
    const description = navigation.getParam('description');
    const title = navigation.getParam('title');
    return (
      <Container>
        <Layout>
          <Header title={title} description={description} />
          <Body>
            <Card title="基础实例" style={styles.card} >
              <Input style={styles.input} onChange={(value) => {this.setState({value})}} value={this.state.value} />
             
            </Card>
            <Card title="额外的内容" style={styles.card} >
              <Input style={styles.input} extra="小数" />
             
            </Card>
            <Card title="报错" style={styles.card} >
              <Input style={styles.input} error />
             
            </Card>
            <Card title="手机号" style={styles.card} >
              <Input style={styles.input} type="phone" />
             
            </Card>
          </Body>
          <Footer />
        </Layout>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    // backgroundColor: '#ccc'
  }
})