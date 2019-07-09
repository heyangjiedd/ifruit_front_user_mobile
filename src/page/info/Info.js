import React from 'react';
import {toggleLanguage} from '../../action/language';
import {addUser, deleteUser} from '../../action/user';
import {connect} from 'react-redux';
import {NavBar, Icon, WingBlank, Flex, WhiteSpace, Popover, Button} from 'antd-mobile';

const Item = Popover.Item;

@connect((state) => ({
    user: state.user,
    language: state.language,
    count: state.count,
    language_json: state.language_json,
}), {toggleLanguage, addUser, deleteUser})
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
        this.props.deleteUser()
    };

    render() {
        return (
            <div style={{position: 'absolute', top: 0, bottom: 50, left: 0, right: 0}}>
                <NavBar
                    mode="light"
                    rightContent={<Popover mask
                                           overlayClassName="fortest"
                                           overlayStyle={{color: 'currentColor'}}
                                           visible={this.state.visible}
                                           overlay={[
                                               (<Item>退出登录</Item>),
                                           ]}
                                           align={{
                                               overflow: {adjustY: 0, adjustX: 0},
                                               offset: [-10, 0],
                                           }}
                                           onVisibleChange={this.handleVisibleChange}
                                           onSelect={this.onSelect}
                    >
                        <div style={{
                            height: '100%',
                            padding: '0 15px',
                            marginRight: '-15px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        >
                            <Icon type="ellipsis"/>
                        </div>
                    </Popover>}>
                    个人中心
                </NavBar>
                <Flex style={{height: "calc(100% - 45px)"}} direction="column" justify="center">
                    <WingBlank style={{width:'90%'}}>
                        <Button type="primary">录入农户信息</Button><WhiteSpace />
                        <Button type="primary">录入农资信息</Button><WhiteSpace />
                    </WingBlank>
                </Flex>
            </div>
        );
    }
}

export default Index;
