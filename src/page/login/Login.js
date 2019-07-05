import React from 'react';
import {toggleLanguage} from '../../action/language';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';
import {createForm} from 'rc-form';
import {NavBar, Icon, List, InputItem, Flex,WhiteSpace} from 'antd-mobile';

@connect((state) => ({
    language: state.language,
    count: state.count,
    language_json: state.language_json,
}), {toggleLanguage})
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

    render() {
        const {getFieldProps} = this.props.form;
        const {intl} = this.props;
        return (
            <div style={{position:'absolute',top:0,bottom:0,left:0,right:0}}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack(-1)}
                ><FormattedMessage id="login.bar.title"/></NavBar>
                <Flex style={{height:"calc(100% - 45px)"}} direction="column" justify="center">
                    <List>
                        <InputItem
                            {...getFieldProps('account')}
                            clear
                            placeholder={intl.formatMessage({id: 'login.bar.input.account'})}
                        ><FormattedMessage id="login.bar.account"/></InputItem>
                        <WhiteSpace size="sm" style={{background:'#f5f5f9'}}/>
                        <InputItem
                            {...getFieldProps('password')}
                            clear
                            placeholder={intl.formatMessage({id: 'login.bar.input.password'})}
                        ><FormattedMessage id="login.bar.password"/></InputItem>
                        <WhiteSpace size="lg" style={{background:'#f5f5f9'}}/>
                        <List.Item>
                            <div
                                style={{width: '100%', color: '#108ee9', textAlign: 'center'}}
                                onClick={this.handleClick}
                            >
                                <FormattedMessage id="ok"/>
                            </div>
                        </List.Item>
                    </List>
                </Flex>
            </div>
        );
    }
}

export default Index;
