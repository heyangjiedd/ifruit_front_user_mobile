import React from 'react';
import {toggleLanguage} from '@/action/language';
import {addUser} from '@/action/user';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';
import {createForm} from 'rc-form';
import {NavBar, Icon, List, InputItem, Flex, WhiteSpace, Toast, Button,} from 'antd-mobile';
import {login} from '@/api/login'

@connect((state) => ({
    user: state.user,
    language: state.language,
    count: state.count,
    language_json: state.language_json,
}), {toggleLanguage, addUser})
@createForm()
@injectIntl
class Index extends React.Component {
    state = {
        visible: false,
    }
    handleVisibleChange = (visible) => {
        this.setState({visible})
    }
    onSelect = (opt) => {
        this.setState({
            visible: false,
        });
        this.props.toggleLanguage(opt.props.value)
    };
    handleClick = () => {
        const {form} = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) {
                Toast.fail(err[Object.keys(err)[0]].errors[0].message, 1, () => {
                }, true)
                return;
            }
            login({...fieldsValue}).then(()=>{
                form.resetFields();
                this.props.addUser({...fieldsValue});
                this.props.history.goBack(-1)
            })
        });
    }

    render() {
        const {getFieldProps} = this.props.form;
        const {intl} = this.props;
        return (
            <div style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack(-1)}
                ><FormattedMessage id="login.bar.title"/></NavBar>
                <Flex style={{height: "calc(100% - 45px)"}} direction="column" justify="center">
                    <List>
                        <InputItem
                            {...getFieldProps('userName', {
                                rules: [{required: true, message: '请输入账号！'}],
                            })}
                            placeholder={intl.formatMessage({id: 'login.bar.input.account'})}
                        ><FormattedMessage id="login.bar.account"/></InputItem>
                        <WhiteSpace size="sm" style={{background: '#f5f5f9'}}/>
                        <InputItem
                            {...getFieldProps('password', {
                                rules: [{required: true, message: '请输入密码！'}],
                            })}
                            type="password"
                            placeholder={intl.formatMessage({id: 'login.bar.input.password'})}
                        ><FormattedMessage id="login.bar.password"/></InputItem>
                        <WhiteSpace size="lg" style={{background: '#f5f5f9'}}/>
                        <Button style={{width: '100%', }} type="primary" onClick={this.handleClick}>确定</Button>

                    </List>
                </Flex>
            </div>
        );
    }
}

export default Index;
