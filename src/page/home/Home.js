import React from 'react';
import {TabBar,} from 'antd-mobile';
import {Redirect, Route, } from "react-router-dom";
import Info from "../info/Info";
import Activity from "../activity/Activity";
import Friend from "../friend/Friend";
import Main from "../main/Main";

class TabBarHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: false,
            fullScreen: false,
        };
    }

    componentWillMount() {
    }

    componentDidMount() {

    }

    render() {
        return (<div>
            <div style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                    tabBarPosition="top"
                >
                    <TabBar.Item
                        title="首页"
                        key="Life"
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
                        }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
                        }}
                        />
                        }
                        selected={this.props.history.location.pathname === '/home'}
                        onPress={() => {
                            this.props.history.push(`/home`)
                        }}
                        data-seed="logId"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        title="活动"
                        key="Koubei"
                        badge={'new'}
                        selected={this.props.history.location.pathname === '/activity'}
                        onPress={() => {
                            this.props.history.push(`/activity`)
                        }}
                        data-seed="logId1"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        title="群组"
                        key="Friend"
                        dot
                        selected={this.props.history.location.pathname === '/friend'}
                        onPress={() => {
                            this.props.history.push(`/friend`)
                        }}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={{uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg'}}
                        selectedIcon={{uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg'}}
                        title="我的"
                        key="my"
                        badge={99}
                        selected={this.props.history.location.pathname === '/login'}
                        onPress={() => {
                            this.props.history.push(`/login`)
                        }}
                    >
                    </TabBar.Item>
                </TabBar>
            </div>
            <div >
                <Route path="/" exact render={() => (
                    <Redirect to="/home"/>
                )}></Route>
                <Route path={`/home`} component={Main}/>
                <Route path={`/activity`} component={Activity}/>
                <Route path={`/friend`} component={Friend}/>
                <Route path={`/login`} component={Info}/>
            </div></div>)
    }

    componentWillReceiveProps() {

    }

    shouldComponentUpdate() {
        return true
    }

    componentWillUpdate() {

    }

    componentDidUpdate() {

    }

    componentWillUnmount() {

    }
}
export default TabBarHome;
